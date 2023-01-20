import {createContext, useCallback, useEffect, useMemo, useState} from "react";

export const MainAppContext = createContext(undefined);

export const MainAppContextProvider = properties => {

    const [response, setResponse] = useState([]);

    const getAllData = useCallback(() => {
        const data = [
            {
                x: "19",
                y: "20"
            },
            {
                x: "11",
                y: "55"
            },
            {
                x: "5",
                y: "4"
            },
            {
                x: "19",
                y: "52"
            },
        ]

        // fetch('http://localhost:8080/api/', {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'GET'
        // })
        //     .then((res) => res.json())
        //     .then((response) => {
        //         setResponse(response.data);
        //     });
        console.log("Hello world1!!");
        setResponse(data);
    }, []);

    async function filterData(startDate, endDate) {
        console.log("Hello World!");
        fetch('http://localhost:8080/api/filterData', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                startDate,
                endDate
            },
            method: 'POST'
        })
            .then((res) => res.json())
            .then((response) => {
                setResponse(response.data);
            }).catch((e) => console.log(e));
    }

    const values = useMemo(() => {
        return {
            response,
            filterData,
        }
    }, [response]);

    useEffect(() => {
        getAllData();
    }, [getAllData])

    return (
        <MainAppContext.Provider
            value={values}
        >
            {properties.children}
        </MainAppContext.Provider>
    );
};
