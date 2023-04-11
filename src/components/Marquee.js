import React, { forwardRef, useRef, useEffect, useState } from "react";
import "./Marquee.css";
import { Parallax, useParallax } from "react-scroll-parallax";

const translations = {
    0: ["100%", "0%"],
    1: ["-100", "0%"]
}

export const Marquee = (props) => {
    const ref = useRef(null)

    const [rect, setRect] = useState({
        style: {
            display: "none"
        },
        left: {
            path: "",
            style: {
                stroke: "red"
            }
        },
        right: {
            path: "",
            style: {
                stroke: "red"
            }
        }
    })

    const [activeButton, setActiveButton] = useState(false)

    useEffect(() => {
        
    }, [])

    const setUpPath = () => {
        let currentEl = ref.current;
        let x = (currentEl.offsetLeft + (currentEl.getBoundingClientRect().width / 2));
        x -= 20;
        
        let h = window.innerHeight - currentEl.offsetHeight*2 - 20;
        let x2 = window.innerWidth - x - 40;

        let len = document.getElementById("rectleft").getTotalLength();

        setRect({
            ...rect,
            style: {
                ...rect.style,
                display: null,
                height: h + 40,
                float: "left"
            },
            left:  {
                ...rect.left,
                path:   `M ${x + 2},0
                        C 100,0 40,0 40,0
                        40,0 0,0 0,40
                        0,40 0,60 0,${h - 40}
                        0,${h - 40} 0,${h} 40,${h}
                        93.75,${h} 100,${h} ${x2},${h}`,
                style: {
                    ...rect.left.style,
                    transition: "initial",
                    strokeDasharray: len
                }
            },
            right:  {
                ...rect.right,
                path:   `M -2,0
                        C -2,0 ${x2 - 40},0 ${x2 - 40},0
                        ${x2 - 40},0 ${x2},0 ${x2},40
                        ${x2},40 ${x2},60 ${x2},${h - 40}
                        ${x2},${h - 40} ${x2},${h} ${x2 - 40},${h}
                        ${x2 - x + 40},${h} ${x2 - x},${h} ${x2 - x},${h}`,
                style: {
                    ...rect.right.style,
                    transform: `translateX(${x}px) translateY(1px)`,
                    transition: "initial",
                    strokeDasharray: len
                }
            },
        })
    }

    const doPath = (color) => {
        setRect({
            ...rect,
            left: {
                ...rect.left,
                style: {
                    ...rect.left.style,

                }
            }
        })
    }

    const undoPath = () => {
        setRect({
            ...rect,
            style: {
                ...rect.style,
                display: "none"
            },
            left:  {
                ...rect.left,
                path: ""
            },
            right:  {
                ...rect.right,
                path: "",
            },
        })
    }

    const clickLang = () => {
        if (activeButton) {
            undoPath();
            setActiveButton(false)
            return;
        }
        ref.current.scrollIntoView({ behavior: 'smooth' });
        setUpPath();
        setActiveButton(true)
    }

    return(
        <>
            <div>
                <Parallax
                    className="marquee-text"
                    translateX={translations[props.langIndex%2]}
                    startScroll={200 + (200*props.langIndex)}
                    endScroll={800 + (200*props.langIndex)}
                    opacity={[-1,1]}
                >
                    <span ref={ref} className={`horizontal ${props.lang.toLowerCase()}`} onClick={clickLang}>{props.lang}</span>
                </Parallax>
            </div>
            <svg id="rect" style={rect.style}>
                <path id="rectleft" d={rect.left.path} style={rect.left.style}/>
                <path id="rectright" d={rect.right.path} style={rect.right.style}/>
            </svg>
        </>
    )
};

export default Marquee;
