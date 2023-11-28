import { httpHeaders, httpMethods } from "../config/httpconfig";

export const fetch_GetPosts = async (page, size, content) => {
    const requestOptions = {
        method: httpMethods.get, headers: httpHeaders, credentials: 'include'
    };
    try {
        const response = await fetch(`http://localhost:8080/posts/query?page=${page}&size=${size}&content=${content}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_GetPost = async (postId) => {
    const requestOptions = {
        method: httpMethods.get, headers: httpHeaders, credentials: 'include'
    };
    try {
        const response = await fetch(`http://localhost:8080/posts/find/${postId}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_CreatePost = async (data) => {
    const requestOptions = {
        method: httpMethods.post, body: JSON.stringify(data), credentials: 'include',
        headers: httpHeaders,
    };
    try {
        const response = await fetch("http://localhost:8080/posts/", requestOptions);
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }
};


export const fetch_UpdatePost = async (data, postId) => {
    const requestOptions = {
        method: httpMethods.put, body: JSON.stringify(data), credentials: 'include',
        headers: httpHeaders,
    };
    try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`, requestOptions);
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }
}

export const fetch_DeletePost = async (postId) => {
    const requestOptions = {
        method: httpMethods.delete, credentials: 'include',
        headers: httpHeaders,
    };
    try {
        const response = await fetch(`http://localhost:8080/posts/${postId}`, requestOptions);
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }
}

export const fetch_UploadPostImage = async (data, postId) => {
    const requestOptions = {
        method: httpMethods.post, body: data,
        headers: { 'Authorization': httpHeaders.Authorization },
    };
    try {
        const response = await fetch(`http://localhost:8080/posts/upload/${postId}`, requestOptions);
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }
}

export const fetch_RemovePostImage = async (postId) => {
    const requestOptions = {
        method: httpMethods.delete, headers: httpHeaders
    };
    try {
        const response = await fetch(`http://localhost:8080/posts/unupload/${postId}`, requestOptions);
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }
}

export const fetch_LikePost = async (postId) => {
    const requestOptions = {
        method: httpMethods.post, headers: httpHeaders, credentials: 'include'
    };
    try {
        const response = await fetch(`http://localhost:8080/posts/likepost/${postId}`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }

}

export const fetch_AddComment = async (postId) => {
    const requestOptions = {
        method: httpMethods.post, headers: httpHeaders, credentials: 'include'
    };
    try{
        const response = await fetch(`http://localhost:8080/posts/comments/${postId}`, requestOptions);
        const data = await response.json();
        return data;
    }catch (error) { throw error; }
} 

