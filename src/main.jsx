import {createRoot} from 'react-dom/client'
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router";
import UserLogin from "./components/User/UserLogin.jsx";
import NotFound from "./components/BlankPage/BlankPage.jsx";
import DashboardLayout from "./components/DashboardLayout.jsx";
import UserStudentProfile from "./components/User/UserStudentProfile.jsx";
import UserLogout from "./components/User/UserLogout.jsx";
import CourseTaken from "./components/Students/CourseTaken.jsx";
import CoursesEnroll from "./components/Students/CoursesEnroll.jsx";
import CoursesTaught from "./components/Lecturer/CoursesTaught.jsx";
import LecturerProfile from "./components/Lecturer/LecturerProfile.jsx";
import AdminDashboard from "./components/Admin/coretandashboard.jsx";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/login" element={<UserLogin/>} />


            <Route path="/dashboard" element={<DashboardLayout/>}>

                <Route path="students">
                    <Route index element={<CourseTaken/>}/>
                    <Route path="sections" element={<CoursesEnroll/>}/>
                    <Route path="profile" element={<UserStudentProfile/>}/>
                    <Route path="logout" element={<UserLogout/>}/>

                </Route>

                <Route path="lecturer">
                    <Route index element={<CoursesTaught/>}/>
                    <Route path="sections" element={<CoursesEnroll/>}/>
                    <Route path="profile" element={<LecturerProfile/>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>

                <Route path="admin">

                    <Route index element={<AdminDashboard/>}/>
                    <Route path="profile" element={<div>profile</div>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>


            </Route>



        </Routes>
    </BrowserRouter>
)