import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import GitHubFeed from '../components/GithubActivity/GithubFeed'
import ClipLoader from 'react-spinners/ClipLoader';

import './GithubPage.css'

const BASE_URL = "https://api.github.com/users/";

function GithubPage() {
    const [values, setValues] = useState({
        fullname: "",
        username: "kli885",
        avatarUrl: ""
    }) 
    const [events, setEvents] = useState([])
    const [isEmpty, setIsEmpty] = useState(true)
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getGithubUserData = async () => {
            let jsonGithubInfo = localStorage.getItem("github_info")
            let jsonGithubEvents = localStorage.getItem("github_events")
            if (jsonGithubInfo) {
                let githubInfo = JSON.parse(jsonGithubInfo)
                setValues(v => ({ ...v, avatarUrl: githubInfo.avatar_url, fullname: githubInfo.name }));
            } else {
                await getGithubInfo();
            }
            if (jsonGithubEvents) {
                let githubEvents = JSON.parse(jsonGithubEvents);
                setEvents(githubEvents);
                if (githubEvents.length > 0) {
                    setIsEmpty(false)
                }
            } else {
                await getGithubEvents();
            }
            setLoading(false)
        }
        getGithubUserData()
    }, []);

    const getGithubInfo = async () => {
        try {
            const response = await fetch(BASE_URL + values.username);
            if (response.ok) {
                const data = await response.json();
                let objData = {
                    name: data.name,
                    username: "kli885",
                    avatar_url: data.avatar_url
                }
                localStorage.setItem("github_info", JSON.stringify(objData))
                setValues(v => ({ ...v, avatarUrl: data.avatar_url, fullname: data.name }));
            }
        } catch (infoFetchError) {
            console.log("Info Fetch Error: ", infoFetchError)
        }
    }
    
    const getGithubEvents = async () => {
        try {
            const eventsResponse = await fetch(BASE_URL + values.username + "/events");
            if (eventsResponse.ok) {
                const eventsData = await eventsResponse.json();
                setEvents(eventsData);
                localStorage.setItem("github_events", JSON.stringify(eventsData))
                if (eventsData.length > 0) {
                    setIsEmpty(false)
                }
            }
        } catch (eventFetchError) {
            console.log("Events Fetch Error: ", eventFetchError)
        }
    }

    return (
        <>
            {isLoading ? (
                <div className="loading-container">
                    <ClipLoader color={'#fff'} loading={isLoading} size={150} />
                </div>
                ) : (
                <div className="github-page">
                    <Link to='/'>
                        <h1 className="name-intro top" style={{color: "white"}}>
                            <span style={{ fontSize: "40px", fontWeight: "bold" }}>{"{"}</span>
                            <span style={{ borderBottom: "2px solid white" }}>KEVIN LI</span>
                            <span style={{ fontSize: "40px", fontWeight: "bold" }}>{"}"}</span>
                        </h1>
                    </Link>
                    
                    <div className="github-container" style={{alignItems: "start"}}>
                        <GitHubFeed
                            fullName={values.fullname}
                            userName={values.username}
                            avatarUrl={values.avatarUrl}
                            events={events}
                            isEmpty={isEmpty}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default GithubPage;