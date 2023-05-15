
import React, { useState, useEffect } from 'react';
import Meta, { MeMeta } from '../modals/common/Meta';
import User from '../modals/models/model'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import RequestStatus from '../constants/request';
import ContextInterface from "../modals/models/context"

const ModelContext = React.createContext<ContextInterface>({
    user: null,
    meta: { isLoggedIn: true, loading: false, error: null },
    update_meta: { loading: false, error: null },
    upload_media: (url: string, type: string) => Promise.resolve(0),
    setUserHandler: (user: User) => { },
    get_me: () => { },
    upload_headshot: (formData: any) => Promise.resolve(0),
    login: () => { },
    logout: () => { }
})


export const ModelContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [user, setUser] = useState<User | null>(null)
    const [meta, setMeta] = useState<MeMeta>({ isLoggedIn: true, loading: false, error: null })
    const [update_meta, set_update_meta] = useState<Meta>({ loading: false, error: null })

    const login = async () => { }

    const get_me = async () => {
        setMeta((prevState) => { return { ...prevState, loading: true, error: null } })
        const token = await AsyncStorage.getItem('@jwt')
        const url = `${Constants.manifest?.extra!.apiUrl}/models/me`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,

                }
            })
            const json = await response.json()
            setMeta((prevState) => { return { ...prevState, loading: false } })

            if (response.status === 200) {
                return setUserHandler(json.user)
            }

            return setMeta((prevState) => { return { ...prevState, loading: false, error: json.message } })

        } catch (error) {
            console.log(error)
            return setMeta((prevState) => { return { ...prevState, loading: false, error: 'Something went wrong.' } })

        }
    }
    const upload_headshot = async (formData: any) => {
        set_update_meta({ loading: true, error: null })
        const token = await AsyncStorage.getItem('@jwt')
        const url = `${Constants.manifest?.extra!.apiUrl}/models/headshot`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + token,

                }
            })
            const json = await response.json()
            set_update_meta((prevState) => { return { ...prevState, loading: false } })
            if (response.status === 200) {
                console.log(json.user)
                setUserHandler(json.user)
                return RequestStatus.success
            }

            set_update_meta({ loading: false, error: json.message })
            return RequestStatus.failed

        } catch (error) {
            set_update_meta({ loading: false, error: 'Something went wrong.' })
            return RequestStatus.failed

        }
    }
    const upload_media = async (imageUrl: string, type: string): Promise<number> => {
        set_update_meta({ loading: true, error: null })
        const token = await AsyncStorage.getItem('@jwt')
        const url = `${Constants.manifest?.extra!.apiUrl}/models/upload_media/${type}`;

        try {
            const response = await fetch(`${url}`, {
                method: 'POST',
                body: JSON.stringify({ url: imageUrl }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + token,
                }
            })

            const json = await response.json()
            set_update_meta({ error: null, loading: false })
            if (response.status === 200) {
                setUserHandler(json.user)
                return RequestStatus.success
            }

            set_update_meta({ loading: false, error: json.message })
            return RequestStatus.failed

        } catch (error) {
            set_update_meta({ loading: false, error: 'Something went wrong.' })
            return RequestStatus.failed


        }
    }

    const setUserHandler = (user: User) => {
        setUser(user)
        setMeta({ isLoggedIn: true, loading: false, error: null })

    }


    const logout = () => {
        localStorage.removeItem('uid')
        setUser(null)
        setMeta({ isLoggedIn: false, loading: false, error: null })

    }
    useEffect(() => {
        get_me()

    }, [])
    const userCtx = {
        user,
        meta,
        update_meta,
        setUserHandler,
        login,
        get_me,
        upload_headshot,
        upload_media,
        logout,
    }
    return <ModelContext.Provider value={userCtx}>
        {props.children}
    </ModelContext.Provider>
}

export default ModelContext
