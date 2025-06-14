import {useEffect, useState} from "react";
import {alertError} from "../../lib/alert.js";
import {useEffectOnce} from "react-use";
import {enrollCourseTaught, sectionsAvailTaught} from "../../lib/api/LecturerApi.jsx";
import {Link} from "react-router";

export default function CoursesTaughtEnroll() {

    const [courses, setCourses] = useState([
        {
            "id": 23,
            "course_name": "Kalkulus",
            "section_name": "Integral Partial",
            "room": "103",
            "lecturer": "Mandrib"
        }
    ])
    const [token, _] = useState('')
    // state untuk refresh token jangan lupa ditambahkan
    const [name, setName] = useState('')
    const [reload, setReload] = useState(false)
    const [loading, setLoading] = useState(false)

    async function handleEnroll(section_id) {
        setLoading(true);
        try {
            const response = await enrollCourseTaught(token, section_id);
            if (response.status === 204) {
                alert("Berhasil mendaftar")
                setReload(!reload)

            }else {
                await alertError("Gagal mendaftar gatau la backend ga kasih pesan")
            }
        } finally {
            setLoading(false);
        }

    }

    async function fetchCoursesAvailable() {
        const response = await sectionsAvailTaught(token, {name})
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setCourses(responseBody)
        }else {
           await alertError("gataula backend la intinya ni eror")
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        setReload(!reload)
    }

    useEffect(() => {
        fetchCoursesAvailable()
            .then(() => console.log("sukses fecth courses"))
    }, [reload]);



    useEffectOnce(() => {
        const toggleButton = document.getElementById('toggleSearchForm');
        const searchFormContent = document.getElementById('searchFormContent');
        const toggleIcon = document.getElementById('toggleSearchIcon');

        // Add transition for smooth animation
        searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
        searchFormContent.style.overflow = 'hidden';
        searchFormContent.style.maxHeight = '0px';
        searchFormContent.style.opacity = '0';
        searchFormContent.style.marginTop = '0';


        function toggleSearchForm() {
            if (searchFormContent.style.maxHeight !== '0px') {
                // Hide the form
                searchFormContent.style.maxHeight = '0px';
                searchFormContent.style.opacity = '0';
                searchFormContent.style.marginTop = '0';
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            } else {
                // Show the form
                searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px';
                searchFormContent.style.opacity = '1';
                searchFormContent.style.marginTop = '1rem';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            }
        }

        toggleButton.addEventListener('click', toggleSearchForm);

        return ( () => {
            toggleButton.removeEventListener('click', toggleSearchForm);
        })
    })

    return <>

        <div className="flex items-center mb-6">
            <Link to="/dashboard/lecturer"
                  className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-id-card text-brown-dark mr-3"></i> Enroll Details
            </h1>
        </div>

        <div
            className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <i className="fas fa-search text-blue-400 mr-3"></i>
                    <h2 className="text-xl font-semibold text-white">Search Course</h2>
                </div>
                <button type="button" id="toggleSearchForm"
                        className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
                    <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon"></i>
                </button>
            </div>
            <div id="searchFormContent" className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label htmlFor="search_name"
                                   className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-gray-500"></i>
                                </div>
                                <input type="text" id="search_name" name="search_name" value={name} onChange={(e)=> setName(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                       placeholder="Search by name"/>
                            </div>
                        </div>


                    </div>
                    <div className="mt-5 text-right">
                        <button type="submit"
                                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                            <i className="fas fa-search mr-2"></i> Search
                        </button>
                    </div>
                </form>
            </div>
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
                            onClick={() => handleEnroll(course.id)}
                            disabled={loading}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
                            <i className="fas fa-check-circle mr-2"></i>
                            {loading ? 'Enrolling...' : 'Enroll Course'}
                        </button>

                    </div>
                </div>
            </div>
        ))}






    </>
}