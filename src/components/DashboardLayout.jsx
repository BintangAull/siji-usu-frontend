import {Link, Outlet} from "react-router";

export default function DashboardLayout() {
    return <>
        <div className="gradient-bg min-h-screen flex flex-col">
            <header className="bg-brown-dark/90 backdrop-blur-sm shadow-custom">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/dashboard" className="flex items-center hover:opacity-90 transition-all duration-300 transform hover:scale-105">
                        <i className="fas fa-university text-cream text-2xl mr-3"></i>
                        <div className="text-cream font-bold text-xl">SIJI USU ZEUS</div>
                    </Link>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/dashboard/students/profile"
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

            <main className="container mx-auto px-6 py-8 flex-grow">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-custom border border-beige p-6 animate-fade-in">

                    <Outlet/>

                </div>

                <div className="mt-10 mb-6 text-center text-brown-light text-sm animate-fade-in">
                    <p>© 2025 SIJI USU ZEUS. All rights reserved.</p>
                </div>
            </main>
        </div>

    </>
}