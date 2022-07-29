import axios from 'axios';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosReq, axiosRes } from '../api/axiosDefaults';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const UserContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const navigate = useNavigate();

    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get('/dj-rest-auth/user/')
            setCurrentUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleMount();
    }, [])

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                try {
                    await axios.post('/dj-rest-auth/token/refresh/')
                } catch (error) {
                    setCurrentUser((prevCurrentUser) => {
                        if (prevCurrentUser) {
                            navigate('signin')
                        }
                        return null
                    })
                    return config
                }
                return config
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        axiosRes.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401){
                    try {
                        await axios.post('/dj-rest-auth/token/refresh/')
                    } catch (error) {
                        setCurrentUser(prevCurrentUser => {
                            if (prevCurrentUser){
                                navigate('signin')
                            }
                            return null
                        })
                    }
                    return axios(error.config)
                }
                return Promise.reject(error)
            }
        )
    }, [navigate]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                {children}
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    )
}

export default UserContextProvider