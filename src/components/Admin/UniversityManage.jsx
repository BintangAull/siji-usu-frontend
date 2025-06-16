import {Link} from "react-router";

export default function UniversityManage() {
    return <>


        <div className="flex items-center mb-6">
            <Link to="/dashboard/admin"
                  className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back to Dashboard Admin
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-id-card text-brown-dark mr-3"></i> Details Academic Management
            </h1>
        </div>

        <div
        className="bg-brown-dark/90 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
        <Link to="/dashboard/admin/academic/faculty" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
                <div
                    className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                    <i className="fas fa-building text-3xl text-white"></i>
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">Faculty</h2>
                <p className="text-gray-300">Manage Your Faculty</p>
            </div>
        </Link>
    </div>


        <div>
            <br/>
        </div>

        <div
            className="bg-brown-dark/90 bg-opacity-80  rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to="/dashboard/admin/academic/major" className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-graduation-cap text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3">Major</h2>
                    <p className="text-gray-300">Manage Your Major University</p>
                </div>
            </Link>
        </div>


        <div>
            <br/>
        </div>



        <div
            className="bg-brown-dark/90 bg-opacity-80  rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to="/dashboard/admin/user" className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-book-skull text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-3">Courses</h2>
                    <p className="text-gray-300">Manage Your University Courses</p>
                </div>
            </Link>
        </div>
    </>
}