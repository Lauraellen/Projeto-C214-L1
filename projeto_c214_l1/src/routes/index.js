import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from '../pages/Home';
// import ListAll from '../pages/ListAll';
// import ListByFilter from '../pages/ListByFilter';

export default function Routers() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/list" element={<ListAll />} /> */}
            {/* <Route exact path="/listByFilter" element={<ListByFilter />} /> */}
        </Routes>
    )
}