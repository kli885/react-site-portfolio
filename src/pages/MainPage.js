import { useState, useEffect, useRef } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Link } from 'react-router-dom';

import { useForm, ValidationError } from '@formspree/react';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

import './MainPage.css'

import { nameAnimation, languages, languageDetails } from '../constants';

import Marquee from '../components/Marquee';

import useScript from '../hooks/useScript';

function MainPage() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const [contactState, handleContact] = useForm(process.env.REACT_APP_CONTACT_CODE, {
        data: { 
            subject: "Someone contacted through the site",
            "g-recaptcha-response": executeRecaptcha
        }
    })
    const [submitState, setSubmitState] = useState({
        showSuccess: false,
        showError: false
    })
    const [errorMsg, setErrorMsg] = useState("")
    const [submitOnCooldown, setSubmitOnCooldown] = useState(false)
    const [remainingCooldown, setRemainingCooldown] = useState("")

    const [nameAnimationStep, setNameAnimationStep] = useState("{ }")
    const [doneNameAnimation, setDoneNameAnimation] = useState(false)
    const [fillerHeight, setFillerHeight] = useState(1000)
    const [contactValues, setContactValues] = useState({
        name: sessionStorage.getItem("name") || "",
        email: sessionStorage.getItem("email") || "",
        message: sessionStorage.getItem("message") || ""
    })

    const [age, setAge] = useState("")

    const [langActive, setlangActive] = useState([false, false, false])

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
    }, [])

    useEffect(() => {
        setInterval(() => {
            let myBirthTime = "Mon Mar 22 1999 00:34:00 GMT-0600 (Mountain Daylight Saving Time)"
            let newAge = (new Date() - new Date(myBirthTime)) / (1000 * 60 * 60 * 24 * 365.25);
            setAge(newAge.toString().substring(0, 12))
        }, 50)
        if (localStorage.getItem("submitCooldownEnd")) {
            setSubmitOnCooldown(true)
        }
    }, [])

    useEffect(() => {
        if (submitOnCooldown) {
            const updateCooldown = setInterval(() => {
                let rightNow = new Date();
                let endTime = new Date(localStorage.getItem("submitCooldownEnd"))
                if (rightNow >= endTime) {
                    localStorage.removeItem("submitCooldownEnd")
                    setSubmitState({
                        showSuccess: false,
                        showError: false
                    })
                    setSubmitOnCooldown(false)
                    clearInterval(updateCooldown)
                } else {
                    let remainingTime = new Date(endTime - rightNow).toISOString().slice(14,19);
                    setErrorMsg(`Please try again in: ${remainingTime}`)
                }
            }, 1000)
        }
    }, [submitOnCooldown])

    useEffect(() => {
        if (contactState.succeeded) {
            let submitCooldownEnd = new Date();
            submitCooldownEnd.setMinutes(submitCooldownEnd.getMinutes() + 5);
            localStorage.setItem("submitCooldownEnd", submitCooldownEnd)
            setSubmitOnCooldown(true)
            setSubmitState({
                showSuccess: true,
                showError: false
            })
            setContactValues({
                name: "",
                email: "",
                message: ""
            })
            sessionStorage.removeItem("name")
            sessionStorage.removeItem("email")
            sessionStorage.removeItem("message")
            return;
        } 
        if (!contactState.errors[0]) return;
        setSubmitState({
            showSuccess: false,
            showError: true
        })
        if (contactState.errors[0]?.code === "INACTIVE") {
            setErrorMsg("Sorry, I am currently not accepting contact forms")
        } else if (contactState.errors[0]?.code === "TYPE_EMAIL") {
            setErrorMsg("Please enter a valid email")
        } else {
            setErrorMsg("Unknown problem occured. Try again later")
        }
    }, [contactState.succeeded, contactState.errors])

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

    const handleInputChange = (prop) => (event) => {
        setContactValues({ 
            ...contactValues,
            [prop]: event.target.value
        })
        sessionStorage.setItem(prop, event.target.value)
    }

    const handleSubmit = () => {
        if (submitOnCooldown) {
            setSubmitState({
                ...submitState,
                showError: true
            })
            return;
        }
        setSubmitState({
            showSuccess: false,
            showError: false,
        })
        if (Object.values(contactValues).some(value => value === "")) {
            setSubmitState({
                ...submitState,
                showError: true
            })
            setErrorMsg("Please fill in all the fields")
            return
        }
        handleContact(contactValues)
    }

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
            </div>
            <div className='globe-container' id="globe-container" style={{display: doneNameAnimation ? null : "none", opacity: doneNameAnimation ? 1 : 0}}/>
            <div className='gradient-layer parallax-title' style={{opacity: doneNameAnimation ? 1 : 0}}>
                <ParallaxProvider>
                    <div className="parallax-container">
                        {languages.map((lang, langIndex) => {
                            return <Marquee 
                                        key={langIndex} 
                                        lang={lang}
                                        langIndex={langIndex} 
                                        onClickLang={onClickLang}
                                        active={langActive}
                                        setHeight={setFillerHeight}/>
                        })}
                    </div>
                </ParallaxProvider>
            </div>
            <div className='filler-background' style={{height: fillerHeight, opacity: doneNameAnimation ? 1 : 0}}></div>
            <div id="contact">
                <svg preserveAspectRatio="none" viewBox="0 0 100 102" height="75" width="100%" className="svgcolor-light">
                    <path d="M0 0 L50 100 L100 0 Z" fill="rgba(18,22,51,1)" stroke="rgba(18,22,51,1)"></path>
                </svg>
                <div className="contact-container">
                    <div className="contact-header">
                        CONTACT
                    </div>
                    <div className="contact-header-bar"/>
                    <div className="contact-question">
                        Have a question?
                    </div>
                    <div className="contact-form">
                        <input    
                            className="input-field"
                            type="text"
                            name="name"
                            placeholder="Name"
                            required={true}
                            value={contactValues.name}
                            onChange={handleInputChange("name")}
                        />
                        <input    
                            className="input-field"
                            type="text"
                            name="email"
                            placeholder="Email"
                            required={true}
                            value={contactValues.email}
                            onChange={handleInputChange("email")}
                        />
                        <textarea 
                            placeholder="Your Message"
                            type="text"
                            name="message"
                            required={true}
                            value={contactValues.message}
                            onChange={handleInputChange("message")}
                        />
                        <div className={submitState.showSuccess ? "success expand" : "success"}>
                            <div>
                                Your message was sent successfully. Thanks!
                            </div>
                        </div>
                        <div className={submitState.showError ? "error expand" : "error"}>
                            <div>
                                {errorMsg}
                            </div>
                        </div>
                        <button 
                            className="contact-button"
                            onClick={handleSubmit}
                            disabled={contactState.submitting}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;