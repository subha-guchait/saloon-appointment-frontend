import { deleteStaff } from "../../api/staffApi";

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
      <h2 className="text-lg font-bold">{staff.name}</h2>
      <p className="text-sm text-gray-600">Email: {staff.email}</p>
      <p className="text-sm text-gray-600">Phone: {staff.phone}</p>
      <p className="text-sm text-gray-600">Service: {staff.service?.name}</p>

      <div className="flex gap-2 mt-4">
        <button className="btn btn-sm btn-error" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default StaffCard;
