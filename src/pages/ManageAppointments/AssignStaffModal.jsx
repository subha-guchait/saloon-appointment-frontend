import { useEffect, useState } from "react";
import { getStaffsByService } from "../../api/staffApi"; // correct function!

const AssignStaffModal = ({ appointment, onAssign, onClose }) => {
  const [staffList, setStaffList] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState("");

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await getStaffsByService(appointment.serviceId); // use serviceId here!
        setStaffList(res);
      } catch (error) {
        console.error("Failed to fetch staff", error);
      }
    };
    if (appointment?.serviceId) {
      fetchStaff();
    }
  }, [appointment]);

  const handleAssign = () => {
    if (!selectedStaffId) return;
    onAssign(selectedStaffId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-lg font-bold mb-4">Assign Staff</h2>

        {staffList.length > 0 ? (
          <>
            <select
              className="select select-bordered w-full"
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
            >
              <option value="">Select Staff</option>
              {staffList.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2 mt-4">
              <button onClick={onClose} className="btn">
                Cancel
              </button>
              <button onClick={handleAssign} className="btn btn-primary">
                Assign
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            No staff available for this service
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignStaffModal;
