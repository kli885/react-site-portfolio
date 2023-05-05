import { useState, useEffect } from 'react';

import { useForm } from '@formspree/react';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";


import "./Contact.css"

export const Contact = () => {
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

    const [contactValues, setContactValues] = useState({
        name: sessionStorage.getItem("name") || "",
        email: sessionStorage.getItem("email") || "",
        message: sessionStorage.getItem("message") || ""
    })

    useEffect(() => {
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

    const handleInputChange = (prop) => (event) => {
        setContactValues({ 
            ...contactValues,
            [prop]: event.target.value
        })
        sessionStorage.setItem(prop, event.target.value)
    }

    const handleSubmit = () => {
        setSubmitState({
            showSuccess: false,
            showError: false,
        })
        if (submitOnCooldown) {
            setSubmitState({
                ...submitState,
                showError: true
            })
            return;
        }
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
    )

}

export default Contact;