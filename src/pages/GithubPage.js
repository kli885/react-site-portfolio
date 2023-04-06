import { useState, useEffect } from "react";
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
            const response = await fetch(BASE_URL + values.username);
            if (response.ok) {
                const data = await response.json();
                setValues(v => ({ ...v, avatarUrl: data.avatar_url, fullname: data.name }));

                const eventsResponse = await fetch(BASE_URL + values.username + "/events");
                if (eventsResponse.ok) {
                    const eventsData = await eventsResponse.json();
                    setEvents(eventsData);
                    if (eventsData.length > 0) {
                        setIsEmpty(false)
                    }
                    setLoading(false)
                }
            } else {
                setLoading(false)
            }
        }
        getGithubUserData()
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="loading-container">
                    <ClipLoader color={'#fff'} loading={isLoading} size={150} />
                </div>
                ) : (
                <div className="github-container" style={{alignItems: "start"}}>
                    <GitHubFeed
                        fullName={values.fullname}
                        userName={values.username}
                        avatarUrl={values.avatarUrl}
                        events={events}
                        isEmpty={isEmpty}
                    />
                </div>
            )}
        </>
    )
}

export default GithubPage;