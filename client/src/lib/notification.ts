import { toast } from "sonner";

type ToastType = "success" | "error" | "warning";
const notification = (type: ToastType, title: string, description?: string) => {
  const notificationType = toast[type];
  if (!notificationType || notificationType === null)
    return console.error("Invalid notification type:", type);
  notificationType(title, { description });
};

const successNotification = (title: string, description?: string) =>
  notification("success", title, description);
const warningNotification = (title: string, description?: string) =>
  notification("warning", title, description);
const errorNotification = (title: string, description?: string) =>
  notification("error", title, description);

export { successNotification, warningNotification, errorNotification };
