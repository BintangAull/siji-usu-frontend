import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import {facultyList} from "../../../../lib/api/AdminApi.jsx";
import {alertError} from "../../../../lib/alert.js";


export default function DepartmentList() {
    const [faculties, setFaculties] = useState([
        {
            "id": 23,
            "name": "fasilkomti",
            "code": "87",
            "departments": [
                {
                    "id": 1,
                    "name": "ilmu komputer",
                    "code": "2314"
                },
                {
                    "id": 2,
                    "name": "ilmu gpt",
                    "code": "2315"
                }
            ]
        }
    ])
    const [reload, ___] = useState(false)
    const [token, _] = useState('')
    const [idDepartment, __ ] = useState('')
    const {id} = useParams()



    async function fetchDepartment() {
        const response = await facultyList(token, {idDepartment})
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setFaculties(responseBody)
        }else {
            await alertError("gatau eror nya apa back end ga set pesan eror")
        }
    }

    useEffect(() => {
        fetchDepartment()
            .then(() => console.log("sukses fetch faculty"))
    },[reload])



    return <>

        <div className="flex items-center mb-6">
            <Link to="/dashboard/admin/academic/faculty"
                  className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-id-card text-brown-dark mr-3"></i> Department List
            </h1>
        </div>


        <div
            className="m-3 bg-brown-dark/90 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to={`/dashboard/admin/academic/faculty/${id}/register`} className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-user-plus text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-cream mb-3">Create New Major</h2>
                    <p className="text-beige">Add a new Major</p>
                </div>
            </Link>
        </div>

        {faculties.map((faculty) => (
            faculty.departments.map((department) => (

                <div key={department.id}
                     className="bg-brown-dark/90 m-3 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <Link to={`/dashboard/admin/academic/department/${department.id}/room`}
                            className="block cursor-pointer hover:bg-brown-light/30 rounded-lg transition-all duration-200 p-3">
                            <div className="flex items-center mb-3">
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                    <i className="fas fa-user text-white"></i>
                                </div>
                                <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">{department.name}
                                </h2>
                            </div>
                            <div className="space-y-3 text-beige ml-2">
                                <p className="flex items-center">
                                    <i className="fas fa-envelope text-amber-400 w-6"></i>
                                    <span className="font-medium w-24">Code :</span>
                                    <span>{department.code}</span>
                                </p>
                            </div>
                        </Link>

                        <div className="mt-4 flex justify-end space-x-3">
                            <Link to={`/dashboard/admin/academic/department/${department.id}/create`}
                                  className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-md flex items-center"
                            >
                                <i className="fas fa-edit mr-2" /> Create New Rooms
                            </Link>

                        </div>
                    </div>
                </div>


            ))
        ))}

    </>
}