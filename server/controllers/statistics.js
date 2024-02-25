exports.calculateData = (req, res) => {
    const data = req.body.data; 
    const qualityMetrics = analyzeData(data);
    res.json(qualityMetrics);
  };
  exports.statistics = (req, res) => {
    console.log(req.body);
    const data = req.body.data;
    const statistics = {};
  
    data.forEach(row => {
      for (const key in row) {
        if (!statistics[key]) {
          statistics[key] = {
            sum: 0,
            max: parseFloat(row[key]),
            min: parseFloat(row[key]),
            count: 0
          };
        }
        const value = parseFloat(row[key]);
        if (!isNaN(value)) {
          statistics[key].sum += value;
          statistics[key].max = Math.max(statistics[key].max, value);
          statistics[key].min = Math.min(statistics[key].min, value);
          statistics[key].count++;
        }
      }
    });
  
    const response = Object.keys(statistics).map(key => ({
      column: key,
      average: statistics[key].sum / statistics[key].count,
      max: statistics[key].max,
      min: statistics[key].min
    }));
  
    res.json(response);
  };