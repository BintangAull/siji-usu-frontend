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
import UpdateStudent from "./components/Admin/UserManagment/Student/UpdateStudent.jsx";
import UpdateLecturer from "./components/Admin/UserManagment/Lecturer/UpdateLecturer.jsx";
import RedirectLogin from "./lib/RedirectLogin.jsx";
import FacultyDashboard from "./components/Admin/AcademicManagement/Faculty/FacultyDashboard.jsx";
import RoomDashboard from "./components/Admin/AcademicManagement/Room/RoomDashboard.jsx";
import MajorDashboard from "./components/Admin/AcademicManagement/Major/MajorDashboard.jsx";
import UpdateFaculty from "./components/Admin/AcademicManagement/Faculty/UpdateFaculty.jsx";
import RegisterFaculty from "./components/Admin/AcademicManagement/Faculty/RegisterFaculty.jsx";
import UpdateMajor from "./components/Admin/AcademicManagement/Major/UpdateMajor.jsx";
import RegisterMajor from "./components/Admin/AcademicManagement/Major/RegisterMajor.jsx";
import DepartmentList from "./components/Admin/AcademicManagement/Faculty/DepartmentList.jsx";
import CreateRoom from "./components/Admin/AcademicManagement/Room/CreateRoom.jsx";
import UpdateRoom from "./components/Admin/AcademicManagement/Room/UpdateRoom.jsx";
import CoursesDashboard from "./components/Admin/AcademicManagement/Courses/CoursesDashboard.jsx";
import CreateCourse from "./components/Admin/AcademicManagement/Courses/CreateCourse.jsx";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<RedirectLogin/>}/>
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

                            <Route path=":id">
                                <Route path= "edit" element={<UpdateLecturer/>}/>
                            </Route>
                            <Route path="register" element={<LecturerRegister/>}/>
                        </Route>

                        <Route path="student">
                            <Route index element={<StudentDashboard/>}/>
                            <Route path=":id">
                                <Route path= "edit" element={<UpdateStudent/>}/>
                            </Route>
                            <Route path="register" element={<StudentRegister/>}/>
                        </Route>
                    </Route>


                    <Route path="academic">
                        <Route index element={<UniversityManage/>}/>
                        <Route path="faculty">
                            <Route index element={<FacultyDashboard/>}/>
                            <Route path=":id">
                                <Route path= "edit" element={<UpdateFaculty/>}/>
                                <Route path="register" element={<RegisterMajor/>}/>
                                <Route path="department" element={<DepartmentList/>}/>
                            </Route>
                            <Route path="register" element={<RegisterFaculty/>}/>

                        </Route>

                        <Route path = "major">
                            <Route index element={<MajorDashboard/>}/>
                            <Route path = ":id">
                                <Route index element={<CoursesDashboard/>}/>
                                <Route path = "course" element={<CreateCourse/>}/>
                                <Route path = "edit" element={<UpdateMajor/>}/>
                            </Route>

                        </Route>

                        <Route path = "department">

                            <Route path = ":id">
                                <Route path = "room">
                                    <Route index element={<RoomDashboard/>}/>
                                    <Route path = ":room_id">
                                        <Route path = "edit" element={<UpdateRoom/>}/>
                                    </Route>
                                </Route>
                                <Route path = "create" element={<CreateRoom/>}/>
                            </Route>

                        </Route>


                    </Route>




                    <Route path="profile" element={<UserAdminProfile/>}/>
                    <Route path="logout" element={<UserLogout/>}/>
                </Route>
            </Route>



        </Routes>
    </BrowserRouter>
)