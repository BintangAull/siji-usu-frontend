import Swal from 'sweetalert2'

export const alertSuccess = async( message ) => {
    await Swal.fire({
        icon: 'success',
        title: 'success',
        text: message,
    })
}

export const alertError = async( message ) => {
    await Swal.fire({
        icon: 'error',
        title: 'error',
        text: message,
    })
}