import { useEffect } from 'react';

const useScript = (type, url, async = true) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.type = type;
        script.src = url;
        script.async = async;

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, [type, url, async]);
};

export default useScript;