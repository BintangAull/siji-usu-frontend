import {Link} from "react-router";
import {useEffectOnce, useLocalStorage} from "react-use";
import {useEffect, useState} from "react";
import {majorList} from "../../../../lib/api/AdminApi.jsx";
import {alertError} from "../../../../lib/alert.js";

export default function MajorDashboard(){

    const [id, __] = useState("")
    const [reload, setReload] = useState(false)
    const [token, _] = useLocalStorage('access_token', '')
    const [majors, setMajors] = useState([])
    const [name, setName] = useState("")


    async function handleSubmit(e) {
        e.preventDefault();
        setReload(!reload)
    }

    async function fetchMajor() {
        let idMajor = Number(id)
        const response = await majorList(token,{id:idMajor,name})
        const responseBody = await response.json()
        console.log(responseBody)
        if (response.status === 200) {
            console.log(response.status)
            setMajors(responseBody)
        }else {
            await alertError("gatau eror nya apa back end ga set pesan eror")
        }
    }

    useEffect(() => {
        fetchMajor()
            .then(() => console.log("sukses fetch major"))
    },[reload])


    useEffectOnce(() => {
        const toggleButton = document.getElementById('toggleSearchForm');
        const searchFormContent = document.getElementById('searchFormContent');
        const toggleIcon = document.getElementById('toggleSearchIcon');

        // Add transition for smooth animation
        searchFormContent.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out';
        searchFormContent.style.overflow = 'hidden';
        searchFormContent.style.maxHeight = '0px';
        searchFormContent.style.opacity = '0';
        searchFormContent.style.marginTop = '0';


        function toggleSearchForm() {
            if (searchFormContent.style.maxHeight !== '0px') {
                // Hide the form
                searchFormContent.style.maxHeight = '0px';
                searchFormContent.style.opacity = '0';
                searchFormContent.style.marginTop = '0';
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            } else {
                // Show the form
                searchFormContent.style.maxHeight = searchFormContent.scrollHeight + 'px';
                searchFormContent.style.opacity = '1';
                searchFormContent.style.marginTop = '1rem';
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            }
        }

        toggleButton.addEventListener('click', toggleSearchForm);

        return ( () => {
            toggleButton.removeEventListener('click', toggleSearchForm);
        })
    })
    return<>

        <div className="flex items-center mb-6">
            <Link to="/dashboard/admin/academic"
                  className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-id-card text-brown-dark mr-3"></i> Details Major
            </h1>
        </div>



        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 p-6 mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <i className="fas fa-search text-amber-400 mr-3"></i>
                    <h2 className="text-xl font-semibold text-cream">Search Major</h2>
                </div>
                <button type="button" id="toggleSearchForm"
                        className="text-beige hover:text-cream hover:bg-brown-light/30 p-2 rounded-full focus:outline-none transition-all duration-200">
                    <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon"></i>
                </button>
            </div>
            <div id="searchFormContent" className="mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label
                                htmlFor="search_name"
                                className="block text-gray-300 text-sm font-medium mb-2"
                            >
                                Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-user text-amber-400" />
                                </div>
                                <input
                                    type="text"
                                    id="search_name"
                                    name="search_name"
                                    className="w-full pl-10 pr-3 py-3 bg-brown-light/30 border border-gray-600 text-cream rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                                    placeholder="Search by name"
                                    value={name} onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mt-5 text-right">
                        <button type="submit"
                                className="px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                            <i className="fas fa-search mr-2"></i> Search
                        </button>
                    </div>
                </form>
            </div>
        </div>



        <div>
            <br/>
        </div>


        {majors
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((major) => (
            <div key={major.id}
                 id={major.id}
                 className="mb-4 bg-brown-dark/90 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                <Link to={`/dashboard/admin/academic/major/${major.id}`}
                      className="block cursor-pointer hover:bg-brown-light/30 rounded-lg transition-all duration-200 p-3">

                <div className="p-6">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">{major.name}
                            </h2>
                        </div>
                        <div className="space-y-3 text-beige ml-2">
                            <p className="flex items-center">
                                <i className="fas fa-envelope text-amber-400 w-6"></i>
                                <span className="font-medium w-24">Code</span>
                                <span>{major.code}</span>
                            </p>

                            {/*<h3>Faculty</h3>*/}
                            <p className="flex items-center">
                                <i className="fas fa-envelope text-amber-400 w-6"></i>
                                <span className="font-medium w-24">Faculty</span>
                                <span>{major.faculty.name}</span>
                            </p>

                            {/*{ major.rooms.length > 0 && (*/}
                            {/*    <>*/}
                            {/*        <h3>Room: </h3>*/}
                            {/*        <ul className="space-y-4">*/}
                            {/*            {[...major.rooms]  // membuat salinan array agar tidak mutasi state asli*/}
                            {/*                .sort((a, b) => a.name.localeCompare(b.name))  // sort berdasarkan nama*/}
                            {/*                .map((room) => (*/}
                            {/*                    <li key={room.id} className="block">*/}
                            {/*                        <div className="flex flex-col space-y-2">*/}
                            {/*                            <p className="flex items-center">*/}
                            {/*                                <span>- {room.name}</span>*/}
                            {/*                            </p>*/}
                            {/*                        </div>*/}
                            {/*                    </li>*/}
                            {/*                ))}*/}
                            {/*        </ul>*/}

                            {/*    </>*/}
                            {/*) }*/}
                        </div>

                    <div className="mt-4 flex justify-end space-x-3">
                        <Link to={`/dashboard/admin/academic/major/${major.id}/edit`}
                              className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-400 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-brown-dark transition-all duration-200 font-medium shadow-md flex items-center"
                        >
                            <i className="fas fa-edit mr-2" /> Edit
                        </Link>

                    </div>
                </div>
                </Link>

            </div>
        ))}


    </>
}