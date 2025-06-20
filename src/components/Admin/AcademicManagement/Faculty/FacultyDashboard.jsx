import {Link} from "react-router";
import {useState} from "react";
import {facultyList} from "../../../../lib/api/AdminApi.jsx";
import {alertError} from "../../../../lib/alert.js";
import {useEffectOnce, useLocalStorage} from "react-use";

export default function FacultyDashboard() {

    const [faculties, setFaculties] = useState([])
    const [token, _] = useLocalStorage('access_token', '')

    async function fetchFaculty() {
        const response = await facultyList(token)
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setFaculties(responseBody)
        }else {
            await alertError("gatau eror nya apa back end ga set pesan eror")
        }
    }

    useEffectOnce(() => {
        fetchFaculty()
            .then(() => console.log("sukses fetch faculty"))
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
                 id={faculty.id}
                 className="mb-4 bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                <Link to={`/dashboard/admin/academic/faculty/${faculty.id}/department`}
                      className="block cursor-pointer hover:bg-brown-light/30 rounded-lg transition-all duration-200 p-3">
                <div className="p-6">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">{faculty.name}
                            </h2>
                        </div>
                        <div className="space-y-3 text-beige ml-2">
                            {/*<p className="flex items-center">*/}
                            {/*    <i className="fas fa-envelope text-amber-400 w-6"></i>*/}
                            {/*    <span className="font-medium w-24">Code :</span>*/}
                            {/*    <span>{faculty.code}</span>*/}
                            {/*</p>*/}


                            <h3>Departments:</h3>

                            <ul className="space-y-4">
                                {faculty.departments.map((department) => (
                                    <li key={department.id} className="block"> {/* Block ensures vertical stacking */}
                                        <div className="flex flex-col space-y-2"> {/* flex-col makes flex items stack vertically */}
                                            <p className="flex items-center">
                                                <i className="fas fa-envelope text-amber-400 w-6"></i>
                                                {/*<span className="font-medium w-24">Name:</span>*/}
                                                <span>{department.name} ({department.code})</span>
                                            </p>

                                            {/*<p className="flex items-center">*/}
                                            {/*    <i className="fas fa-envelope text-amber-400 w-6"></i>*/}
                                            {/*    <span className="font-medium w-24">Code:</span>*/}
                                            {/*    <span>{department.code}</span>*/}
                                            {/*</p>*/}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    <div className="mt-4 flex justify-end space-x-3">
                        <Link to={`/dashboard/admin/academic/faculty/${faculty.id}/edit`}
                              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-md flex items-center"
                        >
                            <i className="fas fa-edit mr-2" /> Edit
                        </Link>

                    </div>
                </div>
                </Link>
            </div>
        ))}
    </>
}