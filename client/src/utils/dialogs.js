import Swal from "sweetalert2";

export const askForAuthorization_DialogFire = () => {
    Swal.fire({
        title: 'You are not authorized!',
        text: "Do you want to sign in?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, login!',
        customClass: {
            confirmButton: 'swal-button--white-text',
            cancelButton: 'swal-button--white-text'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/login';
        }
    });
}
