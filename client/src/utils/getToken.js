const getToken = () => {
   
    const cookiesObj = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: decodeURIComponent(value) }), {});
        
    return cookiesObj.token;
}

export default getToken;