import React from 'react';
import { BrowserRouter as Router, /*Route, Routes*/ } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () =>  (
    <Router>
        <Header/>
    </Router>
);

export default App;