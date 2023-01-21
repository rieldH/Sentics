import {CChart} from "@coreui/react-chartjs";
import './GraphStyle.css'
import {useContext, useEffect, useState} from "react";
import {MainAppContext} from "../../context/MainAppContext";
import {Button, MenuItem, Select, TextField} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateTimePicker} from "@mui/x-date-pickers";
import moment from "moment";


const GraphComponent = () => {

    const {response, filterData, allHumans} = useContext(MainAppContext);

    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(new Date().toISOString());
    const [option, setOption] = useState('humanXtime');
    const [selectedUserId, setSelectedUserId] = useState();


    const handleChangeStartDate = (newValue) => {
        setStartDate(newValue.toISOString());
    };

    const handleChangeEndDate = (newValue) => {
        setEndDate(newValue.toISOString());
    };

    const handleSearchButton = (event) => {
        event.preventDefault();
        filterData(
            startDate,
            endDate,
            option,
            selectedUserId
        );
        return;
    };


    const handleChange = (event) => {
        setOption(event.target.value);
    };

    const handleChangeSelectedUser = (event) => {
        setSelectedUserId(event.target.value);
    }

    useEffect(() => {
    }, [response]);

    return (
        <div>
            <div className="mainHolder">
                <div className="filterHolder">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Select
                            labelId={"select-option"}
                            id={"select-option"}
                            value={option}
                            label="Select Option"
                            onChange={handleChange}
                        >
                            <MenuItem value={'HUMANXTIME'}>Nr of human at time</MenuItem>
                            <MenuItem value={'POSHUMAN'}>Position of human</MenuItem>
                        </Select>
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
                        {
                            option === "POSHUMAN" && <Select
                                labelId={"select-user"}
                                id={"select-user"}
                                value={selectedUserId}
                                label={"Select user"}
                                defaultOpen
                                onChange={handleChangeSelectedUser}
                            >
                                {
                                    allHumans.map((element, index) => {
                                        return <MenuItem value={element.humanID}>{element.humanID}</MenuItem>
                                    })
                                }
                            </Select>
                        }
                        <Button variant="contained" onClick={(e) => {
                            handleSearchButton(e);
                        }}>Search</Button>
                    </LocalizationProvider>
                </div>
                {option === "HUMANXTIME" ?
                    <CChart
                        type="bar"
                        data={{
                            labels: response.map((element) => {
                                return moment(element.timestamp).format('DD/MM/YYYY HH:MM:SS')
                            }),
                            datasets: [
                                {
                                    label: 'Number of People at a given time',
                                    backgroundColor: '#f87979',
                                    data: response.map((element) => {
                                        return element.UserInstanceCount
                                    }),
                                },
                            ],
                        }}
                        labels="hours"/> :
                    <CChart
                        type="bar"
                        data={{
                            labels: response.map((element) => {
                                return moment(element.timestamp).format('DD/MM/YYYY HH:MM:SS')
                            }),
                            datasets: [
                                {
                                    label: 'X position of User',
                                    backgroundColor: '#f87979',
                                    data: response.map((element) => {
                                        return element.pos_x
                                    }),
                                },
                            ],
                        }}
                        labels="hours"/>
                }
            </div>
        </div>
    )
}

export default GraphComponent;