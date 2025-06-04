import {userStudentDetail} from "../../lib/api/UserApi.jsx";
import {useEffect, useState} from "react";
import {useLocalStorage} from "react-use";
import {alertError} from "../../lib/alert.js";

export default function UserStudentProfile() {

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [nim, setNim] = useState('');
    const [faculty,setFaculty] = useState('');
    const [major, setMajor] = useState('');
    const [token,] = useLocalStorage('access_token', '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmitPassword(e) {
        e.preventDefault();

    }

    useEffect(() => {
        fetchUserStudentDetail();
    })

    async function fetchUserStudentDetail() {
        const response = await userStudentDetail(token);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200){
            setName(responseBody.name)
            setEmail(responseBody.email)
            setMajor(responseBody.major)
            setFaculty(responseBody.faculty)
            setNim(responseBody.nim)
        }else{
            alertError("gagal memuat data")
        }



    }



    return <>
        <div className="flex items-center mb-6">
            <i className="fas fa-user-cog text-blue-400 text-2xl mr-3"></i>
            <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                            <i className="fas fa-user text-white"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                    </div>

                    <div className="space-y-4">

                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Full Name</label>
                            <div className="text-white text-lg font-medium">{name}</div>
                        </div>


                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Email</label>
                            <div className="text-white text-lg">{email}</div>
                        </div>


                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Student ID (NIM)</label>
                            <div className="text-white text-lg">{nim}</div>
                        </div>


                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Faculty</label>
                            <div className="text-white text-lg">{faculty}</div>
                        </div>


                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Major</label>
                            <div className="text-white text-lg">{major}</div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                            <i className="fas fa-key text-white"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-white">Change Password</h2>
                    </div>
                    <form onSubmit={handleSubmitPassword}>
                        <div className="mb-5">
                            <label htmlFor="new_password" className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-gray-500"></i>
                                </div>
                                <input type="password" id="new_password" name="new_password" value={password} onChange={(e) => setPassword(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                       placeholder="Enter your new password" required/>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="confirm_password" className="block text-gray-300 text-sm font-medium mb-2">Confirm New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-check-double text-gray-500"></i>
                                </div>
                                <input type="password" id="confirm_password" name="confirm_password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                       placeholder="Confirm your new password" required/>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit"
                                    className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
                                <i className="fas fa-key mr-2"></i> Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
}