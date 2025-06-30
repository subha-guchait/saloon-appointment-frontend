import { useNavigate } from "react-router-dom";
import usePayment from "../../hooks/usePayment";
import toast from "react-hot-toast";

const AppointmentCard = ({ appt, onCancel, setAppointments, hideCancel }) => {
  const navigate = useNavigate();
  const { initiatePayment, isPaying } = usePayment();

  const handlePayNow = async () => {
    try {
      const result = await initiatePayment(appt.id);
      if (result === "Success") {
        toast.success("Payment Successful");
        setAppointments((prev) =>
          prev.map((a) =>
            a.id === appt.id ? { ...a, paymentStatus: "Paid" } : a
          )
        );
      } else if (result === "Pending") {
        toast.error("Payment Pending");
      } else {
        toast.error("Payment failed");
      }
    } catch {
      toast.error("Payment failed. Please try again.");
    }
  };

  const handleCancelClick = () => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (confirm) {
      onCancel(appt.id);
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

  // Slot & Service Info
  const slot = appt.slot;
  const service = appt.slot?.service || appt.service;
  const staffName = slot?.staff?.user?.name;

  const formatBookingTime = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const bookingTime = formatBookingTime(appt.createdAt);

  return (
    <div
      className={`border rounded-xl shadow-sm p-6 ${getStatusColorClass(
        appt.status
      )}`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-gray-800">
          {service?.name || "Service"}
        </h3>

        {slot ? (
          <>
            <p className="text-gray-600">
              {service?.description || "No description"}
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Date:</span> {slot.date}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {slot.startTime} -{" "}
                {slot.endTime}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {service?.duration} mins
              </p>
              <p>
                <span className="font-semibold">Amount:</span> ₹{appt.amount}
              </p>
              <p>
                <span className="font-semibold">Staff:</span>{" "}
                {staffName || "Unknown"}
              </p>
              <p>
                <span className="font-semibold">Booking Time:</span>{" "}
                {bookingTime}
              </p>
            </div>
          </>
        ) : (
          // Fallback for cancelled with no slot
          <div className="text-sm text-gray-700">
            <p>
              <span className="font-semibold">Amount:</span> ₹{appt.amount}
            </p>
            <p>
              <span className="font-semibold">Booking Time:</span> {bookingTime}
            </p>
            <p className="text-red-600 font-semibold mt-2">
              This appointment was cancelled.
            </p>
          </div>
        )}

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
          {appt.status === "Scheduled" && !hideCancel && (
            <button
              onClick={handleCancelClick}
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
