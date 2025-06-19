export const adminDetail = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

export const lecturerList = async (token, {id}) => {
    let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/users/lecturers`)
    if(id){
        url = `${import.meta.env.VITE_API_PATH}/admins/users/lecturers/${id}`
    }

    return await fetch(url,{
        method : "GET",
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

export const facultyList = async (token, {id}) => {
    let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties`)
    if(id){
        url = `${import.meta.env.VITE_API_PATH}/admins/academic/faculties/${id}`
    }
    return await fetch(url,{
        method : "GET",
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateFaculty = async (token, id, {name, faculty_code}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            faculty_code
        })
    })
}


export const facultyRegister = async (token,{name, faculty_code}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            faculty_code
        })
    })
}

export const majorList = async (token, {id,name}) => {
    let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties/majors`)
    if(id){
        url = `${import.meta.env.VITE_API_PATH}/admins/academic/faculties/majors/${id}`
    }

    if (name){
        url.searchParams.append('name', name)
    }
    return await fetch(url,{
        method : "GET",
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const updateMajor = async (token, id, {name, major_code}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties/majors/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            major_code
        })
    })
}

export const majorRegister = async (token,id, {name, major_code}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/faculties/${id}/majors`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            major_code
        })
    })
}

export const createRoom = async (token, id,{name}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/departments/${id}/rooms`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name
        })
    })
}

export const roomList = async (token, {id}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/departments/${id}/rooms`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}


export const updateRoom = async (token, id, room_id,{name}) => {
    return await fetch (`${import.meta.env.VITE_API_PATH}/admins/academic/departments/${id}/rooms/${room_id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: name
        })
    })
}