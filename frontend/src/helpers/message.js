import Swal from "sweetalert2"

export default {
  success(text) {
    Swal.fire({
      title: "Success",
      text: text,
      icon: "success",
      confirmButtonText: "Ok",
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
