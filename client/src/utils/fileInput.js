import Swal from "sweetalert2";

export const fileInput = ( uploadFile ) =>
    Swal.fire({
        title: 'Upload a file', html: '<input type="file" id="file-input" />', confirmButtonText: 'Upload',
        preConfirm: () => {
            const inputFile = document.getElementById('file-input');
            if (inputFile.files.length === 0) {
                Swal.showValidationMessage('Please select a file');
            }
            return { file: inputFile.files[0] };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('image', result.value.file);
            uploadFile(formData);
        }
    });