import React, { useEffect, useState, useRef } from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import { CCard, CContainer, CRow, CCol, CCardBody, CCardText, CCardTitle, CAlert } from '@coreui/react';
import { getStyle } from '@coreui/utils';
import { CChart } from '@coreui/react-chartjs';
import PatientSidebar from '../../../components/PatientSidebar';
import withPatientAuth from './withPatientAuth';

const PatientDashboard = () => {
  const chartRef = useRef(null);
  const [prediction, setPrediction] = useState('Loading...');
  const [healthScore, setHealthScore] = useState('Loading...');
  const [error, setError] = useState('');
  const [vaccineReminder, setVaccineReminder] = useState([]);
  const [medicineReminder, setMedicineReminder] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Health Score Over Time',
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
        borderColor: 'rgba(220, 53, 69, 1)',
        pointBackgroundColor: 'rgba(220, 53, 69, 1)',
        pointBorderColor: '#fff',
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch case data from the get-case API
        const caseResponse = await fetch('http://127.0.0.1:3001/get-case');
        const caseData = await caseResponse.json();

        if (!caseResponse.ok) {
          throw new Error(caseData.message || 'Error fetching case data');
        }

        // Preprocess case data to match the format required by the APIs
        const pastDiseases = caseData.map(caseItem => ({
          disease_name: caseItem.disease,
          date: new Date(caseItem.date).toISOString().split('T')[0], // Convert date to YYYY-MM-DD format
        }));

        console.log('Past diseases:', pastDiseases);
        // Fetch future prediction
        const predictionResponse = await fetch('http://127.0.0.1:5000/future_prediction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patient_data: [
              { disease_history: pastDiseases.map(d => d.disease_name) },
            ],
          }),
        });

        const predictionData = await predictionResponse.json();
        if (predictionResponse.ok) {
          setPrediction(predictionData.predicted_disease);
        } else {
          setError(predictionData.message);
        }

        // Fetch health score
        const healthScoreResponse = await fetch('http://127.0.0.1:5000/predict_health', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ past_diseases: pastDiseases }),
        });

        const healthScoreData = await healthScoreResponse.json();
        if (healthScoreResponse.ok) {
          setHealthScore(healthScoreData.health_score.toFixed(2));
        } else {
          setError(healthScoreData.message);
        }

        // Fetch health scores over time
        const healthScoresResponse = await fetch('http://127.0.0.1:5000/health_scores_over_time', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ past_diseases: pastDiseases }),
        });

        const healthScoresData = await healthScoresResponse.json();
        if (healthScoresResponse.ok) {
          const labels = healthScoresData.map(entry => entry.date);
          const scores = healthScoresData.map(entry => entry.health_score);
          setChartData({
            labels,
            datasets: [
              {
                ...chartData.datasets[0],
                data: scores,
              },
            ],
          });
        } else {
          setError(healthScoresData.message);
        }

        // Fetch vaccine reminders
        const patientSession = JSON.parse(localStorage.getItem('patientSession'));
        const patientId = patientSession?.id;

        const vaccineResponse = await fetch("http://127.0.0.1:3001/api/vaccine_reminders?patient_id=${patientId}");
        const vaccineData = await vaccineResponse.json();
        if (vaccineResponse.ok) {
          setVaccineReminder(vaccineData);
        } else {
          setError(vaccineData.message);
        }

        // Fetch medicine reminders
        const medicineResponse = await fetch("http://127.0.0.1:3001/api/medicine_reminders?patient_id=${patientId}");
        const medicineData = await medicineResponse.json();
        if (medicineResponse.ok) {
          setMedicineReminder(medicineData);
        } else {
          setError(medicineData.message);
        }
      } catch (error) {
        setError(error.message || 'Error fetching data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleColorSchemeChange = () => {
      const chartInstance = chartRef.current;
      if (chartInstance) {
        const { options } = chartInstance;

        if (options.plugins?.legend?.labels) {
          options.plugins.legend.labels.color = getStyle('--cui-body-color');
        }

        if (options.scales?.x) {
          if (options.scales.x.grid) {
            options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          }
          if (options.scales.x.ticks) {
            options.scales.x.ticks.color = getStyle('--cui-body-color');
          }
        }

        if (options.scales?.y) {
          if (options.scales.y.grid) {
            options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          }
          if (options.scales.y.ticks) {
            options.scales.y.ticks.color = getStyle('--cui-body-color');
          }
        }

        chartInstance.update();
      }
    };

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange);

    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange);
    };
  }, []);

  return (
    <div>
      <PatientSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="flex-grow-1">
          <div className="container mt-4">
            {error && <CAlert color="danger">{error}</CAlert>}
            <CContainer>
              <CRow>
                <CCol sm="auto"></CCol>
                <CCard style={{ width: '18rem' }}>
                  <CCardBody>
                    <CCardTitle>Future Disease That you Might Suffer through is :</CCardTitle>
                    <CCardText>{prediction}</CCardText>
                  </CCardBody>
                </CCard>
                <CCol />
                <CCol sm="auto"></CCol>
                <CCard style={{ width: '18rem' }}>
                  <CCardBody>
                    <CCardTitle>Your Health Score is :</CCardTitle>
                    <CCardText>{healthScore}%</CCardText>
                  </CCardBody>
                </CCard>
                <CCol />
              </CRow>
              <CRow className="mt-4">
                <CCol sm="auto"></CCol>
                <CCard style={{ width: '18rem' }}>
                  <CCardBody>
                    <CCardTitle>Vaccination Reminder</CCardTitle>
                    {vaccineReminder.length === 0 ? (
                      <CCardText>No upcoming vaccinations</CCardText>
                    ) : (
                      vaccineReminder.map((vaccine, index) => (
                        <CCardText key={index}>
                          {vaccine.vaccine_name} on {new Date(vaccine.date_of_vaccine).toLocaleDateString()}
                        </CCardText>
                      ))
                    )}
                  </CCardBody>
                </CCard>
                <CCol />
                <CCol sm="auto"></CCol>
                <CCard style={{ width: '18rem' }}>
                  <CCardBody>
                    <CCardTitle>Medicine Reminder</CCardTitle>
                    {medicineReminder.length === 0 ? (
                      <CCardText>No medicines to take</CCardText>
                    ) : (
                      medicineReminder.map((medicine, index) => (
                        <CCardText key={index}>
                          {medicine.medicinename} - {medicine.M ? 'Morning ' : ''}{medicine.A ? 'Afternoon ' : ''}{medicine.N ? 'Night' : ''}
                        </CCardText>
                      ))
                    )}
                  </CCardBody>
                </CCard>
                <CCol />
              </CRow>
              <CRow className="mt-4">
                <CCol>
                  <CChart
                    ref={chartRef}
                    type="line"
                    data={chartData}
                    options={{
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          labels: {
                            color: getStyle('--cui-body-color'),
                          },
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: getStyle('--cui-border-color-translucent'),
                          },
                          ticks: {
                            color: getStyle('--cui-body-color'),
                          },
                        },
                        y: {
                          grid: {
                            color: getStyle('--cui-border-color-translucent'),
                          },
                          ticks: {
                            color: getStyle('--cui-body-color'),
                          },
                        },
                      },
                    }}
                    height={400}
                  />
                </CCol>
              </CRow>
            </CContainer>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default withPatientAuth(PatientDashboard);