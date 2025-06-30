import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useServices from "../../hooks/useServices";
import useBookAppointment from "../../hooks/useBookAppoinment";
import toast from "react-hot-toast";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { handleBookAppointment, fetchSlots, loading } = useBookAppointment();
  const location = useLocation();
  const selectedService = location.state?.selectedService || null;

  const [service, setService] = useState(selectedService);
  const { services } = useServices();
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSubmit = async () => {
    const slotId = selectedSlot?.id;

    if (!slotId) {
      toast.error("Please select a slot");
      return;
    }

    const result = await handleBookAppointment(slotId);
    if (result) {
      toast.success("Appointment booked successfully!");
      navigate("/appointments");
    }
  };

  useEffect(() => {
    const loadSlots = async () => {
      if (service?.id && date) {
        const availableSlots = await fetchSlots(service.id, date);
        setSlots(availableSlots);
      } else {
        setSlots([]);
      }
    };
    loadSlots();
  }, [service, date]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>

      {/* Service Selection */}
      <div className="mb-4">
        <label className="block font-semibold">Select Service:</label>
        <select
          className="border p-2 w-full"
          value={service?.id || ""}
          onChange={(e) =>
            setService(services.find((s) => s.id === parseInt(e.target.value)))
          }
        >
          <option value="">-- Select a Service --</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Service Info */}
      {service && (
        <div className="mb-4">
          <p>
            <strong>Description:</strong> {service.description}
          </p>
          <p>
            <strong>Duration:</strong> {service.duration} mins
          </p>
          <p>
            <strong>Price:</strong> ₹{service.price}
          </p>
        </div>
      )}

      {/* Date Picker */}
      <div className="mb-4">
        <label className="block font-semibold">Appointment Date:</label>
        <input
          type="date"
          className="border p-2 w-full"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setSelectedSlot(null);
          }}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Available Slots */}
      {date && (
        <div className="mt-6">
          <label className="block font-semibold mb-2">Available Slots:</label>
          {slots.length === 0 ? (
            <div className="text-red-500 font-medium">
              No slots available for this date.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {slots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3 border rounded-lg cursor-pointer ${
                    selectedSlot?.id === slot.id
                      ? "bg-green-100 border-green-600"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  <p>
                    <strong>Time:</strong> {slot.startTime.slice(0, 5)} -{" "}
                    {slot.endTime.slice(0, 5)}
                  </p>
                  <p>
                    <strong>Staff:</strong> {slot.staff?.user?.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        className="btn btn-success mt-6"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </div>
  );
};

export default BookAppointment;
