import EntitySearch from './components/EntitySearch';

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

export default Home;