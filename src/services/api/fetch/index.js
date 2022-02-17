import { DEFAULT_ROUTE } from '../../../constants';

export async function getCSRFRequest() {
    return await fetch(`${DEFAULT_ROUTE}/csrf`, {
        credentials: 'include',
    });
}

export async function getPingResponse() {
    return fetch(`${DEFAULT_ROUTE}/ping`, {
        method: 'GET',
        credentials: 'include',
    });
}

export async function postPingResponse(csrfToken) {
    return fetch(`${DEFAULT_ROUTE}/ping`, {
        method: 'POST',
        headers: ({
            'X-CSRFToken': csrfToken
        }),
        credentials: 'include',
    })
}
