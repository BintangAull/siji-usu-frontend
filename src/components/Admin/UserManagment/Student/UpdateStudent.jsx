// noinspection JSIgnoredPromiseFromCall

import {useState} from "react";
import {studentUpdate} from "../../../../lib/api/StudentApi.jsx";
import {alertError, alertSuccess} from "../../../../lib/alert.js";
import {useNavigate, useParams} from "react-router";
import {useEffectOnce, useLocalStorage} from "react-use";

export default function UpdateStudent() {
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nim, setNim] = useState('')
    // const [lecturers, setLecturers] = useState([{}])
    // const [academic_advisor_id, setAcademicAdvisorId] = useState("")
    const [token, _] = useLocalStorage('access_token', '')
    const {id} = useParams();

    async function getLecturers() {
        let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/users/lecturers`)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()
        console.log(data)
    }

    async function getStudent(id) {
        let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/users/students/${id}`)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()

        console.log(data)

        setName(data.name)
        setEmail(data.email)
        setNim(data.nim)
        // setAcademicAdvisorId(data.academic_advisor.id)
    }

    useEffectOnce(() => {
        getStudent(id)
        getLecturers()
    });


    async function handleSubmit(e) {
        e.preventDefault()

        // let advisorId_academic = Number(academic_advisor_id)

        const response = await studentUpdate(token, id, {name, email, nim})
        if(response.status === 204) {
           await alertSuccess("Update Berhasil")
            navigate('/dashboard/admin/user/student')
        }else {
           await alertError("Update Gagal, Cek Kembali Data Anda, back end no info")
        }

    }

    return <>
        <div className="flex items-center mb-6">
            <a href="/dashboard/admin/user/student/"
               className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back
            </a>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-user-edit text-brown-dark mr-3"></i> Edit Student info
            </h1>
        </div>

        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
            <div className="p-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="first_name" className="block text-beige text-sm font-medium mb-2">
                                Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user-tag text-amber-400"></i>
                                </div>
                                <input type="text" id="first_name" name="first_name" value={name} onChange={(e) => setName(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                       placeholder="Enter first name" required/>
                            </div>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block text-beige text-sm font-medium mb-2">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-envelope text-amber-400"></i>
                            </div>
                            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Enter email address"  required/>
                        </div>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="Nim" className="block text-beige text-sm font-medium mb-2">Nim</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-id-card text-amber-400"></i>
                            </div>
                            <input type="text" id="Nim" name="Nim" value={nim} onChange ={(e) => setNim(e.target.value)}
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Enter A new Nim"  required/>
                        </div>
                    </div>

                    {/*<div className="mb-6">*/}
                    {/*    <label htmlFor="Academic_advisor" className="block text-beige text-sm font-medium mb-2">Academic Advisor</label>*/}
                    {/*    <div className="relative">*/}
                    {/*        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">*/}
                    {/*            <i className="fas fa-user-tag text-amber-400"></i>*/}
                    {/*        </div>*/}
                    {/*        <input type="number" id="Academic_advisor" name="Academic_advisor" value={academic_advisor_id} onChange ={(e) => setAcademicAdvisorId(Number(e.target.value))}*/}
                    {/*               className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"*/}
                    {/*               placeholder="Enter Academic Advisor id"  required/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="flex justify-end space-x-4">
                        <a href="/dashboard/admin/user/student/"
                           className="px-5 py-3 bg-brown-light/50 text-cream rounded-lg hover:bg-brown-light/70 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 flex items-center shadow-md">
                            <i className="fas fa-times mr-2"></i> Cancel
                        </a>
                        <button type="submit"
                                className="px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                            <i className="fas fa-save mr-2"></i> Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}