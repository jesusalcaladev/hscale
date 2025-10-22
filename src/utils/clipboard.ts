import { toast } from "sonner";

export const copyToClipboard = (value: string, message: string = "Copied!") => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toast.success(message);
    })
    .catch((_) => {
      toast.error("Failed to copy");
    });
};
