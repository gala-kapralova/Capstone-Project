import { useState } from 'react';
import axios from 'axios';
import './Quality.scss';

const DataQuality = ({ data, setRows }) => {
  const [qualityMetrics, setQualityMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [missingValueStrategy, setMissingValueStrategy] = useState('');
  const [missingRows, setMissingRows] = useState([]);
  const [replacementValue, setReplacementValue] = useState("");
  const [selectedColumn, setSelectedColumn] = useState('');

  const analyzeDataQuality = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3001/quality', { data });
      setQualityMetrics(response.data);
      setMissingRows(response.data.missingRows || []);
    } catch (error) {
      console.error('Error fetching data quality metrics:', error);
      setError('Failed to fetch data quality metrics.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderMissingValueTable = () => (
    <table>
      <thead>
        <tr>
          {Object.keys(data[0] || {}).map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {missingRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.keys(row).map((key, cellIndex) => (
              <td key={cellIndex}>{row[key] ? row[key] : 'Missing'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const applyMissingValueChanges = () => {
    const updatedRows = data.map(row => {
      if (!selectedColumn || selectedColumn === '') {
        Object.keys(row).forEach(key => {
          row[key] = row[key] ? row[key] : replacementValue;
        });
      } else {
        row[selectedColumn] = row[selectedColumn] ? row[selectedColumn] : replacementValue;
      }
      return row;
    });

    setMissingRows(updatedRows.filter(row => 
      Object.values(row).some(value => value === replacementValue)
    ));

    setQualityMetrics({ ...qualityMetrics, emptyValues: 0 });
    setRows(updatedRows);
  };

  return (
    <div className="quality">
      <button onClick={analyzeDataQuality} disabled={isLoading}>
        {isLoading ? 'Analyzing...' : 'Analyze Data Quality'}
      </button>
      {error && <p>Error: {error}</p>}
      {qualityMetrics && (
        <div className="quality__metrics">
          <p>Empty Values: {qualityMetrics.emptyValues}</p>
          <p>Duplicates: {qualityMetrics.duplicates}</p>
          {missingValueStrategy === 'showMissing' && missingRows.length > 0 && (
            <>
              <h4>Rows with Missing Data</h4>
              {renderMissingValueTable()}
            </>
          )}
        </div>
      )}
       <div className="quality-strategy__container">
        <label htmlFor="missingValueStrategy">Handle Missing Values:</label>
        <select
          id="missingValueStrategy"
          className="quality-strategy__selector"
          value={missingValueStrategy}
          onChange={e => {
            setMissingValueStrategy(e.target.value);
            setSelectedColumn('');
          }}
        >
          <option value="">Select Strategy</option>
          <option value="adjustMissing">Adjust Missing Values</option>
          <option value="drop">Drop Missing Values</option>
        </select>
      </div>
      {missingValueStrategy === 'adjustMissing' && (
        <>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            className="quality-column__selector"
          >
            <option value="">Select Column (optional)</option>
            {Object.keys(data[0] || {}).map((header, index) => (
              <option key={index} value={header}>{header}</option>
            ))}
          </select>
          <input className="quality-column__input"
            type="text"
            placeholder="Enter value for missing data"
            value={replacementValue}
            onChange={(e) => setReplacementValue(e.target.value)}
          />
          <button onClick={applyMissingValueChanges}>Confirm Changes</button>
        </>
      )}
    </div>
  );
};

export default DataQuality;
