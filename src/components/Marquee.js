import React, { useRef, useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Parallax } from "react-scroll-parallax";
import ScaleText from "react-scale-text";

import useWindowSize from "../hooks/useWindowSize"
import useDidMountEffect from "../hooks/useDidMountEffect"

import "./Marquee.css";

import { LanguageDetails } from "./LanguageDetails";
import { langColors } from "../constants";


const translations = {
    0: ["100%", "0%"],
    1: ["-100", "0%"]
}

export const Marquee = (props) => {
    const [width, height] = useWindowSize()

    const containerRef = useRef(null)
    const langRef = useRef(null)
    const rectRef = useRef(null)
    const leftRef = useRef(null)
    const rightRef = useRef(null)

    const langTextRef = useRef(null)

    const [rectHeight, setRectHeight] = useState(0)
    const [rectWidth, setRectWidth] = useState(0)

    const [containers, setContainers] = useState([])

    useEffect(() => {
        setContainers(Array.from(document.getElementsByClassName("marquee-container")))
    }, [])

    useEffect(() => {
        //Changes rect paths and lang positions on window resize
        let h = window.innerHeight - langRef.current.offsetHeight*2;
        setupPath();
        for (let i = containers.length-1; i >= 0 ; i--) {
            if (containers[i].className.includes(props.lang.toLowerCase())) {
                break;
            };
            if (containers[i].style.transform !== `translateY(0px)` && containers[i].style.transform !== "") {
                containers[i].style.transform = `translateY(${h+40}px)`
            }
        }
    }, [width, height])

    useDidMountEffect(() => {
        if (!props.active[props.langIndex]) { 
            undoPath(0.5);
            langTextRef.current.style.transition = "all 0s linear"
            langTextRef.current.style.opacity = 0
            setTimeout(() => {
                leftRef.current.style.stroke = "transparent";
                rightRef.current.style.stroke = "transparent";
                
            }, 500)
        }
    }, [props.active[props.langIndex]])

    const setupPath = () => {
        let x = (langRef.current.offsetLeft + (langRef.current.getBoundingClientRect().width / 2)) - 20;
        
        let h = window.innerHeight - langRef.current.offsetHeight*2;
        
        setRectHeight(h)
        let x2 = window.innerWidth - x - 40;
        setRectWidth(x2)

        rectRef.current.style.display = 'initial';

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
    }

    const doPath = () => {
        leftRef.current.style.stroke = langColors[props.langIndex];
	    rightRef.current.style.stroke = langColors[props.langIndex];

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

    const setupOtherLangs = () => {
        let h = window.innerHeight - langRef.current.offsetHeight*2;
        setRectHeight(h)
        
        langTextRef.current.style.display = ""
        langTextRef.current.style.transition = "opacity 0.5s linear"
        langTextRef.current.style.opacity = 1
        

        if (containerRef.current.style.transform !== `translateY(${h+40}px)`) {
            for (let i = containers.length-1; i >= 0 ; i--) {
                if (containers[i].className.includes(props.lang.toLowerCase())) {
                    break;
                };
                containers[i].style.transform = `translateY(${h+40}px)`
            }
        }
    }

    const clickLang = () => {
        let h = window.innerHeight - langRef.current.offsetHeight*2;
        if (props.active[props.langIndex]) {
            undoPath(0.5);
            langTextRef.current.style.opacity = 0
            setTimeout(() => {
                props.setHeight(300)
                leftRef.current.style.stroke = "transparent";
                rightRef.current.style.stroke = "transparent";
                for (let i = 0; i < containers.length; i++) {
                    containers[i].style.transform = `translateY(0px)`
                }
            }, 500)
            props.onClickLang(props.langIndex)
            return;
        }

        let containerElStyle = containerRef.current.style
        props.setHeight(400 + h)
        setTimeout(() => {
            if (containerElStyle.transform !== `translateY(0px)` && containerElStyle.transform !== "") {
                for (let i = 0; i < containers.length; i++) {
                    containers[i].style.transform = `translateY(0px)`
                    if (containers[i].className.includes(props.lang.toLowerCase())) {
                        break;
                    };
                }
                setTimeout(putInView, 200, "smooth")
            } else {
                putInView("smooth")
            }
            setTimeout(() => {
                setupPath();
                setupOtherLangs();
                undoPath(0.25);
                setTimeout(doPath, 250);
                props.onClickLang(props.langIndex, true)
            }, 200)
        }, 150)

    }

    const putInView = (behavior) => {
        containerRef.current.scrollIntoView({ behavior: behavior });
    }

    return(
        <div ref={containerRef} className={`marquee-container ${props.lang.toLowerCase()}`}>
            <ScaleText widthOnly={true} maxFontSize={75}>
                <>
                <BrowserView>
                    <Parallax
                        className="marquee-text"
                        translateX={translations[props.langIndex%2]}
                        startScroll={200 + (200*props.langIndex)}
                        endScroll={props.active[props.langIndex] ? 0 : 800 + (200*props.langIndex)}
                        opacity={[-1,1]}
                        style={{width:"100%"}}
                    >
                            <span 
                                ref={langRef} 
                                className={`${props.lang.replaceAll("/", "-").toLowerCase()} horizontal ${props.active[props.langIndex] ? "active-lang" : ""}`} 
                                onClick={clickLang}
                            >
                                {props.lang}
                                <span className='underline'/>
                            </span>
                    </Parallax>
                </BrowserView>
                <MobileView>
                    <span 
                        ref={langRef} 
                        className={`${props.lang.replaceAll("/", "-").toLowerCase()} horizontal ${props.active[props.langIndex] ? "active-lang" : ""}`} 
                        onClick={clickLang}
                    >
                        {props.lang}
                        <span className='underline'/>
                    </span>
                </MobileView>
                </>
            </ScaleText>
            <svg ref={rectRef} className={`rect rect-${props.lang.toLowerCase()}`} id="rect">
                <path ref={leftRef} id="rectleft"/>
                <path ref={rightRef} id="rectright"/>
            </svg>
            <div ref={langTextRef} className="lang-text" style={{display: "none"}}>
                {LanguageDetails(rectHeight, rectWidth, props.active[props.langIndex])[props.langIndex]}
            </div>
        </div>
    )
};

export default Marquee;