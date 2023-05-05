

import { svgIconPaths } from '../constants';
import './Footer.css'

export const Footer = () => {
    const socialMedias = [
        {
            url: "https://www.linkedin.com/in/kevin-li-aa318a151/",
            icon: svgIconPaths.linkedin
        },
        {
            url: "https://github.com/kli885",
            icon: svgIconPaths.github
        }

    ]
    return (
        <footer>
            <button className="scroll-container" title="Back to top" onClick={() => window.scrollTo({top: 0, left: 0, behavior: "smooth"})}>
                <svg className="scroll-svg" viewBox="-3 -4 24 24">
                    <path d={svgIconPaths.doubleUpArrow}/>
                </svg>
            </button>
            <div className="icon-wrap">
            {socialMedias.map((socialMedia, i) => (
                <a key={i} className="social-icon" href={socialMedia.url} target="_blank" rel="noreferrer">
                    <div className="icon-container">
                        <svg className="icon-svg" viewBox="0 0 64 64">
                            <g className="icon-svg-path">
                                <path d={socialMedia.icon}></path>
                            </g>
                        </svg>
                    </div>
                </a>
            ))}
            </div>
            <div className="info-box">
                <div className="footnote">
                    KEVIN LI <span className="highlight">©2023</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;