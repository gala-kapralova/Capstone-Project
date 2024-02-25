import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line, Scatter, Pie } from 'react-chartjs-2';
import "./Chart.scss";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data, graphElementId }) => {
  // State hooks for managing chart configuration
  const [showMenu, setShowMenu] = useState(false);
  const [chartType, setChartType] = useState('Line');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');

  // Extract column names from the data for axis configuration
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // Function to construct the chart data object based on the current configuration
  const getChartData = () => {
    switch (chartType) {
      case 'Line':
      case 'Bar':
        return {
          labels: data.map(item => item[xAxis]),
          datasets: [{
            label: yAxis,
            data: data.map(item => item[yAxis]),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          }],
        };
      case 'Scatter':
        return {
          datasets: [{
            label: `${xAxis} vs ${yAxis}`,
            data: data.map(item => ({
              x: item[xAxis],
              y: item[yAxis]
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
          }],
        };
      case 'Pie':
        const aggregateData = data.reduce((acc, item) => {
          const key = item[xAxis];
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        return {
          labels: Object.keys(aggregateData),
          datasets: [{
            data: Object.values(aggregateData),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        };
      default:
        return {};
    }
  };

  // Function to construct chart options based on the current configuration
  const getChartOptions = () => {
    let titleText = `${chartType} Chart`; // Default title text
  
    if (chartType === 'Pie') {
      titleText += ` - ${xAxis}`; // Append the selected column name for Pie charts
  
      return {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: titleText // Use the updated title text here
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
      };
    } else {
      // For other chart types include both xAxis and yAxis in the title
      titleText += `: ${yAxis} vs ${xAxis}`;
  
      return {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: titleText
          },
          legend: {
            display: true,
            position: 'top',
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: xAxis,
            },
            type: chartType === 'Scatter' ? 'linear' : 'category',
          },
          y: {
            title: {
              display: true,
              text: yAxis,
            }
          }
        },
      };
    }
  };

  // Dynamic component for rendering the chart based on the selected type
  const ChartComponent = {
    Line: Line,
    Bar: Bar,
    Scatter: Scatter,
    Pie: Pie,
  }[chartType];

  return (
    <div className="chart">
    <button className="chart-config__button" onClick={() => setShowMenu(!showMenu)}>Configure Chart</button>
    {showMenu && (
      <div className="chart-config">
        <label>
          Chart Type:
          <select onChange={e => setChartType(e.target.value)} value={chartType}>
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
            <option value="Scatter">Scatter</option>
            <option value="Pie">Pie</option>
          </select>
        </label>
        <label>
            Category:
            <select onChange={e => setXAxis(e.target.value)} value={xAxis}>
              {columns.map(col => <option key={col} value={col}>{col}</option>)}
            </select>
          </label>
          {chartType !== 'Pie' && (
            <label>
              Y-Axis:
              <select onChange={e => setYAxis(e.target.value)} value={yAxis}>
                {columns.map(col => <option key={col} value={col}>{col}</option>)}
              </select>
            </label>
          )}
          <button onClick={() => setShowMenu(false)}>Close</button>
        </div>
      )}
      {xAxis && (chartType !== 'Pie' ? yAxis : true) && (
        <div className="chart__container" id={graphElementId}>
          <ChartComponent data={getChartData()} options={getChartOptions()} />
        </div>
      )}
    </div>
  );
};


export default Chart;
