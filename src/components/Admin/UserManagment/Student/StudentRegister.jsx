import {useEffect, useState} from "react";
import {studentRegister} from "../../../../lib/api/StudentApi.jsx";
import {alertError, alertSuccess} from "../../../../lib/alert.js";
import {useNavigate} from "react-router";
import {useEffectOnce, useLocalStorage} from "react-use";

export default function StudentRegister() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nim, setNim] = useState('')
    const [year, setYear] = useState('')
    const [faculties, setFaculties] = useState([{}])
    const[faculty_id, setFacultyId] = useState(null)
    const [departments, setDepartments] = useState([{}])
    const[major_id, setMajorId] = useState(null)
    const [academic_advisor_id, setAcademicAdvisorId] = useState(0)
    const navigate = useNavigate();
    const [lecturers, setLecturers] = useState([{}])

    const [token, _] = useLocalStorage('access_token', '')

    async function getFaculties() {
        let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties`)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const responseBody = await response.json()
        setFaculties(responseBody)

        if (responseBody.length > 0) {
            const defaultFacultyId = responseBody[0].id
            setFacultyId(defaultFacultyId)

            const department = responseBody[0].departments
            setDepartments(department)

            if(department.length > 0) {
                // setAcademicAdvisorId(department.)
            }
        }

    }

    async function getDepartments(faculty_id) {
        const faculty = faculties.find(f => f.id === faculty_id)
        if (faculty && faculty.departments.length > 0) {
            setDepartments(faculty.departments)
            const defaultMajor = faculty.departments[0]
            setMajorId(defaultMajor.id)
        } else {
            setDepartments([])
            setMajorId(null)
        }
    }

    async function getLecturers(department_id) {
        let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/users/lecturers/departments/${department_id}`)

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const responseBody = await response.json()

        setLecturers(responseBody)

        if (responseBody.length > 0) {
            setAcademicAdvisorId(responseBody[0].id)
        } else {
            setAcademicAdvisorId(0)
        }
    }

    useEffect(() => {
        if (faculty_id !== null) {
            getDepartments(faculty_id)
                .then(() => console.log(departments))

        }
    }, [faculty_id])

    useEffect(() => {
        if (major_id !== null) {
            getLecturers(major_id)
             .then(() => console.log(lecturers))
        }
    }, [major_id])

    useEffectOnce(() => {
        getFaculties()
            .then(() => console.log(departments))
    }, []);


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await studentRegister(token, {name, email, password, year, nim, major_id, academic_advisor_id})
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
                        <label htmlFor="year" className="block text-beige text-sm font-medium mb-2">Year</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-id-card text-amber-400"></i>
                            </div>
                            <input type="text" id="year" name="year"
                                   className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                   placeholder="Create a Nim" required value={year} onChange={(e) => setYear(parseInt(e.target.value))}/>
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
                        <label htmlFor="faculties" className="block text-beige text-sm font-medium mb-2">Faculty</label>
                        <select
                            id="faculties"
                            name="faculties"
                            className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                            required
                            value={faculty_id}
                            onChange={(e) => {
                                const id = e.target.value;
                                setFacultyId(parseInt(id))
                                getDepartments(parseInt(id))
                            }}
                        >
                            <option value="" disabled>-- Select Department --</option>
                            {faculties.map((fac) => (
                                <option key={fac.id} value={fac.id}>
                                    {fac.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="department" className="block text-beige text-sm font-medium mb-2">Major</label>
                        <select
                            id="department"
                            name="department"
                            className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                            required
                            value={major_id}
                            onChange={
                                (e) => {
                                    setMajorId(parseInt(e.target.value))
                                    getLecturers(parseInt(e.target.value))
                                }
                            }
                        >
                            <option value="" disabled>-- Select Department --</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="academic-advisor" className="block text-beige text-sm font-medium mb-2">Academic Advisor</label>
                        <select
                            id="academic-advisor"
                            name="academic-advisor"
                            className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 black rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                            required
                            value={academic_advisor_id}
                            onChange={
                                (e) => {
                                    setAcademicAdvisorId(parseInt(e.target.value))
                                }
                            }
                        >
                            <option value="" disabled>-- Select Department --</option>
                            {lecturers.map((lect) => (
                                <option key={lect.id} value={lect.id}>
                                    {lect.name}
                                </option>
                            ))}
                        </select>
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