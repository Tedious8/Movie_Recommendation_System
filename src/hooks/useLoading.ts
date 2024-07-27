import { Dispatch, SetStateAction } from "react"

export function useLoading(setIsLoading: Dispatch<SetStateAction<boolean>>) {
    const startLoading = () => setIsLoading(true);
    const cancelLoading = (time: number = 5000) => {
        setTimeout(() => {
          setIsLoading(false);
        }, time);
    }
    return {
        startLoading,
        cancelLoading,
    }
}