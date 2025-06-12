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