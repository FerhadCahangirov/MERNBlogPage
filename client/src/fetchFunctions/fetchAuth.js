import { httpHeaders, httpMethods } from "../config/httpconfig";

export const fetch_Login = async (data) => {
    const requestOptions = {
        method: httpMethods.post, headers: { "Content-Type": httpHeaders["Content-Type"] }, body: JSON.stringify(data), credentials: 'include',
    }
    try {
        const response = await fetch("http://localhost:8080/auth/login", requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_Register = async (data) => {
    const requestOptions = {
        method: httpMethods.post, headers: { "Content-Type": httpHeaders["Content-Type"] }, body: JSON.stringify(data), credentials: 'include'
    }
    try {
        const response = await fetch("http://localhost:8080/auth/register", requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_VerifyEmailForForgetPassword = async (data) => {
    const requestOptions = {
        method: httpMethods.post, headers: { "Content-Type": httpHeaders["Content-Type"] }, body: JSON.stringify(data), credentials: 'include'
    }
    try {
        const response = await fetch(`http://localhost:8080/auth/resetPasswordSendMail`, requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_ResetPassword = async (data) => {
    const requestOptions = {
        method: httpMethods.post, headers: { "Content-Type": httpHeaders["Content-Type"] }, body: JSON.stringify(data), credentials: 'include'
    }
    try {
        const response = await fetch("http://localhost:8080/auth/register", requestOptions);
        const data = await response.json();
        return data;
    } catch (error) { throw error; }
}

export const fetch_Profile = async () => {
    const requestOptions = {
        method: httpMethods.get, headers: httpHeaders, credentials: 'include'
    }

    try {
        const response = await fetch('http://localhost:8080/auth/profile', requestOptions);
        const data = await response.json();
        return data;
    }
    catch (error) { throw error; }

}