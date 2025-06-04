import {createRoot} from 'react-dom/client'
import './index.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import UserLogin from "./components/User/UserLogin.jsx";
import NotFound from "./components/BlankPage/BlankPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/login" element={<UserLogin/>} />


            <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route path="students" >
                    <Route path="profile" element={<div>profile</div>}/>
                    <Route path="logout" element={<div>logout</div>} />
                </Route>

                <Route path="lecturers" >
                    <Route path="profile" element={<div>profile</div>}/>
                    <Route path="logout" element={<div>logout</div>} />
                </Route>

                <Route path="admin" >
                    <Route path="profile" element={<div>profile</div>}/>
                    <Route path="logout" element={<div>logout</div>} />
                </Route>


            </Route>


            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
)