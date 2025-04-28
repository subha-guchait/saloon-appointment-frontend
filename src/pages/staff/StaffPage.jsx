import { useState, useEffect } from "react";
import { getAllStaff } from "../../api/staffApi";
import StaffCard from "../../components/staff/StaffCard";
import AddStaffModal from "../../components/staff/AddStaffModal";

const StaffPage = () => {
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchStaffs = async () => {
    try {
      const res = await getAllStaff();
      console.log(res.staffs);
      setStaffs(res.staffs);
    } catch (error) {
      console.error("Failed to fetch staffs", error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Staff</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Staff
        </button>
      </div>

      {staffs.length === 0 ? (
        <p>No staff members found. Please add some!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {staffs.map((staff) => (
            <StaffCard
              key={staff.id}
              staff={staff}
              refreshStaff={fetchStaffs}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddStaffModal
          onClose={() => setShowModal(false)}
          refreshStaff={fetchStaffs}
        />
      )}
    </div>
  );
};

export default StaffPage;
