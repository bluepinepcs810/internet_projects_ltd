import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Teams from "./pages/teams"
import Players from "./pages/players"
import DashboardLayout from "./layout/dashboard_layout"
import NewTeam from './pages/new_team';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DashboardLayout />}>
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/teams/new" element={<NewTeam />} />
                    <Route path="/players" element={<Players />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
