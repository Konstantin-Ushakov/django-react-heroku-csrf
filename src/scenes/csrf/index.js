import React from "react";
import CsrfComponent from '../../components/csrf';
import {
    getCSRFRequest as axiosGetRequest,
    getPingResponse as axiosGetPingResponse,
    postPingResponse as axiosPostPingResponse
} from '../../services/api/axios';
import {
    getCSRFRequest as fetchGetRequest,
    getPingResponse as fetchGetPingResponse,
    postPingResponse as fetchPostPingResponse
} from '../../services/api/fetch';

async function axiosGetCsrfToken() {
    let csrfToken = '';
    let data = {};
    try {
        const response = await axiosGetRequest()
        data = response.data;
    } catch (error) {
        return csrfToken
    }
    csrfToken = data.csrfToken;
    return csrfToken;
}

async function fetchGetCsrfToken() {
    const response = await fetchGetRequest()
    const data = await response.json();
    return data.csrfToken;
}

async function axiosTestRequest(method) {
    let data = {};
    if (method === 'GET') {
        try {
            const response = await axiosGetPingResponse()
            data = response.data;
        } catch (error) {
            data = {
                result: 'FAIL',
            }
        }
    } else {
        try {
            const csrf_token = await axiosGetCsrfToken();
            const response = await axiosPostPingResponse(csrf_token)
            data = response.data;
        } catch (error) {
            data = {
                result: 'FAIL',
            }
        }
    }
    return data.result;
}

async function fetchTestRequest(method) {
    let response;
    if (method === 'GET') {
        response = await fetchGetPingResponse();
    } else {
        const csrf_token = await fetchGetCsrfToken();
        response = await fetchPostPingResponse(csrf_token);
    }
    const data = await response.json();
    return data.result;
}

function CsrfScene() {
    return (
        <>
            <h1>
                Axios
            </h1>
            <CsrfComponent onGetCSRF={() => axiosTestRequest('GET')} onPostCSRF={() => axiosTestRequest('POST')} />
            <h1>
                Fetch
            </h1>
            <CsrfComponent onGetCSRF={() => fetchTestRequest('GET')} onPostCSRF={() => fetchTestRequest('POST')} />
        </>
    );
}

export default CsrfScene;
