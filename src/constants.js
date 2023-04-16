import ScaleText from "react-scale-text";

export const nameAnimation = [
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
]

export const languageDetails = [
    {
        name: "NodeJS",
        details: (
            <>
                <div className="lang-title">
                    <a style={{color:"#fff"}} href="https://nodejs.org/" target="_blank">
                        NodeJS
                    </a>
                </div>
                <ScaleText widthOnly={true} maxFontSize={30}>
                    <div className="lang-description">
                        {`Node is my language/framework of choice for writing `}
                        <span style={{color: "#55ff37"}}>
                            {`quick scripts`}
                        </span>
                        {`, and developing web applications using `}
                        <a style={{color: "#55ff37"}} href="https://react.dev/" target="_blank">
                            {`ReactJS`}
                        </a>
                        {`. I've been using it since 2019, and I'd call myself an `}
                        <span style={{color: "#55ff37"}}>
                            {`advanced`}
                        </span>
                        {` user.`}
                    </div>
                </ScaleText>
            </>

        )
    },
    {
        name: "Python",
        details: (
            <>
                <div className="lang-title">
                    <a style={{color:"#fff"}} href="https://www.python.org/" target="_blank">
                    Python
                    </a>
                </div>
                <ScaleText widthOnly={true} maxFontSize={30}>
                    <div className="lang-description">
                        {`Having been taught most of my university computer science courses in `}
                        <span style={{color: "#ffd43b"}}>
                            Python
                        </span>
                        {`, I've built an intricate understanding and love for it; using it mostly for `}
                        <span style={{color: "#ffd43b"}}>
                            data science and analysis
                        </span>
                        {`, `}
                        <span style={{color: "#ffd43b"}}>
                            machine learning
                        </span>
                        {`, and `}
                        <span style={{color: "#ffd43b"}}>
                            back-end web development
                        </span>
                        {`. I learned it back in 2017, and I am `}
                        <span style={{color: "#ffd43b"}}>
                            proficient
                        </span>
                        {`.`}
                    </div>
                </ScaleText>
            </>
        )
    },
    {
        name: "HTML/CSS/JS",
        details: (
            <>
                <div className="lang-title">
                    <a style={{color:"#fff"}} href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank">
                    HTML/CSS/JS
                    </a>
                </div>
                <ScaleText widthOnly={true} maxFontSize={30}>
                    <div className="lang-description">
                        {`This was my first introduction into programming; creating awful websites in `}
                        <span style={{color: "#b71111"}}>
                            HTML
                        </span> 
                        {` with some inline styling when I was `}
                        <span style={{color: "#b71111"}}>
                            ~10 years old
                        </span>
                        {`. I'm still constantly learning of better design principles and best practices, but I think I've gotten just a `}
                        <em>
                            little bit
                        </em>
                        {` better. Overall, I am `}
                        <span style={{color: "#b71111"}}>
                            advanced
                        </span>
                        {` with this stack.`}
                    </div>
                </ScaleText>
            </>
        )
    },
]