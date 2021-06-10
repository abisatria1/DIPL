import Swal from "sweetalert2"

export default {
  success(text) {
    Swal.fire({
      position: "top-end",
      title: "Success",
      text: text,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
    })
  },

  error(text) {
    Swal.fire({
      title: "Error!",
      text: text,
      icon: "error",
      confirmButtonText: "Ok",
    })
  },
}
