import { useState, useCallback } from "react"
import HookResponse from '../modals/common/HookResponse'

/**
 * Hook for handling https requests
 */

type Config = {
    url: string;
    method?: string;
    headers?: {}
    body?: any
}

const useHttp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const sendRequest = async <T>(reqConfig: Config, dataLoaded: (data: HookResponse<T>) => void) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(reqConfig.url, {
                method: reqConfig.method ? reqConfig.method : 'GET',
                headers: reqConfig.headers ? reqConfig.headers : {},
                body: reqConfig.body ? reqConfig.body : null,
            })
            const data = await response.json()

            if (response.status === 200 || response.status === 201) {
                dataLoaded(data)
            } else {
                setError(data.message)
            }
            setIsLoading(false)

        } catch (error: any) {
            console.log(error)
            setIsLoading(false)
            setError(error.message || 'Something went wrong')

        }

    }
    return { isLoading, error, sendRequest }
}

export default useHttp