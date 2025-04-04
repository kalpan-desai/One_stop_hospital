import React, { useEffect, useState } from 'react';
import { AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import { 
  CCard, 
  CContainer, 
  CRow, 
  CCol, 
  CCardBody, 
  CCardTitle, 
  CAlert, 
  CTable, 
  CTableHead, 
  CTableBody, 
  CTableRow, 
  CTableHeaderCell, 
  CTableDataCell 
} from '@coreui/react';
import PatientSidebar from '../../../components/PatientSidebar';
import withPatientAuth from './withPatientAuth';
import { parseISO, format } from 'date-fns';

const PatientReport = () => {
  const [previousReports, setPreviousReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      const patientSession = JSON.parse(localStorage.getItem('patientSession'));
      const patientId = patientSession?.id;

      if (!patientId) {
        setError('No patient session found');
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:3001/api/reports?patient_id=${patientId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPreviousReports(data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching reports');
      }
    };

    fetchReports();
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
              <CRow className="mt-4">
                <CCard>
                  <CCardBody>
                    <CCardTitle>Previous Reports</CCardTitle>
                    {previousReports.length === 0 ? (
                      <CAlert color="info">No reports available</CAlert>
                    ) : (
                      <CTable hover responsive>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>Date</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                            <CTableHeaderCell>Report</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {previousReports.map((report, index) => (
                            <CTableRow key={index}>
                              <CTableDataCell>{format(parseISO(report.created_at), 'yyyy-MM-dd HH:mm:ss')}</CTableDataCell>
                              <CTableDataCell>{report.description}</CTableDataCell>
                              <CTableDataCell>
                                <a href={`http://127.0.0.1:3001/api/downloadReport/${report.report_file}`} download>
                                  Download
                                </a>
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    )}
                  </CCardBody>
                </CCard>
              </CRow>
            </CContainer>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default withPatientAuth(PatientReport);