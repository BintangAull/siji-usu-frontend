import {Link} from 'react-router'
import {useEffectOnce, useLocalStorage} from "react-use";
import {useState} from "react";
import {coursesTaken} from "../../lib/api/StudentApi.jsx";
import {alertError} from "../../lib/alert.js";

export default function CourseTaken() {

    const [courses, setCourses] = useState([
    ])
    const [token, _] = useLocalStorage('access_token', '')


    async function fetchCourses() {
        /*
        // cek token nya dulu bos
        const tokenStatus = await checkAndRefreshToken(token, refresh_token);

        if(tokenStatus.needsLogin){
            await alertError("Token expired, please login again");
            navigate({
                pathname: "/login",
            })
            return;
        }
        if (tokenStatus.isValid){
            // simpen di localstorage update token baru
            if (tokenStatus.token !== token){
                setToken(tokenStatus.token);
            }
        } */
        const response = await coursesTaken(token)
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setCourses(responseBody.courses_taken)

        }else {
            await alertError("gatau backend ga kasih pesan")
        }
    }


    useEffectOnce(() => {
        fetchCourses()
            .then(() => console.log("sukses fecth courses"))
    })




    return <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Card Enroll New Course */}
            <div
                className="bg-brown-dark/90 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
                <Link to="/dashboard/students/sections" className="block p-6 h-full">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div
                            className="w-20 h-20 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                            <i className="fas fa-graduation-cap text-3xl text-white"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-cream mb-3">Enroll New Course</h2>
                        <p className="text-beige">Add a new course of your list</p>
                    </div>
                </Link>
            </div>

            {/* Card Courses */}
            {courses.map((course) => (
                <div key={course.id}
                     className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div className="block cursor-pointer hover:bg-brown-light/30 rounded-lg transition-all duration-200 p-3">
                            <div className="flex items-center mb-3">
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                    <i className="fas fa-user text-white"></i>
                                </div>
                                <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">{course.course_name}</h2>
                            </div>
                            <div className="space-y-3 text-beige ml-2">
                                <p className="flex items-center">
                                    <i className="fas fa-user-tag text-amber-400 w-6"></i>
                                    <span className="font-medium w-24">Section :</span>
                                    <span>{course.section_name}</span>
                                </p>
                                <p className="flex items-center">
                                    <i className="fas fa-door-open text-amber-400 w-6"></i>
                                    <span className="font-medium w-24">Room :</span>
                                    <span>{course.room ?? "-"}</span>
                                </p>
                                <p className="flex items-center">
                                    <i className="fas fa-chalkboard-teacher text-amber-400 w-6"></i>
                                    <span className="font-medium w-24">Lecturer :</span>
                                    <span>{course.lecturer ?? "-"}</span>
                                </p>
                            </div>
                        </div>

                        {/* Abaikan tombol unenroll sesuai instruksi */}
                    </div>
                </div>
            ))}
        </div>
    </>

}