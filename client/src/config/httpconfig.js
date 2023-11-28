import getToken from "../utils/getToken";
const TOKEN = getToken();


export const httpHeaders = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` };

export const httpMethods = {
    post: "POST",
    get: "GET",
    put: "PUT",
    delete: "DELETE"
}
