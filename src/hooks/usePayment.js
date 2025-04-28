import { useState } from "react";
import { createPaymentSession, verifyPayment } from "../api/paymentApi";
import { load } from "@cashfreepayments/cashfree-js";

const usePayment = () => {
  const [isPaying, setIsPaying] = useState(false);

  const initiatePayment = async (appointmentId) => {
    try {
      setIsPaying(true);
      const cashfree = await load({ mode: "sandbox" });

      const { paymentSessionId, orderId } = await createPaymentSession(
        appointmentId
      );

      const checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };

      await cashfree.checkout(checkoutOptions);

      const result = await verifyPayment(orderId);
      return result;
    } catch (error) {
      console.error("Payment failed", error);
      throw error;
    } finally {
      setIsPaying(false);
    }
  };

  return { initiatePayment, isPaying };
};

export default usePayment;
