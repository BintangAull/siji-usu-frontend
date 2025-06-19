import {Link, Outlet} from "react-router";
import {useLocalStorage} from "react-use";
import {jwtDecode} from "jwt-decode";
import {useEffect} from "react";



export default function DashboardLayout() {

    const [token, _] = useLocalStorage('access_token', '');
    const [userRole, setUserRole] = useLocalStorage('role', '');



    useEffect(() => {
        if(token){
            const decoded = jwtDecode(token);
            setUserRole(decoded.role)
        }
    })

    //fungsi ambil role untuk href

    const getBaseUrl = () => {
        if (userRole === 'Admin'){
            return 'admin'
        }else if (userRole === 'Lecturer'){
            return 'lecturer'
        } else if (userRole === 'Student'){
            return 'students'
        }

    }


    


    return <>
        <div className="gradient-bg min-h-screen flex flex-col">
            <header className="bg-brown-dark/90 backdrop-blur-sm shadow-custom">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to={`/dashboard/${getBaseUrl()}`} className="flex items-center hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                        <i className="fas fa-university text-cream text-2xl mr-3"></i>
                        <div className="text-cream font-bold text-xl">SIJI USU ZEUS</div>
                    </Link>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to= {`/dashboard/${getBaseUrl()}/profile`}
                                      className="text-beige hover:text-cream flex items-center transition-all duration-300
                                       hover:transform hover:scale-105">
                                    <i className="fas fa-user-circle mr-2"></i>
                                    <span className="font-medium">Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/students/logout"
                                      className="text-beige hover:text-cream flex items-center transition-all duration-300
                                       hover:transform hover:scale-105">
                                    <i className="fas fa-sign-out-alt mr-2"></i>
                                    <span className="font-medium">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 flex-grow">

                <Outlet/>

                <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
                    <p>© 2025 Contact Management. All rights reserved.</p>
                </div>
            </main>
        </div>

    </>
}