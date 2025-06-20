import { useEffect, useState } from "react";
import { lecturerRegister } from "../../../../lib/api/LecturerApi.jsx";
import { useLocalStorage } from "react-use";
import { useNavigate } from "react-router";
import { alertError, alertSuccess } from "../../../../lib/alert.js";

export default function LecturerRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nip, setNip] = useState('');
    const [nidn, setNidn] = useState('');
    const [token] = useLocalStorage('access_token', '');
    const navigate = useNavigate();

    const [faculties, setFaculties] = useState([]);
    const [faculty_id, setFacultyId] = useState('');
    const [departments, setDepartments] = useState([]);
    const [department_id, setDepartmentId] = useState('');

    useEffect(() => {
        getFaculties();
    }, []);

    async function getFaculties() {
        try {
            const url = new URL(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties`);
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const responseBody = await response.json();

            setFaculties(responseBody);

            if (responseBody.length > 0) {
                setFacultyId(responseBody[0].id);
                setDepartments(responseBody[0].departments);
            }
        } catch (error) {
            console.error("Error fetching faculties:", error);
        }
    }

    function getDepartmentsByFacultyId(facultyId) {
        const selectedFaculty = faculties.find(fac => fac.id === facultyId);
        if (selectedFaculty) {
            setDepartments(selectedFaculty.departments || []);
        } else {
            setDepartments([]);
        }
        setDepartmentId(''); // reset department setiap ganti faculty
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!department_id) {
            alertError("Department belum dipilih");
            return;
        }

        const payload = { name, email, password, nip, nidn, department_id };

        const response = await lecturerRegister(token, payload);
        if (response.status === 201) {
            await alertSuccess("Register Berhasil");
            navigate('/dashboard/admin/user/lecturer');
        } else {
            await alertError("Register Gagal, Cek Kembali Data Anda");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 gradient-bg">
            <div className="animate-fade-in bg-brown-dark/90 p-8 rounded-xl shadow-custom border-2 border-dashed border-gray-700 backdrop-blur-sm w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-block p-3 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full mb-4 shadow-lg">
                        <i className="fas fa-user-plus text-3xl text-white"></i>
                    </div>
                    <h1 className="text-3xl font-bold text-cream">Universitas Gabisa Ngajar</h1>
                    <p className="text-beige mt-2">Create a new account for a Lecturer</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        icon="fas fa-envelope"
                        placeholder="Create a new Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Name */}
                    <InputField
                        id="name"
                        label="Full Name"
                        type="text"
                        icon="fas fa-user"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* Password */}
                    <InputField
                        id="password"
                        label="Password"
                        type="password"
                        icon="fas fa-lock"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Nip */}
                    <InputField
                        id="nip"
                        label="Nip"
                        type="text"
                        icon="fas fa-id-card"
                        placeholder="Create a Nip"
                        value={nip}
                        onChange={(e) => setNip(e.target.value)}
                    />

                    {/* Nidn */}
                    <InputField
                        id="nidn"
                        label="Nidn"
                        type="text"
                        icon="fas fa-id-card"
                        placeholder="Create a new nidn"
                        value={nidn}
                        onChange={(e) => setNidn(e.target.value)}
                    />

                    {/* Faculty */}
                    <div className="mb-4">
                        <label htmlFor="faculties" className="block text-beige text-sm font-medium mb-2">Faculty</label>
                        <select
                            id="faculties"
                            name="faculties"
                            className="w-full pl-3 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                            required
                            value={faculty_id}
                            onChange={(e) => {
                                const id = parseInt(e.target.value);
                                setFacultyId(id);
                                getDepartmentsByFacultyId(id);
                            }}
                        >
                            <option value="" disabled>-- Select Faculty --</option>
                            {faculties.map((fac) => (
                                <option key={fac.id} value={fac.id}>{fac.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Department */}
                    <div className="mb-4">
                        <label htmlFor="department" className="block text-beige text-sm font-medium mb-2">Department</label>
                        <select
                            id="department"
                            name="department"
                            className="w-full pl-3 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                            required
                            value={department_id}
                            onChange={(e) => setDepartmentId(parseInt(e.target.value))}
                        >
                            <option value="" disabled>-- Select Department --</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>{dept.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit */}
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-amber-600 to-amber-400 text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
                        >
                            <i className="fas fa-user-plus mr-2"></i> Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Komponen kecil untuk input field biar bersih
function InputField({ id, label, type, icon, placeholder, value, onChange }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-beige text-sm font-medium mb-2">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className={`${icon} text-amber-400`}></i>
                </div>
                <input
                    type={type}
                    id={id}
                    name={id}
                    className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                    placeholder={placeholder}
                    required
                    value={value}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}
