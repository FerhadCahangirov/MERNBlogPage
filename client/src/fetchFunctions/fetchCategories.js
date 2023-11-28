import { httpHeaders, httpMethods } from "../config/httpconfig";

export const fetch_GetCategories = async () => {
    const requestOptions = {
        method: httpMethods.get, headers: httpHeaders, credentials: 'include'
    };
    try {
        const response = await fetch(`http://localhost:8080/categories/`, requestOptions);
        const data = await response.json();
        return data.categoriesList;
    }
    catch (error) { throw error; }
}

export const fetch_CreateCategory = async (content) => {
    const requestOptions = {
        method: httpMethods.post, headers: httpHeaders, credentials: 'include', body: JSON.stringify({ content: content })
    };
    try {
        const response = await fetch(`http://localhost:8080/categories/`, requestOptions)
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }
}

export const fetch_UpdateCategory = async (content, categoryId) => {
    const requestOptions = {
        method: httpMethods.put, headers: httpHeaders, credentials: 'include', body: JSON.stringify({ content: content })
    };
    try {
        const response = await fetch(`http://localhost:8080/categories/${categoryId}`, requestOptions)
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }
}

export const fetch_DeleteCategory = async (categoryId) => {
    const requestOptions = {
        method: httpMethods.delete, headers: httpHeaders, credentials: 'include'
    };
    try {
        const response = await fetch(`http://localhost:8080/categories/${categoryId}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}


