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
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

export const enrollCourse = async (token, {section_id}) =>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/students/courses/sections`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            section_id
        })
    })
}

export const studentList = async (token, {name}) => {

    let url = new URL(`${import.meta.env.VITE_API_PATH}/admins/users/students`)
    if(name){
       url = `${import.meta.env.VITE_API_PATH}/admins/users/students?name=${name}`
    }

    return await fetch(url,{
        method : "GET",
        headers:{
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

export const studentRegister= async (token,{name, email, password, year, nim, major_id, academic_advisor_id}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/users/students`, {
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
            year,
            nim,
            major_id,
            academic_advisor_id

        })
    })
}

// export const studentUpdate = async (token, id, {name, email, nim, academic_advisor_id}) => {
export const studentUpdate = async (token, id, {name, email, nim}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/users/students/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name,
            email,
            nim
        })
    })
}