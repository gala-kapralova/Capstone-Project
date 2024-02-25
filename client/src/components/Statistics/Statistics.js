import './Statistics.scss';

const Statistics = ({ statistics }) => {
    if (!statistics || statistics.length === 0) {
      return <p>No statistics to display.</p>;
    }

    return (
        <div className="statistics">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Column</th>
                            <th>Average</th>
                            <th>Max</th>
                            <th>Min</th>
                        </tr>
                    </thead>
                    <tbody>
                        {statistics.map((stat, index) => (
                            <tr key={index}>
                                <td>{stat.column}</td>
                                <td>{stat.average ? stat.average.toFixed(2) : 'N/A'}</td>
                                <td>{stat.max ? stat.max.toFixed(2) : 'N/A'}</td>
                                <td>{stat.min ? stat.min.toFixed(2) : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Statistics;