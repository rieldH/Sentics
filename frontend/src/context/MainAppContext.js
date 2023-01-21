import {createContext, useCallback, useEffect, useMemo, useState} from "react";

export const MainAppContext = createContext(undefined);

export const MainAppContextProvider = properties => {

    const [response, setResponse] = useState([]);
    const [allHumans, setAllHumans] = useState([]);

    const getAllHumans = useCallback(() => {
        fetch('http://localhost:8080/api/humanIDs', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then((res) => res.json())
            .then((response) => {
                setAllHumans(response);
            });
    }, []);

    async function filterData(startDate, endDate, option, selectedUserId) {
        fetch(`http://localhost:8080/api/?startDate=${startDate}&endDate=${endDate}&option=${option}&humanID=${selectedUserId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
            .then((res) => res.json())
            .then((response) => {
                setResponse(response);
            }).catch((e) => console.log(e));
    }

    const values = useMemo(() => {
        return {
            response,
            filterData,
            allHumans
        }
    }, [response, allHumans]);

    useEffect(() => {
        getAllHumans();
    }, [getAllHumans])

    return (
        <MainAppContext.Provider
            value={values}
        >
            {properties.children}
        </MainAppContext.Provider>
    );
};
