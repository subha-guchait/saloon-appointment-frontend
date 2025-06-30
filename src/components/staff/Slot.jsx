import { Trash2, Pencil } from "lucide-react";
import { deleteSlot } from "../../api/staffApi";
import { format } from "date-fns";
import toast from "react-hot-toast";

const Slot = ({ slot, onSlotDeleted, onSlotUpdated, onEdit }) => {
  const isBooked = !!slot.isBooked;

  const handleDelete = async () => {
    if (!isBooked && window.confirm("Delete this slot?")) {
      try {
        const deletedSlot = await deleteSlot(slot.id);
        if (deleteSlot) {
          onSlotDeleted(deletedSlot.id);
          toast.success("Slot deleted successfully");
        }
      } catch (err) {
        toast.error("Failed to delete slot");
        console.error("Failed to delete slot", err);
      }
    }
  };

  return (
    <div
      className={`p-4 rounded-xl shadow-sm border transition-all duration-200  relative
    ${
      isBooked
        ? "bg-red-50 border-red-300 hover:bg-red-100"
        : "bg-green-50 border-green-300 hover:bg-green-100"
    }`}
    >
      <p>
        <strong>Date:</strong> {format(new Date(slot.date), "PPP")}
      </p>
      <p>
        <strong>Time:</strong> {slot.startTime.slice(0, 5)} -{" "}
        {slot.endTime.slice(0, 5)}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {isBooked ? (
          <span className="text-red-600 font-medium">Booked</span>
        ) : (
          <span className="text-green-600 font-medium">Available</span>
        )}
      </p>

      {!isBooked && (
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={() => onEdit(slot)}
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            className="text-red-600 hover:text-red-800 cursor-pointer"
            onClick={handleDelete}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Slot;
