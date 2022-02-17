import React, { useState, useEffect } from "react";

function CsrfComponent({ onGetCSRF = () => { }, onPostCSRF = () => { } }) {
    const [data, setData] = useState({
        testGet: 'LOADING',
        testPost: 'LOADING',
        isLoading: false,
    })

    // Get data from server
    useEffect(() => {
        async function fetchData() {
            // If we already get data from server
            if (data.isLoading) {
                return;
            }
            let testGetData = await onGetCSRF();
            let testPostData = await onPostCSRF();
            setData({
                ...data,
                testGet: testGetData,
                testPost: testPostData,
                isLoading: true,
            })
        }

        fetchData();
    })

    return (
        <>
            <p>Test GET request: {data.testGet}</p>
            <p>Test POST request: {data.testPost}</p>
        </>
    );
}

export default CsrfComponent;
