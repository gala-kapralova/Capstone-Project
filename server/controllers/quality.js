const analyzeData = (data) => {
    let emptyValues = 0;
    let duplicates = 0;
    const uniqueRows = new Set();

    data.forEach(row => {
        const rowData = JSON.stringify(row);
        if (uniqueRows.has(rowData)) {
            duplicates++;
        } else {
            uniqueRows.add(rowData);
        }

        Object.keys(row).forEach(key => {
            const value = row[key];
            if (!value || value === "N/A" || value === "?" || value === 0) {
                emptyValues++;
                row[key] = (typeof value === 'string') ? "Unknown" : 0;
            }
        });
    });

    return { emptyValues, duplicates };
};

exports.calculateData = (req, res) => {
    const data = req.body.data; 
    const analysisResults = analyzeData(data);
    res.json(analysisResults);
};