import { useState, useEffect } from "react";

export default function useScroll() {
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 50) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);
    }, []);
    return { isFixed };
};