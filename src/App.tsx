import './App.css';
import Navbar from './Navbar';
import EntitySearch from './EntitySearch';

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className="columns">
                <div className="column">
                    <EntitySearch name={"Competitor"} enabled={true} />
                </div>
                <div className="column">
                    <EntitySearch name={"Competition"} enabled={true} />
                </div>
            </div>
        </div>
    );
}

export default App;
