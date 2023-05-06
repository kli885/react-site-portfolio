import { useState, useEffect } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

import { Link } from 'react-router-dom';

import './MainPage.css'

import { nameAnimation, languages } from '../constants';

import Marquee from '../components/Marquee';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

import useScript from '../hooks/useScript';

function MainPage() {
    const [nameAnimationStep, setNameAnimationStep] = useState("{ }")
    const [doneNameAnimation, setDoneNameAnimation] = useState(false)
    const [fillerHeight, setFillerHeight] = useState(300)

    const [age, setAge] = useState("")

    const [langActive, setlangActive] = useState([false, false, false])
    const [showClickHint, setShowClickHint] = useState(false)

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
                document.getElementsByClassName("grecaptcha-badge")[0].style.opacity = 1
            }
        }
        update();
        setInterval(() => {
            let myBirthTime = "Mon Mar 22 1999 00:34:00 GMT-0600 (Mountain Daylight Saving Time)"
            let newAge = (new Date() - new Date(myBirthTime)) / (1000 * 60 * 60 * 24 * 365.25);
            setAge(newAge.toString().substring(0, 12))
        }, 50)
        setTimeout(() => {
            setShowClickHint(true)
        }, alreadySeen ? 5000 : 10000)
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
        setShowClickHint(false)
    }

    return (
        <div className="site-container">
            <h1 className={doneNameAnimation ? "name-intro top" : "name-intro"} style={{color: "white"}}>
                <span style={{ fontSize: "40px", fontWeight: "bold" }}>{"{"}</span>
                <span style={{ borderBottom: "2px solid white" }}>{nameAnimationStep}</span>
                <span style={{ fontSize: "40px", fontWeight: "bold" }}>{"}"}</span>
            </h1>
            <div className="main-container" id="main" style={{ opacity: doneNameAnimation ? 1 : 0 }}>
                <h2 className="age">
                    {"I am a "}
                    <span className='years'>
                        {age} year-old
                        <span className='underline' />
                    </span>
                    {" developer based in "}
                    <span className='location'>
                        Edmonton, AB.
                        <span className='underline' />
                    </span>
                </h2>
                <h2 className='description'>
                    {"I graduated from the University of Alberta in December 2022 with a Bachelor of Science, majoring in "}
                    <span className="comp-sci">
                        Computing Science
                        <span className='underline' />
                    </span>
                    {" with a minor in "}
                    <span className="mathematics">
                        Mathematics
                        <span className='underline' />
                    </span>.
                </h2>

                <h2 className='github'>
                    {"Check out what I've been up to: "}
                    <Link className='github-link' to='/github'>
                        Github
                        <span className='underline' />
                    </Link>
                </h2>
            </div>
            <div className='globe-container' id="globe-container" style={{ display: doneNameAnimation ? null : "none", opacity: doneNameAnimation ? 1 : 0 }} />

            {doneNameAnimation ? (
                <>
                <ParallaxProvider>
                    <Parallax
                        className='click-me'
                        translateX={["100%", "0%"]}
                        startScroll={200}
                        endScroll={800}
                        opacity={[-1,1]}
                        style={{width:"100%"}}>
                            <div style={{opacity: showClickHint ? 1 : 0}}>
                                {`(Click for more details)`}
                            </div>
                    </Parallax>
                    <div className='gradient-layer parallax-title' >
                        <div className="parallax-container">
                            {languages.map((lang, langIndex) => {
                                return <Marquee
                                    key={langIndex}
                                    lang={lang}
                                    langIndex={langIndex}
                                    onClickLang={onClickLang}
                                    active={langActive}
                                    setHeight={setFillerHeight} />
                            })}
                        </div>
                    </div>
                </ParallaxProvider>
                <div className='filler-background' style={{ height: fillerHeight }}></div>
                <Contact />
                <Footer />
                </>
            ) : (<></>)}

        </div>
    );
}

export default MainPage;