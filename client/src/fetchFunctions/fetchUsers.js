import { httpHeaders, httpMethods } from "../config/httpconfig";

export const fetch_GetUsers = async (page, size, content) => {
    const requestOptions = { method: httpMethods.get, headers: httpHeaders };
    try {
        const response = await fetch(`http://localhost:8080/users/query?page=${page}&size=${size}&content=${content}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_DeleteUser = async (userId) => {
    const requestOptions = { method: httpMethods.delete, headers: httpHeaders, credentials: 'include' };
    try {
        const response = await fetch(`http://localhost:8080/users/remove/${userId}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

