import './App.scss';
import { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/Upload/Upload';
import TableDisplay from './components/TableDisplay/TableDisplay';
import Statistics from './components/Statistics/Statistics';
import VisualizationButton from './components/VisualizationButton/VisualizationButton';
import DataQuality from './components/DataQuality/DataQuality';
import SidePanel from './components/SidePanel/SidePanel';
import About from './components/About/About';
import DashboardBuilder from './components/Dashboard/Dashboard';
import Export from './components/Export/Export';

function App() {
  const [rows, setRows] = useState([]);
  const [statistics, setStatistics] = useState([]);
  const [activeViews, setActiveViews] = useState([]); 

  const handleFileUpload = (uploadedRows) => {
    setRows(uploadedRows);
    addActiveView('tableDisplay');
  };

  const addActiveView = (view) => {
    setActiveViews((currentViews) => {
      if (view === 'about') {
        return currentViews.includes(view) ? currentViews : [view];
      }
      const viewsWithoutAbout = currentViews.filter(v => v !== 'about');
      if (!viewsWithoutAbout.includes(view)) {
        return [...viewsWithoutAbout, view];
      }
      return viewsWithoutAbout; 
    });
  };

  const calculateStatistics = async () => {
    try {
      const response = await axios.post('http://localhost:3001/statistics', { data: rows });
      setStatistics(response.data);
    } catch (error) {
      console.error('Error calculating statistics:', error);
    }
  };

  const renderView = (view) => {
    switch (view) {
      case 'about':
        return <About />;
      case 'upload':
        return <FileUpload setRows={handleFileUpload} />;
      case 'tableDisplay':
        return <TableDisplay rows={rows} />;
     case 'quality':
          return <DataQuality data={rows} setRows={setRows}/>;
      case 'statistics':
        return  (
          <>
            {rows.length > 0 && (
              <button onClick={calculateStatistics}>Calculate Statistics</button>
            )}
            <Statistics statistics={statistics} />
          </>
        );
      case 'createGraph':
        return <VisualizationButton data={rows} />;
      case 'createDashboard':
        return <DashboardBuilder data={rows} />;
      case 'export':
        return <Export data={rows} graphElementId="myGraphElementId" dashboardElementId="myDashboardElementId" />;
      default:
        return <div>Select a view</div>;
    }
  };

  const renderContent = () => {
    return activeViews.map((view, index) => (
      <div key={index} className="view-container">{renderView(view)}</div>
    ));
  };

  return (
    <div className="app-container">
      <SidePanel setActiveView={addActiveView} />
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

export default App;
