import { useNavigate } from "react-router-dom";
import usePayment from "../../hooks/usePayment";
import toast from "react-hot-toast";

const AppointmentCard = ({ appt, onCancel, setAppointments }) => {
  const navigate = useNavigate();

  const { initiatePayment, isPaying } = usePayment();

  const handlePayNow = async () => {
    try {
      const result = await initiatePayment(appt.id);
      if (result === "Success") {
        toast.success("payment Sucessfull");
        setAppointments((prev) =>
          prev.map((a) =>
            a.id === appt.id ? { ...a, paymentStatus: "Paid" } : a
          )
        );
      } else if (result === "Pending") {
        toast.success("Payment Pending");
      } else {
        toast.error("payment failed");
      }
    } catch (err) {
      alert("Payment failed. Please try again.");
    }
  };

  const getStatusColorClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "border-blue-400 bg-blue-50";
      case "Completed":
        return "border-green-400 bg-green-50";
      case "Cancelled":
        return "border-red-400 bg-red-50";
      default:
        return "border-gray-300 bg-white";
    }
  };

  return (
    <div
      className={`border rounded-xl shadow-sm p-6 ${getStatusColorClass(
        appt.status
      )}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-gray-800">
          {appt.service.name}
        </h3>
        <p className="text-gray-600">{appt.service.description}</p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">Date:</span> {appt.date}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {appt.time}
          </p>
          <p>
            <span className="font-semibold">Duration:</span>{" "}
            {appt.service.duration} mins
          </p>
          <p>
            <span className="font-semibold">Amount:</span> ₹{appt.amount}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm">
          <span className="font-semibold">Payment:</span>
          {appt.paymentStatus === "Paid" ? (
            <span className="text-green-600 font-semibold">Paid</span>
          ) : appt.status === "Scheduled" ? (
            <button
              className="px-3 py-1 text-sm btn btn-primary"
              onClick={handlePayNow}
              disabled={isPaying}
            >
              {isPaying ? "Processing..." : "Pay Now"}
            </button>
          ) : (
            <span className="text-gray-500">Not Paid</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          {appt.status === "Scheduled" && (
            <button
              onClick={() => onCancel(appt.id)}
              className="px-4 py-1 text-sm btn btn-error"
            >
              Cancel Appointment
            </button>
          )}
          {appt.status === "Completed" && (
            <button
              onClick={() => navigate(`/review/${appt.id}`)}
              className="px-4 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Leave a Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
