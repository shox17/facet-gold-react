/** Premium SweetAlert Handling for Facet & Gold **/
import Swal, { SweetAlertResult } from "sweetalert2";
import { Messages } from "./config";
import {
  premiumSuccessConfig,
  premiumErrorConfig,
  premiumConfirmConfig,
  premiumToastConfig,
} from "./premiumAlert";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await Swal.fire(
    premiumErrorConfig(message, "Something went wrong")
  );
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire(premiumSuccessConfig(msg, undefined, duration));
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2000
) => {
  await Swal.fire(premiumToastConfig(msg, duration));
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    ...premiumErrorConfig(msg, "Error"),
    showConfirmButton: show_button,
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};

// Premium confirmation dialog for delete/cancel actions
export const premiumConfirmAlert = async (
  title: string,
  text: string,
  confirmText: string = "Confirm",
  cancelText: string = "Cancel"
): Promise<SweetAlertResult> => {
  return await Swal.fire(premiumConfirmConfig(title, text, confirmText, cancelText));
};

// Convenience function for delete confirmations
export const premiumDeleteConfirm = async (
  itemName?: string
): Promise<SweetAlertResult> => {
  const text = itemName
    ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.`
    : "Are you sure you want to delete this item? This action cannot be undone.";
  return await premiumConfirmAlert(
    "Confirm Deletion",
    text,
    "Delete",
    "Cancel"
  );
};

// Convenience function for order/payment confirmations
export const premiumPaymentConfirm = async (
  message: string
): Promise<SweetAlertResult> => {
  return await premiumConfirmAlert(
    "Confirm Payment",
    message,
    "Proceed",
    "Cancel"
  );
};
