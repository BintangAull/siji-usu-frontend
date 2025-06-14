import {useState} from "react";
import {studentRegister} from "../../../../lib/api/StudentApi.jsx";
import {alertError, alertSuccess} from "../../../../lib/alert.js";
import {useNavigate} from "react-router";

export default function StudentRegister() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nim, setNim] = useState('')
    const [major_id, setMajor] = useState(null)
    const [academic_advisor_id, setAcademicAdvisor] = useState(0)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await studentRegister()
        const responseBody = await response.json()
        console.log(responseBody)
        if(response.status === 201) {
            await alertSuccess("Register student berhasil Berhasil")
            navigate('/dashboard/admin/user/student')
        }else {
            await alertError("Register student gagal, cek kembali data anda, back end no info")
        }

    }

    return<>
        <div className="min-h-screen flex items-center justify-center px-4 gradient-bg">
            <div
                className="animate-fade-in bg-brown-dark/90 p-8 rounded-xl shadow-custom border-2 border-dashed border-gray-700 backdrop-blur-sm w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mb-4 shadow-lg">
                        <i className="fas fa-user-plus text-3xl text-white"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-cream">Universitas Gabisa Ngajar</h1>
                    <p className="text-beige mt-2">Create a new account for a Student</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-beige text-sm font-medium mb-2">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-envelope text-amber-400"></i>
                            </div>
                            <input type="email" id="email" name="email"
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Create a new Email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-beige text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-user text-amber-400"></i>
                            </div>
                            <input type="text" id="name" name="name"
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Enter your full name" required value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-beige text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-lock text-amber-400"></i>
                            </div>
                            <input type="password" id="password" name="password"
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Create a password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nip" className="block text-beige text-sm font-medium mb-2">Nim</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-id-card text-amber-400"></i>
                            </div>
                            <input type="text" id="nip" name="nip"
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Create a Nim" required value={nim} onChange={(e) => setNim(e.target.value)}/>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="nidn" className="block text-beige text-sm font-medium mb-2">Major Id</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-id-card text-amber-400"></i>
                            </div>
                            <input type="number" id="nidn" name="nidn"
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Fill the major id" required value={major_id} onChange={(e) => setMajor(Number(e.target.value) )}/>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="department" className="block text-beige text-sm font-medium mb-2">Academic Advisor Id</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-building text-amber-400"></i>
                            </div>
                            <input type="number" id="department" name="department"
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Fill the department id" required value={academic_advisor_id} onChange={(e) => setAcademicAdvisor(Number(e.target.value) )}/>
                        </div>
                    </div>

                    <div className="mb-6">
                        <button type="submit"
                                className="w-full bg-gradient-to-r from-amber-600 to-amber-400 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                            <i className="fas fa-user-plus mr-2"></i> Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}