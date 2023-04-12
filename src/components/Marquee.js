import React, { forwardRef, useRef, useEffect, useState } from "react";
import "./Marquee.css";
import { Parallax, useParallax } from "react-scroll-parallax";

const translations = {
    0: ["100%", "0%"],
    1: ["-100", "0%"]
}

const colors = ["#55ff37", "#b71111", "#0093ee"]

export const Marquee = (props) => {
    const containerRef = useRef(null)
    const langRef = useRef(null)
    const rectRef = useRef(null)
    const leftRef = useRef(null)
    const rightRef = useRef(null)

    const [containers, setContainers] = useState([])
    const [otherRects, setOtherRects] = useState([])

    const [activeButton, setActiveButton] = useState(false)

    useEffect(() => {
        setContainers(Array.from(document.getElementsByClassName("marquee-container")))
    }, [])

    useEffect(() => {
        if (!props.active[props.langIndex]) {
            undoPath(0.5);
            setTimeout(() => {
                leftRef.current.style.stroke = "transparent";
                rightRef.current.style.stroke = "transparent";
                rectRef.current.style.display = "none"
            }, 500)
        }
    }, [props.active[props.langIndex]])

    const setUpPath = () => {
        let currentEl = langRef.current;
        let x = (currentEl.offsetLeft + (currentEl.getBoundingClientRect().width / 2));
        x -= 20;
        
        let h = window.innerHeight - currentEl.offsetHeight*2;
        let x2 = window.innerWidth - x - 40;

        rectRef.current.style.display = 'initial';
        // rectRef.current.style.height = h + 40 + "px";

        leftRef.current.setAttribute('d', `M ${x + 2},0
                                C 100,0 40,0 40,0
                                40,0 0,0 0,40
                                0,40 0,60 0,${h - 40}
                                0,${h - 40} 0,${h} 40,${h}
                                93.75,${h} 100,${h} ${x2},${h}`);
        rightRef.current.setAttribute('d', `M -2,0
                                C -2,0 ${x2 - 40},0 ${x2 - 40},0
                                ${x2 - 40},0 ${x2},0 ${x2},40
                                ${x2},40 ${x2},60 ${x2},${h - 40}
                                ${x2},${h - 40} ${x2},${h} ${x2 - 40},${h}
                                ${x2 - x + 40},${h} ${x2 - x},${h} ${x2 - x},${h}`);
        rightRef.current.style.transform = `translateX(${x+1}px) translateY(1px)`;

        let len = leftRef.current.getTotalLength();

        // Reset everything
        leftRef.current.style.transition = 'initial';
        leftRef.current.style.strokeDasharray = len;
        rightRef.current.style.transition = 'initial';
        rightRef.current.style.strokeDasharray = len;

        for (let i = containers.length-1; i >= 0 ; i--) {
            if (containers[i].className.includes(props.lang.toLowerCase())) {
                break;
            };
            containers[i].style.transform = `translateY(${h-100}px)`
        }
    }

    const doPath = () => {
        leftRef.current.style.stroke = colors[props.langIndex];
	    rightRef.current.style.stroke = colors[props.langIndex];

        leftRef.current.style.transition = 'stroke-dashoffset .75s ease-in-out';
        rightRef.current.style.transition = 'stroke-dashoffset .75s ease-in-out';
        leftRef.current.style.strokeDashoffset = '0';
        rightRef.current.style.strokeDashoffset = '0';

    }

    const undoPath = (seconds) => {
        let len = leftRef.current.getTotalLength();
        leftRef.current.style.transition = `stroke-dashoffset ${seconds}s ease-in-out`;
        rightRef.current.style.transition = `stroke-dashoffset ${seconds}s ease-in-out`;
        leftRef.current.style.strokeDashoffset = len;
        rightRef.current.style.strokeDashoffset = len;
    }

    const clickLang = () => {
        if (props.active[props.langIndex]) {
            undoPath(0.5);
            setTimeout(() => {
                leftRef.current.style.stroke = "transparent";
                rightRef.current.style.stroke = "transparent";
                rectRef.current.style.display = "none"
                for (let i = 0; i < containers.length; i++) {
                    containers[i].style.transform = `translateY(0px)`
                }
            }, 500)
            props.onClickLang(props.langIndex)
            return;
        }
        if (containerRef.current.style.transform !== `translateY(0px)` &&
            containerRef.current.style.transform !== "") {
                // let move = setInterval(putInView, 1, "instant")
            for (let i = 0; i < containers.length; i++) {
                containers[i].style.transform = `translateY(0px)`
                if (containers[i].className.includes(props.lang.toLowerCase())) {
                    break;
                };
            }
            setTimeout(putInView, 200, "instant")
        } else {
            putInView("smooth")
        }
        setTimeout(() => {
            setUpPath();
            undoPath(0.25);
            setTimeout(doPath, 250);
            props.onClickLang(props.langIndex, true)
        }, 200)
    }

    const putInView = (behavior) => {
        containerRef.current.scrollIntoView({ behavior: behavior });
    }


    return(
        <div ref={containerRef} className={`marquee-container ${props.lang.toLowerCase()}`}>
            <Parallax
                className="marquee-text"
                translateX={translations[props.langIndex%2]}
                startScroll={200 + (200*props.langIndex)}
                endScroll={props.active[props.langIndex] ? 0 : 800 + (200*props.langIndex)}
                opacity={[-1,1]}
            >
                <span 
                    ref={langRef} 
                    className={`horizontal ${props.lang.toLowerCase()}`} 
                    onClick={clickLang}
                >
                    {props.lang}
                </span>
            </Parallax>
            <svg ref={rectRef} className={`rect rect-${props.lang.toLowerCase()}`} id="rect">
                <path ref={leftRef} id="rectleft"/>
                <path ref={rightRef} id="rectright"/>
            </svg>
        </div>
    )
};

export default Marquee;
