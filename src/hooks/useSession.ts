import { useEffect, useState } from "react";
import { baseURL } from "../api";
import { getToken } from "./useTokenStorage";

const useSession = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        setLoading(true)
        fetch(`${baseURL}/auth/session`, {
          method: 'get',
          credentials: 'include',
          headers: {
            'authorization': `Bearer ${getToken()}`,
          }
        })
        .then(res => res.json())
        .then((res) => {
            setData(res.user);
            setLoading(false)
        })
        .catch(err => {
          console.error(err)
        })
    }, [])

    return {
        loading,
        data
    }
}

export default useSession