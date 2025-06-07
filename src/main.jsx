import {createRoot} from 'react-dom/client'
import './index.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import UserLogin from "./components/User/UserLogin.jsx";
import NotFound from "./components/BlankPage/BlankPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import UserStudentProfile from "./components/User/UserStudentProfile.jsx";
import UserLogout from "./components/User/UserLogout.jsx";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/login" element={<UserLogin/>} />


            <Route path="/dashboard" element={<DashboardLayout/>}>
                <Route path="students" element={<div>students isinya nampilin course nya </div>}>
                    <Route path="profile" element={<UserStudentProfile/>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>

                <Route path="lecturers"  element={<div>nampilin dashbord dia la</div>}>
                    <Route path="profile" element={<div>profile dosen kentod</div>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>

                <Route path="admin" element={<div>nampilin dashbord dia la</div>}>
                    <Route path="profile" element={<div>profile</div>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>


            </Route>


            <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
    </BrowserRouter>
)