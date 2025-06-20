import {useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {useNavigate, useParams} from "react-router";
import {getSectionById, updateSection} from "../../../../lib/api/Course.jsx";
import {alertError, alertSuccess} from "../../../../lib/alert.js";
import {roomList} from "../../../../lib/api/AdminApi.jsx";

export default function EditSection() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [token, _] = useLocalStorage('access_token', '')
    const {section_id} = useParams()
    const [room_id, setRoomId] = useState('')
    const [course_name, setCourseName] = useState('')
    const [course_id, setCourseId] = useState('')
    const [rooms, setRooms] = useState([])

    async function getRooms(token, major_id) {
        const response = await roomList(token, {id: major_id})
        const data = await response.json()
        if (response.status === 200) {
            setRooms(data)
        } else {
            await alertError('Gagal Mengambil Data, back end no info')
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const response = await updateSection(token,{section_id, name, room_id})
        if (response.status === 200) {
         await alertSuccess('Update Berhasil')
            navigate(`/dashboard/admin/academic/major/${course_id}/section`)
        } else {
           await alertError('Update Gagal, Cek Kembali Data Anda, back end no info')
        }
    }

    async function getSection(token, section_id) {
        const response = await getSectionById(token, {section_id})
        const data = await response.json()
        if (response.status === 200) {
            setCourseName(data.course.name)
            setCourseId(data.course.id)
            setName(data.name)
            getRooms(token, data.course.major_id)
            if(data.room) {
                setRoomId(data.room?.id)
            }
        } else {
            await alertError('Gagal Mengambil Data, back end no info')
        }
    }

    useEffectOnce(() => {
        getSection(token, section_id)
    })


    return <>


        <div className="flex items-center mb-6">
            <a href={`/dashboard/admin/academic/major/${course_id}/section`}
               className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back to
            </a>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-user-edit text-brown-dark mr-3"></i> Edit {course_name} Section
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
                                       placeholder="Enter Your Course Name" required/>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="rooms" className="block text-beige text-sm font-medium mb-2">Room</label>
                            <select
                                id="rooms"
                                name="room"
                                className="w-full pl-3 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                required
                                value={room_id}
                                onChange={(e) => {
                                    const id = parseInt(e.target.value);
                                    setRoomId(id);
                                }}
                            >
                                <option value="" disabled>-- Select Room --</option>
                                {rooms
                                    .sort((a, b) => a.name.localeCompare(b.name))
                                    .map((room) => (
                                    <option key={room.id} value={room.id}>{room.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div className="flex justify-end space-x-4">
                        <a href={`/dashboard/admin/academic/major/${course_id}/section`}
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