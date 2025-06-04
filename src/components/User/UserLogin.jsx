import gambarKanan from "./gambarkanan.jpg";
import {useState} from "react";
import {useLocalStorage} from "react-use";
import {useNavigate} from "react-router";
import {alertError, alertSuccess} from "../../lib/alert.js";
import {Link} from 'react-router'
import {userLogin} from "../../lib/api/UserApi.jsx";
import {jwtDecode}  from "jwt-decode";

export default function UserLogin() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [_, setToken] = useLocalStorage('access_token', '');
    const [__, setRefreshToken] = useLocalStorage('refresh_token', '');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await userLogin({identifier, password});
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200){

            await alertSuccess("selamat datang");
            const token = responseBody.access_token;
            const refreshToken = responseBody.refresh_token;
            setToken(token);
            setRefreshToken(refreshToken);
            console.log(token);
            console.log(refreshToken);
            const decodedToken = jwtDecode(token);
            const userRole= decodedToken.role;

            switch (userRole){
                case "admin":
                    navigate('/dashboard/admin');
                    break;
                case "student":
                    navigate('/dashboard/student');
                    break;
                case "lecturer":
                    navigate('/dashboard/lecturer');
                    break;
            }

        }else{
            await alertError("login gagal");
        }
    }

    return <>
        <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
            <div
                className="flex w-full max-w-5xl bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-beige overflow-hidden">

                <div className="w-full md:w-1/2 p-8">

                    <div className="text-center mb-8">
                        <div
                            className="w-16 h-16 bg-brown-light rounded-full mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-brown-dark mb-2">Selamat Datang</h2>
                        <p className="text-brown-light">Silakan masuk ke akun Anda</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brown-dark mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-brown-light" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207">
                                        </path>
                                    </svg>
                                </div>
                                <input  type="email" id="email" name="identifier" placeholder="Masukkan email Anda" value={identifier} onChange={(e)=> setIdentifier(e.target.value)}
                                       className="block w-full pl-10 pr-3 py-3 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-light focus:border-transparent transition duration-200 bg-cream/50"
                                       required/>
                            </div>
                        </div>


                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-brown-dark mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-brown-light" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z">
                                        </path>
                                    </svg>
                                </div>
                                <input type="password" id="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)}
                                       placeholder="Masukkan password Anda"
                                       className="block w-full pl-10 pr-10 py-3 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-light focus:border-transparent transition duration-200 bg-cream/50"
                                       required/>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <button type="button"
                                            className="text-brown-light hover:text-brown-dark transition duration-200">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                       className="h-4 w-4 text-brown-light focus:ring-brown-light border-beige rounded"/>
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-brown-dark">
                                    Ingat saya
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link to="/not-found"
                                   className="font-medium text-brown-light hover:text-brown-dark transition duration-200">
                                    Lupa password?
                                </Link>
                            </div>
                        </div>


                        <div>
                            <button type="submit"
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brown-dark hover:bg-brown-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brown-light transition duration-200 transform hover:scale-105">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-white group-hover:text-cream transition duration-200" fill="none"
                   stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
                </path>
              </svg>
            </span>
                                Masuk
                            </button>
                        </div>


                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-beige"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-brown-light">Atau</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button type="button"  onClick={()=> navigate('not-found')}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-beige rounded-lg shadow-sm bg-white text-sm font-medium text-brown-dark hover:bg-cream transition duration-200">

                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor"
                                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor"
                                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor"
                                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>
                            <button type="button"  onClick={()=> navigate('not-found')}
                                    className="w-full inline-flex justify-center py-2 px-4 border border-beige rounded-lg shadow-sm bg-white text-sm font-medium text-brown-dark hover:bg-cream transition duration-200">

                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                                <span className="ml-2">Twitter</span>
                            </button>
                        </div>
                    </form>


                    <div className="mt-6 text-center">
                        <p className="text-sm text-brown-light">
                            Belum punya akun?
                            <Link to="/not-found"
                               className="font-medium text-brown-dark hover:text-brown-light transition duration-200">
                                Daftar sekarang
                            </Link>
                        </p>
                    </div>
                </div>


                <div className="md:block md:w-[75%]">
                    <img src={gambarKanan} alt="Login Image" className="h-full w-full object-cover"/>
                </div>
            </div>


        </div>
    </>
}