import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import {
  BackInStockNotificationRequestValues,
  createBackInStockNotificationRequest,
} from "../wix-api/backInStockNotifications";
import { wixBrowserClient } from "../lib/wix-client.browser";

export function useCreateBackInStockNotificationRequest() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: (values: BackInStockNotificationRequestValues) =>
      createBackInStockNotificationRequest(wixBrowserClient, values),
    onError(error) {
      console.log(error);
      if (
        (error as any).details.applicationError.code ===
        "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXIST"
      ) {
        toast({
          variant: "destructive",
          description: "You are already subscribed to this product.",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Somethiing went wrong. Please try again.",
        });
      }
    },
  });
}
