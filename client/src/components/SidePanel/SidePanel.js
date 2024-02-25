import './SidePanel.scss';


const SidePanel = ({ setActiveView }) => {
  return (
    <div className="side__panel">
        <div className="side__header">
      <h1>DATA KAPELLMEISTER</h1> </div>
      <div className="side__container">
      <ul>
        <li onClick={() => setActiveView('about')}>ABOUT</li>
        <li onClick={() => setActiveView('upload')}>UPLOAD</li>
        <li onClick={() => setActiveView('quality')}>QUALITY</li>
        <li onClick={() => setActiveView('statistics')}>STATISTICS</li>
        <li onClick={() => setActiveView('createGraph')}>GRAPH</li>
        <li onClick={() => setActiveView('createDashboard')}>DASHBOARD</li>
        <li onClick={() => setActiveView('export')}>EXPORT</li>
      </ul>
      </div>
    </div>
  );
};

export default SidePanel;