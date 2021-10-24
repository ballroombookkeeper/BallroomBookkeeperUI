import './App.css';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './About';
import Home from './Home';
import NotFound from './404';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

function EntityPage() {
    // TODO: Make this a full-fledged page and make separate class per entity
    // This is just for stubbing
    let params = useParams() as unknown as { id: number };
    return (
        <div>
            ID: { params.id }
        </div>
    );
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
                        <Route path="/competitor/:id">
                            <EntityPage />
                        </Route>
                        <Route path="/competition/:id">
                            <EntityPage />
                        </Route>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </section>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
