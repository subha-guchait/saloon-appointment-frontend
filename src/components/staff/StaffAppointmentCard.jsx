import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";

const StaffAppointmentCard = ({ appointment, onComplete }) => {
  const [expanded, setExpanded] = useState(false);
  const { slot, user, status, paymentStatus, amount } = appointment;

  const formattedDate = format(new Date(slot.date), "dd MMM yyyy");
  const start = format(new Date(`1970-01-01T${slot.startTime}`), "hh:mm a");
  const end = format(new Date(`1970-01-01T${slot.endTime}`), "hh:mm a");

  const appointmentDateTime = new Date(`${slot.date}T${slot.startTime}`);
  const now = new Date();
  const isPast = now >= appointmentDateTime;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md mb-4">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <p className="text-sm text-gray-600">Appointment #{appointment.id}</p>
          <p className="text-md font-semibold text-gray-800">
            {slot.service.name}
          </p>
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Expanded Body */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[1000px] px-4 pb-4" : "max-h-0 px-0 pb-0"
        }`}
      >
        <hr className="mb-3" />
        <p className="text-sm">
          <span className="font-medium">Customer:</span> {user.name} (
          {user.phone})
        </p>
        <p className="text-sm">
          <span className="font-medium">Date:</span> {formattedDate}
        </p>
        <p className="text-sm">
          <span className="font-medium">Time:</span> {start} - {end}
        </p>
        <p className="text-sm">
          <span className="font-medium">Amount:</span> ₹{amount}
        </p>
        <p className="text-sm">
          <span className="font-medium">Status:</span> {status}
        </p>
        <p className="text-sm mb-2">
          <span className="font-medium">Payment:</span>{" "}
          <span
            className={`badge text-white font-medium ${
              paymentStatus === "Paid" ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {paymentStatus}
          </span>
        </p>

        {/* Complete Button */}
        {status === "Scheduled" && isPast && (
          <div className="flex justify-end">
            <button
              onClick={() => onComplete(appointment.id)}
              className="px-4 py-1.5 btn btn-soft btn-accent"
            >
              Complete Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffAppointmentCard;
