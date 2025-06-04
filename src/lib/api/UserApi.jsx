export const userLogin = async ({identifier, password}) =>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            identifier,
            password
        })
    })
}

export const userStudentDetail = async (token) =>{
    return await fetch(`${import.meta.env.VITE_API_URL}/users/student/detail`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}