import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import EntitySearch from './EntitySearch';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function Home() {
    return ( 
        <div className="columns">
            <div className="column">
                <EntitySearch name={"Competitor"} enabled={true} />
            </div>
            <div className="column">
                <EntitySearch name={"Competition"} enabled={true} />
            </div>
        </div>
    );
}

function About() {
    return <h2>About</h2>;
}

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <section className="section">
                    <Switch>
                        <Route path="/about">
                            <About />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </section>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
