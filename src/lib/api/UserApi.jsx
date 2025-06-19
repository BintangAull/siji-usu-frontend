export const userLogin = async ({identifier, password}) => {
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
    });
}


export const userStudentDetail = async (token) =>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/students`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}

export const userUpdatePassword = async (token, { oldPassword ,newPassword}) =>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/auth/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            old_password: oldPassword,
            new_password : newPassword,
        })
    })
}

export const userNewToken = async ({refresh_token}) =>{
    return await fetch(`${import.meta.env.VITE_API_PATH}/auth/refresh`, {
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
    return await fetch(`${import.meta.env.VITE_API_PATH}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            refresh_token
        })
    })
}



