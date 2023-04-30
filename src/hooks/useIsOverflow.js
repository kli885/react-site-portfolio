import { useState, useLayoutEffect } from "react";

const useIsOverflow = (ref) => {
    const [isOverflow, setIsOverflow] = useState({
        isWidthOverflow: undefined,
        isHeightOverflow: undefined,
    });

    useLayoutEffect(() => {
        const { current } = ref;

        const trigger = () => {
            const hasWidthOverflow = current.scrollWidth > current.clientWidth;
            const hasHeightOverflow = current.scrollHeight > current.clientHeight;

            setIsOverflow({
                isWidthOverflow: hasWidthOverflow,
                isHeightOverflow: hasHeightOverflow
            });
        };

        if (current) {
            if ('ResizeObserver' in window) {
                new ResizeObserver(trigger).observe(current);
            }

            trigger();
        }
    }, [ref]);
    return isOverflow;
};

export default useIsOverflow;