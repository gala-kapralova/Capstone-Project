import { useState } from 'react';
import axios from 'axios';
import './Upload.scss';

export default function FileUpload({ setRows }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [rows, setInternalRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [editHeaders, setEditHeaders] = useState([]);
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileUploaded(false);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);
      if (response.data && response.data.rows) {
        setInternalRows(response.data.rows);
        setRows(response.data.rows);
        const initialHeaders = Object.keys(response.data.rows[0]);
        setHeaders(initialHeaders);
        setEditHeaders(initialHeaders);
        setFileUploaded(true);
      } else {
        console.error('Invalid response from server.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleHeaderChange = (index, newValue) => {
    const updatedHeaders = [...editHeaders];
    updatedHeaders[index] = newValue;
    setEditHeaders(updatedHeaders);
  };

  const applyHeaderChanges = () => {
    const updatedRows = rows.map(row => {
      return editHeaders.reduce((acc, newHeader, index) => {
        const oldHeader = headers[index];
        acc[newHeader] = row[oldHeader] || '';
        return acc;
      }, {});
    });

    setRows(updatedRows);
    setHeaders(editHeaders);
  };

  return (
    <div className="file__upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload CSV</button>
      {fileUploaded && (
        <div>
          <h4>Adjust Headers</h4>
          {headers.map((header, index) => (
            <div key={index}>
              <input
                type="text"
                value={editHeaders[index]}
                onChange={(e) => handleHeaderChange(index, e.target.value)}
              />
            </div>
          ))}
          <button onClick={applyHeaderChanges}>Apply Header Changes</button>
        </div>
      )}
    </div>
  );
}
