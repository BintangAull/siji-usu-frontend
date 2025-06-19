import {useState} from "react";

import {alertError} from "../../lib/alert.js";
import {useEffectOnce, useLocalStorage} from "react-use";
import {Link} from "react-router";
import {coursesTaught} from "../../lib/api/LecturerApi.jsx";

export default function CoursesTaught() {


    const [courses, setCourses] = useState([
        {
            "id": 23,
            "course_name": "Matematika Diskrit",
            "section_name": "Peluang",
            "room": "103",
            "lecturer": "Mandrib"
        }
    ])
    const [token, __] = useLocalStorage('access_token', '')


    async function fetchCoursesTaught() {
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
        const response = await coursesTaught(token)
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setCourses(responseBody.courses_taken)

        }else {
            await alertError("gatau backend ga kasih pesan")
        }
    }


    useEffectOnce(() => {
        fetchCoursesTaught()
            .then(() => console.log("sukses fecth courses"))
    })




    return <>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div
                className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
                <Link to="/dashboard/lecturer/sections" className="block p-6 h-full">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div
                            className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                            <i className="fas fa-graduation-cap text-3xl text-white"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-white mb-3">Enroll New Course to Taught</h2>
                        <p className="text-gray-300">Add a new course of your list</p>
                    </div>
                </Link>
            </div>
            {courses.map((course) => (
                <div key={course.id}
                     className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div
                            className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3">
                            <div className="flex items-center mb-3">
                                <div
                                    className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                                    <i className="fas fa-user text-white"></i>
                                </div>
                                <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">{course.course_name}
                                </h2>
                            </div>
                            <div className="space-y-3 text-gray-300 ml-2">
                                <p className="flex items-center">
                                    <i className="fas fa-user-tag text-gray-500 w-6"></i>
                                    <span className="font-medium w-24">section :</span>
                                    <span>{course.section_name}</span>
                                </p>
                                <p className="flex items-center">
                                    <i className="fas fa-user-tag text-gray-500 w-6"></i>
                                    <span className="font-medium w-24">Room:</span>
                                    <span>{course.room}</span>
                                </p>
                                <p className="flex items-center">
                                    <i className="fas fa-envelope text-gray-500 w-6"></i>
                                    <span className="font-medium w-24">Lecturer:</span>
                                    <span>{course.lecturer}</span>
                                </p>

                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
                                <i className="fas fa-trash-alt mr-2"></i> Unenroll Course
                            </button>
                        </div>
                    </div>
                </div>
            ))}


        </div>

    </>
}