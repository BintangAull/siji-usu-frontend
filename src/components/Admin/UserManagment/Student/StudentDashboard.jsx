import {Link} from "react-router";
import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {studentList} from "../../../../lib/api/StudentApi.jsx";
import {alertError} from "../../../../lib/alert.js";



export default function StudentDashboard() {

    const [name, setName] = useState("")
    const [students, setStudents] = useState([{}])
    const [reload, setReload] = useState(false)
    const [token, _] = useLocalStorage('access_token', '')

    async function handleSubmit(e) {
        e.preventDefault();
        setReload(!reload)
    }

    async function fetchStudent() {
        const response = await studentList(token,{name})
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setStudents(responseBody)
        }else {
            await alertError("gatau eror nya apa back end ga set pesan eror")
        }
    }

    useEffect(() => {
        fetchStudent()
            .then(() => console.log("sukses fetch lecturer"))
    },[reload])


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
            <Link to="/dashboard/admin/user"
                  className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-id-card text-brown-dark mr-3"></i> Details Student
            </h1>
        </div>

        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <i className="fas fa-search text-amber-400 mr-3"></i>
                    <h2 className="text-xl font-semibold text-cream">Search Student</h2>
                </div>
                <button type="button" id="toggleSearchForm"
                        className="text-beige hover:text-cream hover:bg-brown-light/30 p-2 rounded-full focus:outline-none transition-all duration-200">
                    <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon"></i>
                </button>
            </div>
            <div id="searchFormContent" className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label htmlFor="search_name"
                                   className="block text-beige text-sm font-medium mb-2">Search by Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-amber-400"></i>
                                </div>
                                <input type="text" id="search_name" name="search_name" value={name ?? ""} onChange={(e)=> setName(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                       placeholder="Search by name"/>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 text-right">
                        <button type="submit"
                                className="px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                            <i className="fas fa-search mr-2"></i> Search
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to="/dashboard/admin/user/student/register" className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-user-plus text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-cream mb-3">Create New Account</h2>
                    <p className="text-beige">Add a new Account for a Student</p>
                </div>
            </Link>
        </div>

        <div>
            <br/>
        </div>

        {students.map((student) => (
            <div key={student.id}
                 className="mb-4 bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                <div className="p-6">
                    <div
                        className="block rounded-lg transition-all duration-200 p-3">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">{student.name}
                            </h2>
                        </div>
                        <div className="space-y-3 text-beige ml-2">
                            <p className="flex items-center">
                                <i className="fas fa-envelope text-amber-400 w-6"></i>
                                <span className="font-medium w-24">Email :</span>
                                <span>{student.email}</span>
                            </p>
                            <p className="flex items-center">
                                <i className="fas fa-id-card text-amber-400 w-6"></i>
                                <span className="font-medium w-24">Nim:</span>
                                <span>{student.nim}</span>
                            </p>
                            <p className="flex items-center">
                                <i className="fas fa-id-badge text-amber-400 w-6"></i>
                                <span className="font-medium w-24">Major:</span>
                                <span>{student.major}</span>
                            </p>

                            <p className="flex items-center">
                                <i className="fas fa-graduation-cap text-amber-400 w-6"></i>
                                <span className="font-medium w-24">Faculty:</span>
                                <span>{student.faculty}</span>
                            </p>

                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                            <Link to={`/dashboard/admin/user/student/${student.id}/edit`}
                                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-md flex items-center"
                            >
                                <i className="fas fa-edit mr-2" /> Edit
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        ))}
    </>
}