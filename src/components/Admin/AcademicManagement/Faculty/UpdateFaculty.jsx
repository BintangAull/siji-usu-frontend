import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {useLocalStorage} from "react-use";
import {useNavigate} from "react-router";
import {updateFaculty} from "../../../../lib/api/AdminApi.jsx";

export default function UpdateFaculty() {
    const navigate = useNavigate()
    const {id} = useParams();
    const [name, setName] = useState('')
    const [faculty_code, setFacultyCode] = useState('')
    const [token, _] = useLocalStorage('access_token', '')

    async function getFaculty(id) {
        let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties/${id}`)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json()

        setName(data.name)
        setFacultyCode(data.code)
    }

    useEffect(() => {
        getFaculty(id)
    }, []);


    async function handleSubmit(e) {
        e.preventDefault()
       const response = await updateFaculty(token, id, {name, faculty_code})
       if(response.status === 204) {
           alert("Update Berhasil")
           navigate("/dashboard/admin/academic/faculty")
       }else {
           alert("Update Gagal, Cek Kembali Data Anda, back end no info")
       }
    }

    return <>
        <div className="flex items-center mb-6">
            <a href="/dashboard/admin/academic/faculty"
               className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back to
            </a>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-user-edit text-brown-dark mr-3"></i> Edit Your Faculty info
            </h1>
        </div>

        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
            <div className="p-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="facultyName" className="block text-cream text-sm font-medium mb-2">
                                Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user-tag text-amber-400"></i>
                                </div>
                                <input type="text" id="facultyName" name="facultyName" value={name} onChange={(e) => setName(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                       placeholder="Enter Your New Faculty Name" required/>
                            </div>
                        </div>
                    </div>


                    <div className="mb-6">
                        <label htmlFor="faculty_code" className="block text-cream text-sm font-medium mb-2">Nidn</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-id-card text-amber-400"></i>
                            </div>
                            <input type="text" id="faculty_code" name="faculty_code" value={faculty_code} onChange ={(e) => setFacultyCode(e.target.value)}
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Replace your faculty code"  required/>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <a href="/dashboard/admin/academic/faculty"
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