import './Table.scss';
import { useState } from 'react';


const TableDisplay = ({ rows }) => {
  const [rowLimit, setRowLimit] = useState(rows.length);

  const handleInputChange = (event) => {
    const limit = parseInt(event.target.value, 10);
    setRowLimit(isNaN(limit) ? rows.length : limit);
  };

  // Check if rows have data
  if (!rows || rows.length === 0) {
    return <p>No data to display</p>;
  }

  // Extract column headers
  const headers = Object.keys(rows[0]);

  // Calculate the rows to display based on rowLimit
  const displayedRows = rows.slice(0, rowLimit);

  return (
    <div className="table__container">
      <h3 className="table__limit" > Enter number of rows to display<input
        type="number"
        value={rowLimit > rows.length ? rows.length : rowLimit}
        onChange={handleInputChange}
        placeholder="Enter number of rows to display"
        
      /></h3>
      <div className="table__structure">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedRows.map((row, index) => (
              <tr key={index}>
                {headers.map((header, cellIndex) => (
                  <td key={cellIndex}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDisplay;
