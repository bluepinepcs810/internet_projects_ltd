import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Teams from "./pages/teams"
import Players from "./pages/players"
import DashboardLayout from "./layout/dashboard_layout"
import NewTeam from './pages/new_team';
import 'toastr/build/toastr.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import TeamDetail from './pages/team_detail';
import PlayerDetail from './pages/player_detail';

const App = () => {
    const queryClient = new QueryClient();
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<DashboardLayout />}>
                        <Route path="/teams" element={<Teams />} />
                        <Route path="/teams/new" element={<NewTeam />} />
                        <Route path="/teams/:teamId" element={<TeamDetail />} />
                        <Route path="/teams/:teamId/players/:playerId" element={<PlayerDetail />} />
                        <Route path="/players" element={<Players />} />
                        <Route path="/players/:playerId" element={<PlayerDetail />} />
                    </Route>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

export default App;
