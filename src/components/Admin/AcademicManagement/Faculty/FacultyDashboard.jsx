import {Link} from "react-router";
import {useEffect, useState} from "react";
import {facultyList} from "../../../../lib/api/AdminApi.jsx";
import {alertError} from "../../../../lib/alert.js";
import {useEffectOnce} from "react-use";

export default function FacultyDashboard() {

    const [id, setId] = useState("")
    const [faculties, setFaculties] = useState([
        {
            "id": 23,
            "name": "fasilkomti",
            "code": "87",
            "departments": [
                {
                    "id": 23,
                    "name": "ilmu komputer",
                    "code": "2314"
                },
                {
                    "id": 24,
                    "name": "ilmu gpt",
                    "code": "2315"
                }
            ]
        }
    ])
    const [reload, setReload] = useState(false)
    const [token, _] = useState('')


    async function handleSubmit(e) {
        e.preventDefault();
        setReload(!reload)

    }

    async function fetchFaculty() {
        let idFaculty = Number(id)
        const response = await facultyList(token,{idFaculty})
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setFaculties(responseBody)
        }else {
            await alertError("gatau eror nya apa back end ga set pesan eror")
        }
    }

    useEffect(() => {
        fetchFaculty()
            .then(() => console.log("sukses fetch faculty"))
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
            <Link to="/dashboard/admin/academic"
                  className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-id-card text-brown-dark mr-3"></i> Details Faculty Universitas Sastra Komputer
            </h1>
        </div>

        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <i className="fas fa-search text-amber-400 mr-3"></i>
                    <h2 className="text-xl font-semibold text-cream">Search Faculty</h2>
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
                            <label htmlFor="search_faculty_id"
                                   className="block text-beige text-sm font-medium mb-2">Search by faculty Id</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-amber-400"></i>
                                </div>
                                <input type="number" id="search_faculty_id" name="search_faculty_id" value={id} onChange={(e)=> setId(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                       placeholder="Search by faculty id"/>
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
            <Link to="/dashboard/admin/academic/faculty/register" className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-user-plus text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-cream mb-3">Create New Faculty</h2>
                    <p className="text-beige">Add a new Faculty</p>
                </div>
            </Link>
        </div>

        <div>
            <br/>
        </div>

        {faculties.map((faculty)  => (
            <div key={faculty.id}
                 className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                <div className="p-6">



                    <Link to={`/dashboard/admin/academic/faculty/${faculty.id}/department`}
                        className="block cursor-pointer hover:bg-brown-light/30 rounded-lg transition-all duration-200 p-3">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">{faculty.name}
                            </h2>
                        </div>
                        <div className="space-y-3 text-beige ml-2">
                            <p className="flex items-center">
                                <i className="fas fa-envelope text-amber-400 w-6"></i>
                                <span className="font-medium w-24">Code :</span>
                                <span>{faculty.code}</span>
                            </p>


                            <h3>Departments</h3>

                            <ul className="space-y-4">
                                {faculty.departments.map((department) => (
                                    <li key={department.id} className="block"> {/* Block ensures vertical stacking */}
                                        <div className="flex flex-col space-y-2"> {/* flex-col makes flex items stack vertically */}
                                            <p className="flex items-center">
                                                <i className="fas fa-envelope text-amber-400 w-6"></i>
                                                <span className="font-medium w-24">Name:</span>
                                                <span>{department.name}</span>
                                            </p>

                                            <p className="flex items-center">
                                                <i className="fas fa-envelope text-amber-400 w-6"></i>
                                                <span className="font-medium w-24">Code:</span>
                                                <span>{department.code}</span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Link>

                    <div className="mt-4 flex justify-end space-x-3">
                        <Link to={`/dashboard/admin/academic/faculty/${faculty.id}/edit`}
                              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-md flex items-center"
                        >
                            <i className="fas fa-edit mr-2" /> Edit
                        </Link>

                    </div>
                </div>
            </div>
        ))}
    </>
}