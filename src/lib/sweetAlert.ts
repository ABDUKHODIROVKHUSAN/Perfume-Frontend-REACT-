/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await Swal.fire({
    icon: "error",
    text: message,
    showConfirmButton: false,
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire({
    position: "top-end",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: duration,
  });
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};

export const sweetConfirmAlert = async (
  text: string,
  confirmButtonText: string = "Yes, continue"
): Promise<boolean> => {
  const result = await Swal.fire({
    icon: "question",
    title: "Please Confirm",
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "Cancel",
    background: "#fff9f4",
    color: "#3f2b22",
    confirmButtonColor: "#7a4734",
    cancelButtonColor: "#c8b6aa",
    reverseButtons: true,
    customClass: {
      popup: "swal-terracotta-popup",
      confirmButton: "swal-terracotta-confirm",
      cancelButton: "swal-terracotta-cancel",
    },
  });

  return !!result.isConfirmed;
};
