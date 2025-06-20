import {Link, useParams} from "react-router";
import {useEffectOnce, useLocalStorage} from "react-use";
import {sectionList} from "../../../../lib/api/Course.jsx";
import {useState} from "react";
import {alertError} from "../../../../lib/alert.js";

export default function SectionDashboard() {
    const {id} = useParams();
    const [token, _] = useLocalStorage('access_token', '')

    const [sections, setSections] = useState({})

    async function fetchSection(token, {id}) {
        const response = await sectionList(token, {id})
        if (response.status === 200) {
            const responseBody = await response.json()
            setSections(responseBody)
        }else {
            await alertError("gatau eror nya apa back end ga set pesan eror")
        }
    }

    useEffectOnce(() => {
        fetchSection(token, {id})
            .then(() => console.log("sukses fetch section"))
    })

    return <>
        <div className="flex items-center mb-6">
            <a href={`/dashboard/admin/academic/major/${id}`}
               className="text-gray-900 hover:text-brown-dark mr-4 flex items-center transition-colors duration-200">
                <i className="fas fa-arrow-left mr-2"></i> Back to Major
            </a>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <i className="fas fa-user-edit text-brown-dark mr-3"></i> Create New Section
            </h1>
        </div>

        <div
            className="bg-brown-dark/90 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
            <Link to={`/dashboard/admin/academic/major/${id}/newSection`} className="block p-6 h-full">
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <div
                        className="w-20 h-20 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                        <i className="fas fa-user-plus text-3xl text-white"></i>
                    </div>
                    <h2 className="text-xl font-semibold text-cream mb-3">Create New Section</h2>
                    <p className="text-beige">Add a New Section</p>
                </div>
            </Link>
        </div>

        {sections.course_sections && sections.course_sections.map((section) => (
            <div key={section.id}
                 className="bg-brown-dark/90 m-3 rounded-xl shadow-custom border-2 border-dashed border-gray-700 overflow-hidden card-hover animate-fade-in">
                <div className="p-6">
                    <Link to="#"
                          className="block cursor-pointer hover:bg-brown-light/30 rounded-lg transition-all duration-200 p-3">
                        <div className="flex items-center mb-3">
                            <div
                                className="w-10 h-10 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <i className="fas fa-user text-white"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-cream hover:text-amber-300 transition-colors duration-200">
                                {section.name}
                            </h2>
                        </div>
                    </Link>


                </div>
            </div>
        ))}

    </>
}