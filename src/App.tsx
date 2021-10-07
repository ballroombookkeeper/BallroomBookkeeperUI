import './App.css';
import Navbar from './Navbar';
import EntitySearch from './EntitySearch';

function App() {
    const competitorSearch = new EntitySearch({ name: "Competitor", enabled: true });
    const competitionSearch = new EntitySearch({ name: "Competition", enabled: false });
    return (
        <div className="App">
            <Navbar />
            <div className="columns">
                <div className="column">
                    { competitorSearch.render() }
                </div>
                <div className="column">
                    { competitionSearch.render() }
                </div>
            </div>
        </div>
    );
}

export default App;
