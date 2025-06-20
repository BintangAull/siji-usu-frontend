import {Link, useParams} from "react-router";
import {useState} from "react";
import {useEffectOnce, useLocalStorage} from "react-use";
import {roomList} from "../../../../lib/api/AdminApi.jsx";
import {alertError} from "../../../../lib/alert.js";

export default function  RoomDashboard(){

    const {id} =useParams()
    const [token, _] = useLocalStorage("access_token", "")

    const [rooms, setRooms] = useState([])

    async function fetchRooms() {
        const response = await roomList(token, {id})
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            setRooms(responseBody)
        }else {
           await alertError("gatau eror nya apa back end ga set pesan eror")
        }
    }

    useEffectOnce(() => {
        fetchRooms()
            .then(() => console.log("sukses fetch faculty"))
    })

    return  <>

        <div className="flex items-center mb-6">
            <Link to={`/dashboard/admin/academic/faculty/${id}/department`}
                  className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-id-card text-brown-dark mr-3"></i>List Rooms
            </h1>
        </div>




        {rooms.map((room) => (
                <div key={room.id}
                     className="bg-brown-dark/90 m-3 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                    <div className="p-6">
                        <div
                              className="block  rounded-lg transition-all duration-200 p-3">
                            <div className="flex items-center mb-3">
                                <div
                                    className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                    <i className="fas fa-user text-white"></i>
                                </div>
                                <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">{room.name}
                                </h2>
                            </div>
                            {/*<div className="space-y-3 text-beige ml-2">*/}
                            {/*    <p className="flex items-center">*/}
                            {/*        <i className="fas fa-envelope text-amber-400 w-6"></i>*/}
                            {/*        <span className="font-medium w-24">Code :</span>*/}
                            {/*        <span>{room.id}</span>*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>

                        <div className="mt-4 flex justify-end space-x-3">
                            <Link to={`/dashboard/admin/academic/department/${id}/room/${room.id}/edit`}
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