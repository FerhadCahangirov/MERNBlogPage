import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import getToken from "../utils/getToken";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState("");
    const location = useLocation();

    useEffect(() => {

        const TOKEN = getToken();
        setToken(TOKEN);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cookie': `token=${token}` },
            credentials: 'include'
        };

        fetch("http://localhost:8080/auth/profile", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data === null)
                    setUserData({});
                else
                    setUserData(data)
            });

    }, [token]);

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    );
};
