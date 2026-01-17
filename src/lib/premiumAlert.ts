/** Premium Alert Configuration for Facet & Gold **/
import { SweetAlertOptions } from "sweetalert2";

// Premium color palette
const COLORS = {
  gold: "#C8A45D",
  goldDark: "#B8944F",
  goldLight: "#D4B87A",
  ivory: "#FAF6EF",
  warmBeige: "#FBF7F0",
  charcoal: "#1A1A1A",
  softGray: "#6B6B6B",
  mutedRed: "#A67C7C",
  wineRed: "#8B5A5A",
  white: "#FFFFFF",
};

// Base premium styling configuration
const basePremiumConfig: Partial<SweetAlertOptions> = {
  customClass: {
    container: "premium-swal-container",
    popup: "premium-swal-popup",
    title: "premium-swal-title",
    htmlContainer: "premium-swal-html",
    confirmButton: "premium-swal-confirm-btn",
    cancelButton: "premium-swal-cancel-btn",
    actions: "premium-swal-actions",
    icon: "premium-swal-icon",
  },
  buttonsStyling: false,
  allowOutsideClick: false,
  allowEscapeKey: true,
  showClass: {
    popup: "premium-swal-show",
    backdrop: "premium-swal-backdrop-show",
  },
  hideClass: {
    popup: "premium-swal-hide",
    backdrop: "premium-swal-backdrop-hide",
  },
};

// Success alert configuration (centered modal - like confirmation alerts)
export const premiumSuccessConfig = (
  title: string,
  text?: string,
  duration: number = 2000
): SweetAlertOptions => {
  return {
    ...basePremiumConfig,
    icon: "success",
    iconColor: COLORS.gold,
    title,
    text,
    showConfirmButton: true,
    confirmButtonText: "OK",
    confirmButtonColor: COLORS.gold,
    timer: duration > 0 ? duration : undefined,
    timerProgressBar: duration > 0,
    width: "500px",
    padding: "36px 40px",
    background: COLORS.ivory,
    color: COLORS.charcoal,
    allowOutsideClick: false,
    allowEscapeKey: true,
  } as SweetAlertOptions;
};

// Error alert configuration
export const premiumErrorConfig = (
  text: string,
  title?: string
): SweetAlertOptions => {
  return {
    ...basePremiumConfig,
    icon: "error",
    iconColor: COLORS.mutedRed,
    title: title || "Error",
    text,
    width: "480px",
    padding: "32px 40px",
    background: COLORS.ivory,
    color: COLORS.charcoal,
    confirmButtonText: "OK",
    confirmButtonColor: COLORS.gold,
    showConfirmButton: true,
  } as SweetAlertOptions;
};

// Warning/Confirmation alert configuration
export const premiumConfirmConfig = (
  title: string,
  text: string,
  confirmText: string = "Confirm",
  cancelText: string = "Cancel"
): SweetAlertOptions => {
  return {
    ...basePremiumConfig,
    icon: "warning",
    iconColor: COLORS.gold,
    title,
    text,
    width: "500px",
    padding: "36px 40px",
    background: COLORS.ivory,
    color: COLORS.charcoal,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: COLORS.gold,
    cancelButtonColor: "transparent",
    reverseButtons: true,
  } as SweetAlertOptions;
};

// Small toast success (for subtle notifications - centered, no backdrop)
export const premiumToastConfig = (
  title: string,
  duration: number = 2000
): SweetAlertOptions => {
  return {
    ...basePremiumConfig,
    icon: "success",
    iconColor: COLORS.gold,
    title,
    position: "center",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: false,
    toast: false,
    width: "400px",
    padding: "24px 32px",
    background: COLORS.white,
    color: COLORS.charcoal,
    backdrop: "rgba(0, 0, 0, 0)",
    allowOutsideClick: true,
    customClass: {
      ...basePremiumConfig.customClass,
      container: "premium-swal-container premium-swal-center",
    },
  } as SweetAlertOptions;
};
