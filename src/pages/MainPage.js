import { useState, useEffect } from 'react';

import './MainPage.css';

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

    useEffect(() => {
        let alreadySeen = false;
        if (sessionStorage.getItem("alreadySeen")) {
            alreadySeen = sessionStorage.getItem("alreadySeen")
        }
        let i = alreadySeen ? 21 : 0;
        let update = () => {
            let step = nameAnimation[i];
            setNameAnimationStep(step.t);
            i++;
            if (i < nameAnimation.length) {
                setTimeout(update, step.ms);
            } else {
                setDoneNameAnimation(true)
                sessionStorage.setItem("alreadySeen", true)
            }
        }
        update();
    }, [])

    return (
        <div className="site-container">
            <h1 className="name-intro">
                <span style={{color: "white", fontSize: "40px", fontWeight: "bold"}}>{"{"}</span>
                <span style={{borderBottom: "2px solid white"}}>{nameAnimationStep}</span>
                <span style={{color: "white", fontSize: "40px", fontWeight: "bold"}}>{"}"}</span>
            </h1>
        </div>
    );
}

export default MainPage;