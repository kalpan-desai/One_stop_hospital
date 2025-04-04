import React, { useState, useEffect } from 'react';
import { AppFooter, AppHeader } from '../../../components/index';
import {
  CCard, CCardBody, CForm, CFormInput, CButton, CAlert, 
  CFormTextarea, CFormLabel, CFormSelect
} from '@coreui/react';
import DoctorSidebar from '../../../components/DoctorSidebar';
import withDoctorAuth from './withDoctorAuth';

const CreateReport = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [caseData, setCaseData] = useState([]); 
  const [selectedCaseID, setSelectedCaseID] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [caseID, setCaseID] = useState('');

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch('http://localhost:3001/getCase');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const text = await response.text();
        console.log('Response body:', text);

        const data = JSON.parse(text);
        setCaseData(data || []);
      } catch (error) {
        console.error('Error fetching cases:', error);
        setError('Failed to fetch cases. Please try again later.');
        setCaseData([]);
      }
    };
    fetchCases();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!reportFile || !reportType || !description || !caseID) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('File', reportFile); // Ensure this matches the multer field name
    formData.append('reportType', reportType);
    formData.append('description', description);
    formData.append('caseID', caseID);

    // Get session values from localStorage
    const doctorSession = localStorage.getItem('doctorSession');

    try {
      const response = await fetch('http://localhost:3001/CreateReport', {
        method: 'POST',
        body: formData,
        headers: {
          'Doctor-Session': doctorSession
        }
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Report added successfully!');
        setReportFile(null);
        setReportType('');
        setDescription('');
        setCaseID('');
        setSelectedCaseID('');
      } else {
        setError(result.message || 'Report creation failed!');
      }
    } catch (error) {
      setError('Error connecting to server');
      console.error('Error connecting to server', error);
    }
  };

  return (
    <div>
      <DoctorSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="flex-grow-1">
        <div className="container mt-4">
          {message && <CAlert color="success">{message}</CAlert>}
          {error && <CAlert color="danger">{error}</CAlert>}

          <CCard className="p-4">
            <CCardBody>
              <CForm onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <CFormLabel htmlFor="reportFile">Select Report File</CFormLabel>
                  <CFormInput 
                    type="file" 
                    id="reportFile" 
                    onChange={(e) => setReportFile(e.target.files[0])} 
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="reportType">Report Type</CFormLabel>
                  <CFormSelect 
                    id="reportType" 
                    value={reportType} 
                    onChange={(e) => setReportType(e.target.value)}
                  >
                    <option value="">Select Report Type</option>
                    <option value="Blood Test">Blood Test</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI">MRI</option>
                    <option value="CT Scan">CT Scan</option>
                  </CFormSelect>
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="description">Description</CFormLabel>
                  <CFormTextarea 
                    id="description" 
                    rows={3} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="caseID">Select Case</CFormLabel>
                  <CFormInput 
                    type="text"
                    value={selectedCaseID}
                    onChange={(e) => setSelectedCaseID(e.target.value)}
                    placeholder="Type to search for a case..."
                  />
                  <ul className="list-group" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {caseData.filter(caseItem => caseItem.disease.toLowerCase().includes(selectedCaseID.toLowerCase())).map(caseItem => (
                      <li key={caseItem.id} className="list-group-item" onClick={() => {
                        setSelectedCaseID(caseItem.disease);
                        setCaseID(caseItem.id);
                      }}>
                        {caseItem.disease}
                      </li>
                    ))}
                  </ul>
                </div>

                <CButton 
                  color="primary" 
                  className="px-4 d-block mx-auto" 
                  type="submit"
                >
                  Add Report
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default withDoctorAuth(CreateReport);