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
import CoursesTaughtEnroll from "./components/Lecturer/CoursesTaughtEnroll.jsx";
import UserAdminProfile from "./components/Admin/AdminProfile.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import UserManagement from "./components/Admin/UserManagment/UserManagment.jsx";
import UniversityManage from "./components/Admin/UniversityManage.jsx";
import LecturerDashboard from "./components/Admin/UserManagment/Lecturer/LecturerDashboard.jsx";
import StudentDashboard from "./components/Admin/UserManagment/Student/StudentDashboard.jsx";
import LecturerRegister from "./components/Admin/UserManagment/Lecturer/LecturerRegister.jsx";
import StudentRegister from "./components/Admin/UserManagment/Student/StudentRegister.jsx";


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
                    <Route path="sections" element={<CoursesTaughtEnroll/>}/>
                    <Route path="profile" element={<LecturerProfile/>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>

                <Route path="admin">

                    <Route index element={<AdminDashboard/>}/>
                    <Route path="user">
                        <Route index element={<UserManagement/>}/>
                        <Route path="lecturer">
                            <Route index element={<LecturerDashboard/>}/>
                            <Route path="register" element={<LecturerRegister/>}/>
                        </Route>

                        <Route path="student">
                            <Route index element={<StudentDashboard/>}/>
                            <Route path="register" element={<StudentRegister/>}/>
                        </Route>
                    </Route>
                    <Route path="academic" element={<UniversityManage/>}/>
                    <Route path="profile" element={<UserAdminProfile/>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>


            </Route>



        </Routes>
    </BrowserRouter>
)