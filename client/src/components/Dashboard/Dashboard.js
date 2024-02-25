import { useState } from 'react';
import Chart from '../Chart/Chart';
import './Dashboard.scss';

const DashboardBuilder = ({ data }) => {
  const [layout, setLayout] = useState('1x1');

  const renderCharts = () => {
    const layoutConfig = {
      '1x1': 2,
      '2x2': 4,
      '2x1': 3,
    };

    const chartCount = layoutConfig[layout];
    const charts = [];

    for (let i = 0; i < chartCount; i++) {
      charts.push(
        <div key={i} className={`dashboard-chart__container layout-${layout}`}>
          <Chart data={data} />
        </div>
      );
    }

    return charts;
  };

  return (
    <div id="myDashboardElementId" className="dashboard__builder">
      <div className="layout__selector" >
       <h3>Select a dashboard template</h3>
        <button onClick={() => setLayout('1x1')}>1x1</button>
        <button onClick={() => setLayout('2x2')}>2x2</button>
        <button onClick={() => setLayout('2x1')}>2x1</button>
      </div>
      <div className={`charts layout-${layout}`}>
        {renderCharts()}
      </div>
    </div>
  );
};

export default DashboardBuilder;
