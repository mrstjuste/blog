import { useState, useEffect } from 'react';


const useFetch = (url) =>{
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {

        const abortCont = new AbortController();
    
        setTimeout(() => {
            fetch(url, {signal: abortCont.singal})
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data');
                    }
                    return res.json();
                })
                .then(data => {
                    setIsPending(false);
                    setData(data);
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError'){
                        console.log('fetch abort')
                    }else {
                        setIsPending(false);
                        setError(err.message);
                    }
                });
        }, 0);

        return () => abortCont.abort();
    }, [url]);

    return {data, isPending, error};

}

export default useFetch;
