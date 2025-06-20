export const createCourse = async (token, {id, name}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/majors/${id}/courses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name
        })
    })
}

export const courseList = async (token, {id}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admins/academic/majors/${id}/courses`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}
