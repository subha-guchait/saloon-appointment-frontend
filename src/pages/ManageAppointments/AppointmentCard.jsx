import { useState } from "react";
import { format, parse } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";

const AppointmentCard = ({ appointment, onCompleteClick }) => {
  const [expanded, setExpanded] = useState(false);

  const slot = appointment.slot;
  const service = slot?.service || appointment.service;
  const staffUser = slot?.staff?.user;
  const customerUser = appointment.user;

  const appointmentDateTime = slot
    ? new Date(`${slot.date}T${slot.startTime}`)
    : null;

  const now = new Date();
  const isPast = appointmentDateTime && now >= appointmentDateTime;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition duration-300">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <p className="text-sm text-gray-600">Appointment #{appointment.id}</p>
          {slot && (
            <p className="text-md font-semibold text-gray-800">
              {format(new Date(slot.date), "PPP")} &bull;{" "}
              {format(parse(slot.startTime, "HH:mm:ss", new Date()), "p")}
            </p>
          )}
        </div>
        {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Details Section */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[1000px] px-4 pb-4" : "max-h-0 px-0 pb-0"
        }`}
      >
        <hr className="mb-3" />
        <p className="text-sm">
          <span className="font-medium">Customer:</span> {customerUser?.name} (
          {customerUser?.phone})
        </p>
        <p className="text-sm">
          <span className="font-medium">Service:</span> {service?.name}
        </p>
        <p className="text-sm">
          <span className="font-medium">Amount:</span> ₹{appointment.amount}
        </p>
        <p className="text-sm">
          <span className="font-medium">Payment:</span>{" "}
          <span
            className={`badge text-white font-medium ${
              appointment.paymentStatus === "Paid"
                ? "bg-green-500"
                : "bg-yellow-500"
            }`}
          >
            {appointment.paymentStatus}
          </span>
        </p>
        {staffUser && (
          <p className="text-sm">
            <span className="font-medium">Staff:</span> {staffUser?.name} (
            {staffUser?.phone})
          </p>
        )}
        <p className="text-sm mb-3">
          <span className="font-medium">Status:</span>{" "}
          <span className="text-blue-600 font-semibold">
            {appointment.status}
          </span>
        </p>

        {appointment.status === "Scheduled" && isPast && (
          <button
            className="btn btn-success btn-sm w-full mt-2"
            onClick={onCompleteClick}
          >
            Complete Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
