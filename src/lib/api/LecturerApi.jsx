export const coursesTaught = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/lecturers`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const sectionsAvailTaught = async (token, {name}) =>{
    const url = new URL(`${import.meta.env.VITE_API_PATH}/lecturers/courses/sections`)

    if(name){url.searchParams.append('name', name)}

    return await fetch(url,{
        method : "GET",
        headers:{
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const enrollCourseTaught = async (token, {section_id}) =>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/lecturers/courses/sections`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            section_id
        })
    })
}

export const lecturerRegister = async (token,{name, email, password, nip, nidn, department_id}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/users/lecturers`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            password,
            nip,
            nidn,
            department_id
        })
    })
}

export const updateLecturer = async (token, id, {name, email, nip, nidn}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/users/lecturers/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            nip,
            nidn
        })
    })
}