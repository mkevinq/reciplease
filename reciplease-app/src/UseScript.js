import { useEffect } from 'react';

//Function that can be used to 'run' other js scripts
const useScript = url => {
    useEffect(() => {
        console.log('Attempting to run script: ' + url);
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        console.log('Appending script: ' + script.src);
        document.body.appendChild(script);

        return () => {
            console.log('Ending script: ' + script.src);
            document.body.removeChild(script);
        }
    }, [url]);
};

export default useScript;