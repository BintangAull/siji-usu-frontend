import {Link} from "react-router";

export default function AdminDashboard() {


    return <>

        <div
            className="bg-brown-dark/90 bg-opacity-80  rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to="/dashboard/admin/user" className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-users-cog text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3">User Management</h2>
                    <p className="text-gray-300">Manage University Users</p>
                </div>
            </Link>
        </div>
        <div>
            <br/>
        </div>

        <div
            className="bg-brown-dark/90 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to="/dashboard/admin/academic" className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-pink-600 to-pink-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-book text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3">Academic Management</h2>
                    <p className="text-gray-300">Manage Your University</p>
                </div>
            </Link>
        </div>

    </>
}