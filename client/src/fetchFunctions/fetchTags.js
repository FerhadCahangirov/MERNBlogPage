import { httpHeaders, httpMethods } from "../config/httpconfig";

export const fetch_GetTags = async (page, size, content) => {
    const requestOptions = {
        method: httpMethods.get, headers: httpHeaders, credentials: 'include'
    };
    try {
        const response = await fetch(`http://localhost:8080/tags/query?page=${page}&size=${size}&content=${content}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_CreateTag = async (content) => {
    const requestOptions = {
        method: httpMethods.post, headers: httpHeaders, credentials: 'include', body: JSON.stringify({ content: content })
    };
    try {
        const response = await fetch(`http://localhost:8080/tags/`, requestOptions);
        const data = response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_UpdateTag = async (content, tagId) => {
    const requestOptions = {
        method: httpMethods.put, headers: httpHeaders, credentials: 'include', body: JSON.stringify({ content: content })
    };
    try {
        const response = await fetch(`http://localhost:8080/tags/${tagId}`, requestOptions);
        const data = response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_DeleteTag = async (tagId) => {
    const requestOptions = {
        method: httpMethods.delete, headers: httpHeaders, credentials: 'include'
    };
    try {
        const response = await fetch(`http://localhost:8080/tags/${tagId}`, requestOptions);
        const data = response.json();
        return data;
    } catch (error) { throw error; }
}