// noinspection EqualityComparisonWithCoercionJS

import {useState} from "react";
import {useNavigate, useParams} from "react-router";
import {roomList, updateRoom} from "../../../../lib/api/AdminApi.jsx";
import {alertError, alertSuccess} from "../../../../lib/alert.js";
import {useEffectOnce, useLocalStorage} from "react-use";

export default function UpdateRoom() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const {id} = useParams()
    const {room_id} = useParams()
    const [token, _] = useLocalStorage('access_token', '')

    async function getRooms(token, id) {
        const response = await roomList(token, {id})
        const data = await response.json()
        console.log("Room id: ", data.map(room => room.id))
        console.log("Param room id: ", room_id)
        const room = data.find(room => room.id == room_id)
        if(room) {
            setName(room.name)
        } else {
            await alertError("Room Not Found")
        }
    }

    useEffectOnce(() => {
        getRooms(token, id)
    })

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await updateRoom(token,id, room_id, {name})
        console.log(response.status)
        if(response.status === 204) {
            await alertSuccess("Update Berhasil")
            navigate(`/dashboard/admin/academic/department/${id}/room`)
        }else {
            await alertError("Update Gagal, Cek Kembali Data Anda, back end no info")
        }
    }

    return <>
        <div className="flex items-center mb-6">
            <a href={`/dashboard/admin/academic/department/${id}/room`}
               className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back to
            </a>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-user-edit text-brown-dark mr-3"></i> Edit Your Room
            </h1>
        </div>

        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
            <div className="p-8">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="majorName" className="block text-cream text-sm font-medium mb-2">
                                Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user-tag text-amber-400"></i>
                                </div>
                                <input type="text" id="majorName" name="majorName" value={name} onChange={(e) => setName(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                       placeholder="Enter Your New classs Name" required/>
                            </div>
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