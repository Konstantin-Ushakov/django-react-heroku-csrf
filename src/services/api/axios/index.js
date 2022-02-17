import axios from "axios";
import { DEFAULT_ROUTE } from '../../../constants';

export async function getCSRFRequest() {
    return axios.get(`${DEFAULT_ROUTE}/csrf`, {
        withCredentials: true,
    })
}

export async function getPingResponse() {
    return axios.get(`${DEFAULT_ROUTE}/ping`);
}

export async function postPingResponse(csrfToken) {
    return axios.post(`${DEFAULT_ROUTE}/ping`, "", {
        withCredentials: true,
        headers: {
            'X-CSRFToken': csrfToken,
        }
    });
}
