export const coursesTaken = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/students`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const coursesAvail = async (token, {name}) =>{
    const url = new URL(`${import.meta.env.VITE_API_PATH}/students/courses/sections`)
    if(name){url.searchParams.append('name', name)}

    return await fetch(url,{
        method : "GET",
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

export const enrollCourse = async (token, {section_id}) =>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/students/courses/sections`, {
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

export const studentList = async (token, {id}) => {

    const url = new URL(`${import.meta.env.VITE_API_PATH}/admins/users/lecturers`)
    if(id){url.searchParams.append('id', id)}

    return await fetch(url,{
        method : "GET",
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}