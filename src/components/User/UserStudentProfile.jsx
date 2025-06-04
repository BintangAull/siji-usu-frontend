import {userStudentDetail, userUpdatePassword} from "../../lib/api/UserApi.jsx";
import {useEffect, useState} from "react";
import {useLocalStorage} from "react-use";
import {alertError, alertSuccess} from "../../lib/alert.js";
import {useNavigate} from "react-router";
import checkAndRefreshToken from "../../lib/CheckToken.js";

export default function UserStudentProfile() {

    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [nim, setNim] = useState('');
    const [faculty,setFaculty] = useState('');
    const [major, setMajor] = useState('');
    const [token, setToken] = useLocalStorage('access_token', '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [dosenPa, setDosenPa] = useState('');
    const [refresh_token, _] = useLocalStorage('refresh_token', '');
    const navigate = useNavigate();



    async function handleSubmitPassword(e) {
        e.preventDefault();
        if(password !== confirmPassword){
           await alertError("Password not match, please try again")
            return;
        }

        // cek token nya dulu bos
        const tokenStatus = await checkAndRefreshToken(token, refresh_token);

        if(tokenStatus.needsLogin){
            await alertError("Token expired, please login again");
            navigate({
                pathname: "/login",
            })
            return;
        }
        if (tokenStatus.isValid){
            // simpen di localstorage update token baru
            if (tokenStatus.token !== token){
                setToken(tokenStatus.token);
            }
        }

        const response = await userUpdatePassword(token,{password,confirmPassword});
        if(response.status === 200){
            await alertSuccess("Password berhasil diubah");
            setPassword('');
            setConfirmPassword('');
        }else{
            await alertError("Password gagal diubah");
        }

    }




    useEffect(() => {
        fetchUserStudentDetail()
            .then(()=> console.log("sukses"))
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
            setDosenPa(responseBody.academic_advisor.name)
        }else{
            alertError("gagal memuat data")
        }



    }



    return <>
        <div className="flex items-center mb-6">
            <i className="fas fa-user-cog text-brown-dark text-2xl mr-3"></i>
            <h1 className="text-2xl font-bold text-brown-dark">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Information Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-custom border border-beige overflow-hidden card-hover animate-fade-in">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-brown-light rounded-full flex items-center justify-center mr-3 shadow-md">
                            <i className="fas fa-user text-cream"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-brown-dark">Profile Information</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-brown-light text-sm mb-1">Full Name</label>
                            <div className="text-brown-dark text-lg font-medium">{name}</div>
                        </div>

                        <div>
                            <label className="block text-brown-light text-sm mb-1">Email</label>
                            <div className="text-brown-dark text-lg">{email}</div>
                        </div>

                        <div>
                            <label className="block text-brown-light text-sm mb-1">Student ID (NIM)</label>
                            <div className="text-brown-dark text-lg">{nim}</div>
                        </div>

                        <div>
                            <label className="block text-brown-light text-sm mb-1">Faculty</label>
                            <div className="text-brown-dark text-lg">{faculty}</div>
                        </div>

                        <div>
                            <label className="block text-brown-light text-sm mb-1">Major</label>
                            <div className="text-brown-dark text-lg">{major}</div>
                        </div>

                        <div>
                            <label className="block text-brown-light text-sm mb-1">Dosen Pembimbing</label>
                            <div className="text-brown-dark text-lg">{dosenPa}</div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-custom border border-beige overflow-hidden card-hover animate-fade-in">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-brown-light rounded-full flex items-center justify-center mr-3 shadow-md">
                            <i className="fas fa-key text-cream"></i>
                        </div>
                        <h2 className="text-xl font-semibold text-brown-dark">Change Password</h2>
                    </div>
                    <form onSubmit={handleSubmitPassword}>
                        <div className="mb-5">
                            <label htmlFor="new_password" className="block text-brown-light text-sm font-medium mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-brown-light"></i>
                                </div>
                                <input type="password"
                                       id="new_password"
                                       name="new_password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-cream/50 border border-beige text-brown-dark rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-brown-light focus:border-transparent
                                        transition duration-200"
                                       placeholder="Enter your new password"
                                       required/>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="confirm_password" className="block text-brown-light text-sm font-medium mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-check-double text-brown-light"></i>
                                </div>
                                <input type="password"
                                       id="confirm_password"
                                       name="confirm_password"
                                       value={confirmPassword}
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                       className="w-full pl-10 pr-3 py-3 bg-cream/50 border border-beige text-brown-dark rounded-lg
                                        focus:outline-none focus:ring-2 focus:ring-brown-light focus:border-transparent
                                        transition duration-200"
                                       placeholder="Confirm your new password"
                                       required/>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit"
                                    className="w-full bg-brown-dark text-white py-3 px-4 rounded-lg
                                     hover:bg-brown-light focus:outline-none focus:ring-2
                                     focus:ring-brown-light focus:ring-offset-2
                                     focus:ring-offset-white transition-all duration-200
                                     font-medium shadow-lg transform hover:scale-105
                                     flex items-center justify-center">
                                <i className="fas fa-key mr-2"></i> Update Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    </>
}