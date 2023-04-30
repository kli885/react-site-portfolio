import ScaleText from "react-scale-text";
import PerfectScrollbar from 'react-perfect-scrollbar'
import ScrollContainer from "react-indiana-drag-scroll";

import useIsOverflow from "../hooks/useIsOverflow";
import useWindowSize from "../hooks/useWindowSize"

import { langColors } from "../constants";
import { useEffect, useLayoutEffect, useState, useRef } from "react";

export const LanguageDetails = (descriptionHeight, projectWidth, active) => {
    const scrollRef = useRef(null)
    const scrollRef2 = useRef(null)

    const [width, height] = useWindowSize()
    const isOverflow = useIsOverflow(scrollRef)
    const isOverflow2 = useIsOverflow(scrollRef2)

    const [projectHeight, setProjectHeight] = useState()
    const [projectClassName, setProjectClassName] = useState("proj")

    let maxFontSize = 25;
    let maxProjHeight = `${descriptionHeight/2}px`
    let maxDescHeight = `${descriptionHeight/4+100}px`

    useEffect(() => {
        if (scrollRef.current) {
            if (isOverflow.isWidthOverflow) {
                scrollRef.current.style.justifyContent = "unset"
            } else {
                scrollRef.current.style.justifyContent = "center"
            }
        }

    }, [isOverflow])

    useEffect(() => {
        if (scrollRef2.current) {
            if (isOverflow2.isWidthOverflow) {
                scrollRef2.current.style.justifyContent = "unset"
            } else {
                scrollRef2.current.style.justifyContent = "center"
            }
        }
    }, [isOverflow2])

    useLayoutEffect(() => {
        if (scrollRef2.current) {
            scrollRef2.current.style.height = descriptionHeight - scrollRef2.current.offsetTop + 30 + "px"
        }
    }, [width, height, descriptionHeight, scrollRef2.current?.offsetTop])

    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setProjectClassName("proj loaded")
            }, 1000)
        } else {
            setProjectClassName("proj")
        }
    }, [active])

    return ([
        (
            <>
                <div className="lang-title">
                    <a style={{color:"#fff"}} href="https://nodejs.org/" target="_blank" rel="noreferrer">
                        NodeJS
                    </a>
                </div>
                <div className="lang-description" id="node-description">
                    {`Node is my language/framework of choice for writing `}
                    <span style={{color: langColors[0]}}>
                        {`quick scripts`}
                    </span>
                    {`, and developing `}
                    <span style={{color: langColors[0]}}>
                        {`web applications`}
                    </span>
                    {`. I am most familiar with `}
                    <a style={{color: langColors[0]}} href="https://react.dev/" target="_blank">
                        {`ReactJS`}
                    </a>
                    {`, which is the library used for this site! I've been using it since 2019, and I'd call myself an `}
                    <span style={{color: langColors[0]}}>
                        {`advanced`}
                    </span>
                    {` user.`}
                </div>
                <ScrollContainer innerRef={scrollRef} ignoreElements="h3" className="projects node-projects">
                    <div className={projectClassName} style={{backgroundImage: "url(img/social-distribution.gif)"}}>
                        {isOverflow.isHeightOverflow || isOverflow.isWidthOverflow ? (<div id="scroll-tip">
                            {`Drag to scroll -->`}
                        </div>) : (<></>)}
                        <a href="https://github.com/CMPUT404Project/social-distribution" target="_blank" rel="noreferrer">
                            <h2>Social Distribution <br/>(Frontend)</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/portfolio.gif)"}}>
                        <a href="https://github.com/kli885/react-site-portfolio" target="_blank" rel="noreferrer">
                            <h2>Portfolio</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/CalendarMed.png)"}}>
                        <a href="https://github.com/UAlberta-CMPUT401/learning-sciences" target="_blank" rel="noreferrer">
                            <h2>Calendar Med <br/>(Frontend)</h2>
                        </a>
                    </div>
                </ScrollContainer>
            </>
        ),
        (
            <>
                <div className="lang-title">
                    <a style={{color:"#fff"}} href="https://www.python.org/" target="_blank" rel="noreferrer">
                        Python
                    </a>
                </div>
                <div className="lang-description" id="python-description">
                    {`Having been taught most of my university computer science courses in `}
                    <span style={{color: langColors[1]}}>
                        Python
                    </span>
                    {`, I've built an intricate understanding and love for it; using it mostly for `}
                    <span style={{color: langColors[1]}}>
                        data science and analysis
                    </span>
                    {`, `}
                    <span style={{color: langColors[1]}}>
                        machine learning
                    </span>
                    {`, and `}
                    <span style={{color: langColors[1]}}>
                        back-end web development
                    </span>
                    {`. I learned it back in 2017, and I am `}
                    <span style={{color: langColors[1]}}>
                        proficient
                    </span>
                    {`.`}
                </div>
                <ScrollContainer innerRef={scrollRef} ignoreElements="h3" className="projects python-projects">
                    <div className={projectClassName} style={{backgroundImage: "url(img/social-distribution.gif)"}}>
                        {isOverflow.isHeightOverflow || isOverflow.isWidthOverflow ? (<div id="scroll-tip">
                            {`Drag to scroll -->`}
                        </div>) : (<></>)}

                        <a href="https://github.com/CMPUT404Project/social-distribution" target="_blank" rel="noreferrer">
                            <h2>Social Distribution <br/>(Backend)</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/TwitterBot.png)"}}>
                        <a href="https://github.com/jonny21099/TwitterBot" target="_blank" rel="noreferrer">
                            <h2>Markov Twitter Bot</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/CalendarMed.png)"}}>
                        <a href="https://github.com/UAlberta-CMPUT401/learning-sciences" target="_blank" rel="noreferrer">
                            <h2>Calendar Med <br/>(Backend)</h2>
                        </a>
                    </div>
                </ScrollContainer>
            </>
        ),
        (
            <>
                <div className="lang-title">
                    <a style={{color:"#fff"}} href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noreferrer">
                        HTML/CSS/JS
                    </a>
                </div>
                <div className="lang-description" id="python-description">
                    {`This was my first introduction into programming; creating awful websites in `}
                    <span style={{color: langColors[2]}}>
                        HTML
                    </span> 
                    {` with some inline styling when I was `}
                    <span style={{color: langColors[2]}}>
                        ~10 years old
                    </span>
                    {`. I'm still constantly learning of better design principles and best practices, but I think I've gotten just a `}
                    <em>
                        little bit
                    </em>
                    {` better. Overall, I am `}
                    <span style={{color: langColors[2]}}>
                        advanced
                    </span>
                    {` with this stack.`}
                </div>
                <ScrollContainer innerRef={scrollRef} ignoreElements="h3" className="projects htmlcssjs-projects">
                    <div className={projectClassName} style={{backgroundImage: "url(img/social-distribution.gif)"}}>
                        {isOverflow.isHeightOverflow || isOverflow.isWidthOverflow ? (<div id="scroll-tip">
                            {`Drag to scroll -->`}
                        </div>) : (<></>)}
                        <a href="https://github.com/CMPUT404Project/social-distribution" target="_blank" rel="noreferrer">
                            <h2>Social Distribution <br/>(Frontend)</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/portfolio.gif)"}}>
                        <a href="https://github.com/kli885/react-site-portfolio" target="_blank" rel="noreferrer">
                            <h2>Portfolio</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/CalendarMed.png)"}}>
                        <a href="https://github.com/UAlberta-CMPUT401/learning-sciences" target="_blank" rel="noreferrer">
                            <h2>Calendar Med <br/>(Frontend)</h2>
                        </a>
                    </div>

                </ScrollContainer>
                <ScrollContainer innerRef={scrollRef2} ignoreElements="h3" className="projects htmlcssjs-projects">
                    <div className={projectClassName} style={{backgroundImage: "url(img/FunPages.png)"}}>
                        <a href="https://github.com/kli885/CMPUT404-assignment-css-hell/tree/master/homepage" target="_blank" rel="noreferrer">
                            <h2>Fun HTML/CSS Pages</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/CustomDiscord.png)"}}>
                        <a href="https://github.com/kli885/CustomDiscordTheme" target="_blank" rel="noreferrer">
                            <h2>Custom Discord CSS</h2>
                        </a>
                    </div>
                </ScrollContainer>
            </>
        ),
        (
            <>
                <div className="lang-title">
                    <a style={{color:"#fff"}} href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noreferrer">
                    Others
                    </a>
                </div>
                <div className="lang-description" id="python-description">
                    {`Some other languages I've worked in are `}
                    <span style={{color: langColors[3]}}>
                        Dart
                    </span> 
                    {`, `}
                    <span style={{color: langColors[3]}}>
                        Java
                    </span>
                    {`, `}
                    <span style={{color: langColors[3]}}>
                        C++
                    </span>
                    {`, and a little bit of `}
                    <span style={{color: langColors[3]}}>
                        C#
                    </span>
                </div>
                <ScrollContainer innerRef={scrollRef} ignoreElements="h3" className="projects other-projects">
                    <div className={projectClassName} style={{backgroundImage: "url(img/Eligere2.png)"}}>
                        {isOverflow.isHeightOverflow || isOverflow.isWidthOverflow ? (<div id="scroll-tip">
                            {`Drag to scroll -->`}
                        </div>) : (<></>)}
                        <a target="_blank" rel="noreferrer">
                            <h2>Eligere - Flutter<br/>(Source Unavailable)</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/UberApp.png)"}}>
                        <a href="https://github.com/kli885/react-site-portfolio" target="_blank" rel="noreferrer">
                            <h2>Uber-esque App - Java</h2>
                        </a>
                    </div>
                    <div className={projectClassName} style={{backgroundImage: "url(img/WIP.png)"}}>
                        <a href="https://github.com/UAlberta-CMPUT401/learning-sciences" target="_blank" rel="noreferrer">
                            <h2>Unity Game - C#<br/>(Source Unavailable)</h2>
                        </a>
                    </div>
                </ScrollContainer>
            </>
        )
    ])
}