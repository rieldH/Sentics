import {CChart} from "@coreui/react-chartjs";
import './GraphStyle.css'
import {useContext, useState} from "react";
import {MainAppContext} from "../../context/MainAppContext";
import {Button, TextField} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from "@mui/x-date-pickers";


const GraphComponent = () => {

    const {response, filterData} = useContext(MainAppContext);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const handleChangeStartDate = (newValue) => {
        setStartDate(newValue.toISOString());
    };

    const handleChangeEndDate = (newValue) => {
        setEndDate(newValue.toISOString());
    };

    const handleSearchButton = (event) => {
        event.preventDefault();
        filterData({
            startDate,
            endDate
        });
        return;
    };

    return (
        <div>
            <div className="mainHolder">
                <div className="filterHolder">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Start date"
                            inputFormat="DD/MM/YYYY hh:mm:ss"
                            value={startDate}
                            onChange={handleChangeStartDate}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <DateTimePicker
                            label="End Date"
                            inputFormat="DD/MM/YYYY hh:mm:ss"
                            value={endDate}
                            onChange={handleChangeEndDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button variant="contained" onClick={(e) => {
                            handleSearchButton(e);
                        }}>Search</Button>
                    </LocalizationProvider>

                </div>

                <CChart
                    // className="mainHolder"
                    type="scatter"
                    data={{
                        datasets: [{
                            label: 'People x Time',
                            data: response,
                            backgroundColor: 'rgb(0,0,0)'
                        }],
                    }}
                    options={{
                        responsive: true,
                        // plugins: {
                        //     tooltip: {
                        //         mode: 'index',
                        //         intersect: false
                        //     },
                        //     title: {
                        //         display: true,
                        //         text: 'Chart.js Line Chart'
                        //     }
                        // },
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        let label = context.dataset.label || '';

                                        if (label) {
                                            label += ': ';
                                        }
                                        if (context.parsed.y !== null) {
                                            label += new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(context.parsed.y);
                                        }
                                        return label;
                                    }
                                }
                            }
                        },
                        hover: {
                            mode: 'index',
                            intersec: false
                        },
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'People'
                                },
                                // min: 0,
                                // max: 100,
                                // ticks: {
                                //     // forces step size to be 50 units
                                //     stepSize: 50
                                // }
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default GraphComponent;