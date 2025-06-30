import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { verifyPayment } from "../../api/paymentApi";

const VerifyPayment = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");
  const [orderId, setOrderId] = useState(null);

  // Fetch order_id from query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromUrl = params.get("order_id");
    if (idFromUrl) {
      setOrderId(idFromUrl);
    } else {
      setStatus("⚠️ No order ID found in URL.");
    }
  }, []);

  // Verification logic
  const verify = useCallback(async () => {
    if (!orderId) return;

    try {
      const paymentStatus = await verifyPayment(orderId);

      if (paymentStatus === "Success") {
        setStatus("✅ Payment Successful! Redirecting...");
        setTimeout(() => {
          navigate(`/appointments`);
        }, 2000);
      } else if (paymentStatus === "Pending") {
        setStatus("⏳ Payment is still pending...");
      } else {
        setStatus("❌ Payment failed. Please try again.");
      }
    } catch (err) {
      setStatus("⚠️ Payment verification failed.");
    }
  }, [orderId, navigate]);

  // Trigger verification once orderId is set
  useEffect(() => {
    if (orderId) {
      verify();
    }
  }, [orderId, verify]);

  return (
    <div className="p-6 text-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Verifying Payment</h2>
      <p className="mb-6 text-lg">{status}</p>

      {status === "⏳ Payment is still pending..." && (
        <button onClick={verify} className="btn btn-primary">
          Retry Verification
        </button>
      )}

      {status === "✅ Payment Successful! Redirecting..." && (
        <p className="mt-4">
          Not redirected?{" "}
          <button
            onClick={() => navigate(`/appointments/receipt/${orderId}`)}
            className="text-blue-600 underline font-semibold"
          >
            Go to receipt
          </button>
        </p>
      )}
    </div>
  );
};

export default VerifyPayment;
