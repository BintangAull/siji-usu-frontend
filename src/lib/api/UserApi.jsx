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

export const userUpdatePassword = async (token, {password, newPassword}) =>{
    return await fetch(`${import.meta.env.VITE_API_URL}/users/student/update-password`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            password,
            newPassword
        })
    })
}

export const userNewToken = async ({refresh_token}) =>{
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            refresh_token
        })
    })
}

export const userLogout = async (token,{refresh_token}) => {
    return await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            refresh_token
        })
    })
}

