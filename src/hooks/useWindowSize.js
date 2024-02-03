import { useState } from "react";
import { useEffect } from "react";

const useWindowSize = () => {
    
    const [WindowSize,setWindowSize] = useState({
        width:undefined,
        height:undefined
    });


    useEffect(() => {
    
        const handleResize = () => {
            setWindowSize({
                width:window.innerWidth,
                height: window.innerHeight
            })
        }

        handleResize();

        window.addEventListener("resize",handleResize);

      /* const cleanUp = () => {
            console.log("runs if a use effect dependency changes");
            window.removeEventListener("resize",handleResize);
       } 

       return cleanUp;*/

       return () => window.removeEventListener("resize",handleResize);


    },[])

    return WindowSize;

}

export default useWindowSize;