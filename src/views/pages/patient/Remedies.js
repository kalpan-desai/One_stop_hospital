import React, { useState, useEffect } from 'react';
import { AppFooter, AppHeader } from '../../../components/index';
import withPatientAuth from '../patient/withPatientAuth';
import PatientSidebar from '../../../components/PatientSidebar';

const Remedies = () => {
  const [remedies, setRemedies] = useState('');

  useEffect(() => {
    
    const fetchRemedies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/remedies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: 'Arthritis' })
        });
        const data = await response.json();
        setRemedies(data.response);
      } catch (error) {
        console.error('Error fetching remedies:', error);
      }
    };

    fetchRemedies();
  }, []);

  const formatMessageText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        return <span key={index}>{part.slice(1, -1)}<br /></span>;
      }
      return part;
    });
    return <span>{parts}</span>;
  };

  return (
    <div>
      <PatientSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="container mt-4">
          <div dangerouslySetInnerHTML={{ __html: remedies }} />
        </div>
      </div>
      <AppFooter style={{ marginTop: 'auto' }} />
    </div>
  );
};

export default withPatientAuth(Remedies);