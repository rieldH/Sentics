import h337 from "heatmap.js";
import {useCallback, useContext, useEffect} from "react";
import './HeatMap.css'
import {MainAppContext} from "../../context/MainAppContext";

const HeatMapComponent = () => {

    const {response} = useContext(MainAppContext);

    const showHeatMap = useCallback(() => {
        const heatmapInstance = h337.create({
            // only container is required, the rest will be defaults
            container: document.querySelector('.area')
        });
        heatmapInstance.repaint();
        // now generate some random data
        const points = [];

        for (let i = 0; i < response.length; i++) {
            console.log(response[i]);
            const point = {
                x: response[i].timestamp / 10000,
                y: response[i].UserInstanceCount,
            };
            points.push(point);
        }
        // heatmap data format
        const data = {
            data: points
        };
        // if you have a set of datapoints always use setData instead of addData
        // for data initialization
        heatmapInstance.setData(data);
    }, [response])

    useEffect(() => {
        showHeatMap();
    }, [showHeatMap])

    // window.addEventListener('resize', handleResize);

    return (
        <div className="area">
        </div>
    )
}

export default HeatMapComponent;