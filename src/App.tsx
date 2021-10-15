import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import EntitySearch from './EntitySearch';

function App() {
    return (
        <div className="App">
            <Navbar />
            <section className="section">
                <div className="columns">
                    <div className="column">
                        <EntitySearch name={"Competitor"} enabled={true} />
                    </div>
                    <div className="column">
                        <EntitySearch name={"Competition"} enabled={true} />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default App;
