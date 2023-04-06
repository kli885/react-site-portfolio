import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './MainPage.css';

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

    useScript("text/javascript", "./js/globe.js")

    useEffect(() => {
        let alreadySeen = false;
        if (sessionStorage.getItem("alreadySeen")) {
            alreadySeen = sessionStorage.getItem("alreadySeen")
        }
        let i = alreadySeen ? 21 : 0;
        document.body.style.overflowY = "hidden"
        let update = () => {
            let step = nameAnimation[i];
            setNameAnimationStep(step.t);
            i++;
            if (i < nameAnimation.length) {
                setTimeout(update, step.ms);
            } else {
                setDoneNameAnimation(true)
                document.body.style.overflowY = null;
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

    return (
        <div className="site-container">
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
                <div className='globe-container' id="globe-container" style={{display: doneNameAnimation ? null : "none", opacity: doneNameAnimation ? 1 : 0}}>

                </div>
            </div>
        </div>
    );
}

export default MainPage;