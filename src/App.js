import './App.css';
import GraphComponent from "./component/GraphComponent/GraphComponent";
import HeatMapComponent from "./component/HeatMapComponent/HeatMapComponent";
import {MainAppContextProvider} from "./context/MainAppContext";


function App() {
    return (
        <MainAppContextProvider>
            <div className="App">
                <GraphComponent></GraphComponent>
                {/*<HeatMapComponent></HeatMapComponent>*/}
            </div>
        </MainAppContextProvider>
    );
}

export default App;
