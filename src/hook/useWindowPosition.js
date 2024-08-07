import { useLayoutEffect, useState } from 'react';

export default function useWindowPosition(id) {
    const [animation, setAnimation] = useState(false);

    useLayoutEffect(()=>{
        function updatePosition() {
            const offetsetHeight = window.document.getElementById(id).offsetHeight;
            // console.log("windpageOffset",window.pageYOffset, offetsetHeight)
            if (window.pageYOffset>offetsetHeight*0.01){
                setAnimation(true);
            }
        }
        window.addEventListener('scroll', updatePosition);
        updatePosition();
        return()=>window.removeEventListener('scroll',updatePosition);
    }, [id]);
    return animation;
}