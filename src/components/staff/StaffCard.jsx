import { deleteStaff } from "../../api/staffApi";
import { Trash } from "lucide-react";

const StaffCard = ({ staff, refreshStaff }) => {
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this staff?")) {
      try {
        await deleteStaff(staff.id);
        refreshStaff();
      } catch (error) {
        console.error("Failed to delete staff", error);
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-md p-4">
      <h2 className="text-lg font-bold">{staff.user.name}</h2>
      <p className="text-sm text-gray-600">Email: {staff.user.email}</p>
      <p className="text-sm text-gray-600">Phone: {staff.user.phone}</p>
      <p className="text-sm text-gray-600">Service: {staff.service?.name}</p>

      <div className="flex gap-2 mt-4">
        <button
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 cursor-pointer transition"
          onClick={handleDelete}
          aria-label="Delete"
        >
          <Trash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default StaffCard;
