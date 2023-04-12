import { useState, useEffect, useRef } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';

import './MainPage.css'

import Marquee from '../components/Marquee';

import useScript from '../hooks/useScript';

function MainPage() {
    let [nameAnimation, setNameAnimation] = useState([
        { t: " ", ms: 400 },
        { t: "_", ms: 400 },
        { t: " ", ms: 400 },
        { t: "_", ms: 400 },
        { t: "W_", ms: 70 },
        { t: "WE_", ms: 70 },
        { t: "WEL_", ms: 70 },
        { t: "WELC_", ms: 70 },
        { t: "WELCO_", ms: 70 },
        { t: "WELCOM_", ms: 70 },
        { t: "WELCOME_", ms: 70 },
        { t: "WELCOME ", ms: 400 },
        { t: "WELCOME_", ms: 400 },
        { t: "WELCOM_", ms: 50 },
        { t: "WELCO_", ms: 50 },
        { t: "WELC_", ms: 50 },
        { t: "WEL_", ms: 50 },
        { t: "WE_", ms: 50 },
        { t: "W_", ms: 50 },
        { t: "_", ms: 400 },
        { t: " ", ms: 400 },
        { t: "_", ms: 400 },
        { t: "K_", ms: 70 },
        { t: "KE_", ms: 70 },
        { t: "KEV_", ms: 70 },
        { t: "KEVI_", ms: 70 },
        { t: "KEVIN_", ms: 70 },
        { t: "KEVIN_", ms: 70 },
        { t: "KEVIN _", ms: 70 },
        { t: "KEVIN L_", ms: 70 },
        { t: "KEVIN LI_", ms: 70 },
        { t: "KEVIN LI ", ms: 400 },
        { t: "KEVIN LI_", ms: 400 },
        { t: "KEVIN LI ", ms: 400 },
        { t: "KEVIN LI_", ms: 400 },
        { t: "KEVIN LI", ms: 200 },
        { t: "KEVIN LI", ms: 200 }
    ])

    let [nameAnimationStep, setNameAnimationStep] = useState("{ }")
    let [doneNameAnimation, setDoneNameAnimation] = useState(false)

    let [age, setAge] = useState("")

    let [langActive, setlangActive] = useState([false, false, false])

    useScript("text/javascript", "./js/globe.js")

    useEffect(() => {
        let alreadySeen = false;
        if (sessionStorage.getItem("alreadySeen")) {
            alreadySeen = sessionStorage.getItem("alreadySeen")
        }
        let i = alreadySeen ? 21 : 0;
        document.body.style.overflow = "hidden"
        let update = () => {
            let step = nameAnimation[i];
            setNameAnimationStep(step.t);
            i++;
            if (i < nameAnimation.length) {
                setTimeout(update, step.ms);
            } else {
                setDoneNameAnimation(true)
                document.body.style.overflow = null;
                sessionStorage.setItem("alreadySeen", true)
                window.initGlobe();
            }
        }
        update();
    }, [])

    useEffect(() => {
        setInterval(() => {
            let newAge = (new Date() - new Date(922088040000)) / (1000 * 60 * 60 * 24 * 365.25);
            setAge(newAge.toString().substring(0, 12))
        }, 50)
    }, [])

    const onClickLang = (langIndex, flip) => {
        let newActiveLangs = [...langActive];
        if (flip) {
            for (let i = 0; i < newActiveLangs.length; i++) {
                if (i !== langIndex) {
                    newActiveLangs[i] = false;
                }
            }
        }
        newActiveLangs[langIndex] = !newActiveLangs[langIndex]
        setlangActive(newActiveLangs)
    }

    return (
        <div className="site-container">
            {/* <div style={{
                position: "absolute",
                left: "50%",
                top: "0",
                width: "2px",
                height: "100%",
                backgroundColor: "red"
            }}/>
            <div style={{
                position: "absolute",
                left: "0",
                top: "50%",
                width: "100%",
                height: "2px",
                backgroundColor: "red"
            }}/> */}
            <h1 className={doneNameAnimation ? "name-intro top" : "name-intro"}>
                <span style={{color: "white", fontSize: "40px", fontWeight: "bold"}}>{"{"}</span>
                <span style={{borderBottom: "2px solid white"}}>{nameAnimationStep}</span>
                <span style={{color: "white", fontSize: "40px", fontWeight: "bold"}}>{"}"}</span>
            </h1>
            <div className="main-container" id="main" style={{opacity: doneNameAnimation ? 1 : 0}}>
                <h2 className="age">
                    {"I am a "}
                    <span className='years'>
                        {age} year-old
                        <span className='underline'/>
                    </span> 
                    {" developer based in "}
                    <span className='location'>
                        Edmonton, AB.
                        <span className='underline'/>
                    </span>
                </h2>
                <h2 className='description'>
                    {"I graduated from the University of Alberta in December 2022 with a Bachelor of Science, majoring in "}
                    <span className="comp-sci">
                        Computing Science
                        <span className='underline'/>
                    </span>
                    {" with a minor in "}
                    <span className="mathematics">
                        Mathematics
                        <span className='underline'/>
                    </span>.
                </h2>
                
                <h2 className='github'>
                    {"Check out what I've been up to: "}
                    <Link className='github-link' to='/github'>
                        Github
                        <span className='underline'/>
                    </Link>
                </h2>
            </div>
            <div className='globe-container' id="globe-container" style={{display: doneNameAnimation ? null : "none", opacity: doneNameAnimation ? 1 : 0}}>

            </div>
            <div className='gradient-layer parallax-title' style={{opacity: doneNameAnimation ? 1 : 0}}>
                <ParallaxProvider>
                    <div className="parallax-container">
                        {["NodeJs", "Python", "HTML/CSS/JS"].map((lang, langIndex) => {
                            return <Marquee 
                                        key={langIndex} 
                                        lang={lang}
                                        langIndex={langIndex} 
                                        onClickLang={onClickLang}
                                        active={langActive}/>
                        })}
                    </div>
                </ParallaxProvider>
            </div>
            <div className='filler-background' style={{opacity: doneNameAnimation ? 1 : 0}}></div>
        </div>
    );
}

export default MainPage;