import {useState} from "react";
import {alertError, alertSuccess} from "../../lib/alert.js";
import {useEffectOnce, useLocalStorage} from "react-use";
import {enrollCourseTaught, sectionsAvailTaught} from "../../lib/api/LecturerApi.jsx";
import {Link, useNavigate} from "react-router";

export default function CoursesTaughtEnroll() {

    const navigate = useNavigate();
    const [courses, setCourses] = useState([])
    const [token, _] = useLocalStorage('access_token', '')
    const [loading, setLoading] = useState(false)

    async function handleEnroll(section_id) {
        setLoading(true);
        try {
            const response = await enrollCourseTaught(token, {section_id});
            if (response.status === 204) {
                await alertSuccess("Berhasil mendaftar")
                navigate("/dashboard/lecturer")
            }else {
                await alertError("Gagal mendaftar gatau la backend ga kasih pesan")
            }
        } finally {
            setLoading(false);
        }

    }

    async function fetchCoursesAvailable() {
        const response = await sectionsAvailTaught(token, {})
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setCourses(responseBody)
        }else {
           await alertError("gataula backend la intinya ni eror")
        }

    }

    useEffectOnce(() => {
        fetchCoursesAvailable()
            .then(() => console.log("sukses fecth courses"))
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

        {/* List Course */}
        {courses
            .sort((a, b) => a.section_name.localeCompare(b.section_name))
            .sort((a, b) => a.course_name.localeCompare(b.course_name))
            .map((course) => (
            <div key={course.id}
                 className="mb-4 bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                <div className="p-6">
                    <div className="block rounded-lg transition-all duration-200 p-3">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">
                                {course.course_name}
                            </h2>
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

                    {/* Tombol Enroll */}
                    <div className="mt-4 flex justify-end space-x-3">
                        <button
                            onClick={() => handleEnroll(course.id)}
                            disabled={loading}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-md flex items-center">
                            <i className="fas fa-check-circle mr-2"></i>
                            {loading ? 'Enrolling...' : 'Enroll Course'}
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </>

}