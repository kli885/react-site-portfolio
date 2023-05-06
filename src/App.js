import { HashRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';

import MainPage from "./pages/MainPage";
import GithubPage from "./pages/GithubPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/github" element={<GithubPage />} />
            </Routes>
        </Router>
    );
}

export default App;
