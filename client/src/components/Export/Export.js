import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "./Export.scss";

const Export = ({ data, graphElementId, dashboardElementId }) => {
    const [exportOption, setExportOption] = useState('');

    const exportCSV = (jsonData) => {
        const csvRows = [];
        const headers = Object.keys(jsonData[0]);
        csvRows.push(headers.join(','));

        jsonData.forEach(row => {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.csv';
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const exportGraphToPDF = async (graphElementId) => {
        console.log("Exporting graph with ID:", graphElementId);
        const element = document.getElementById(graphElementId);
        if (!element) {
            console.error('Element not found:', graphElementId);
            return;
        }
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
        });
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('graph.pdf');
    };

    const exportDashboardToPDF = async () => {
        const elementsToHide = document.querySelectorAll('.chart-config, .layout__selector, .export, .chart-config__button');
        elementsToHide.forEach(el => el.classList.add('hide-for-export'));
      
        const dashboardElement = document.getElementById(dashboardElementId);
        if (!dashboardElement) {
          console.error('Dashboard element not found:', dashboardElementId);
          elementsToHide.forEach(el => el.classList.remove('hide-for-export'));
          return;
        }
      
        const canvas = await html2canvas(dashboardElement);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
        });

        const remInPx = 16; 
        const pxToPts = (72 / 96);
        const marginBottomPts = remInPx * pxToPts;
 
        const marginTop = (16 / 96) * 72;
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight() - marginBottomPts; 
        const imgWidth = imgProps.width;
        const imgHeight = imgProps.height;
        const ratio = Math.min(pdfWidth / imgWidth, (pdfHeight - marginTop) / imgHeight); 

        pdf.addImage(imgData, 'PNG', 0, marginTop, imgWidth * ratio, imgHeight * ratio);
        pdf.save('dashboard.pdf');
      
        elementsToHide.forEach(el => el.classList.remove('hide-for-export'));
      };

    const handleExport = () => {
        switch (exportOption) {
            case 'csv':
                exportCSV(data);
                break;
            case 'graph':
                exportGraphToPDF(graphElementId);
                break;
            case 'dashboard':
                exportDashboardToPDF();
                break;
            default:
                console.log('Please select an export option.');
        }
    };

    return (
        <div className="export">
            <select onChange={(e) => setExportOption(e.target.value)} value={exportOption}>
                <option value="">Select export option</option>
                <option value="csv">CSV Dataframe</option>
                <option value="graph">Single Graph (PDF)</option>
                <option value="dashboard">Dashboard (PDF)</option>
            </select>
            <button onClick={handleExport}>Export</button>
        </div>
    );
};

export default Export;
