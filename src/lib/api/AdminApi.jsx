export const adminDetail = async (token) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/admin`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

}

export const lecturerList = async (token, {id}) => {
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

