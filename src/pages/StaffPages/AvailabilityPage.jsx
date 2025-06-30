import React, { useState, useEffect } from "react";
import useStaffSlots from "../../hooks/useStaffSlots";
import Slot from "../../components/staff/Slot";
import SlotModal from "../../components/staff/slotModal";

const AvailabilityPage = () => {
  const { slots, setSlots, loading, fetchSlots } = useStaffSlots();
  const [showModal, setShowModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleSlotDeleted = (deletedId) => {
    setSlots((prevSlots) => prevSlots.filter((s) => s.id !== deletedId));
  };
  const handleSlotCreatedOrUpdated = (newOrUpdatedSlot) => {
    setSlots((prev) => {
      const exists = prev.find((s) => s.id === newOrUpdatedSlot.id);
      if (exists) {
        return prev.map((s) =>
          s.id === newOrUpdatedSlot.id ? newOrUpdatedSlot : s
        );
      }
      return [...prev, newOrUpdatedSlot];
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Availability</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          + Add Slot
        </button>
      </div>
      {loading ? (
        <p>Loading slots...</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {slots.map((slot) => (
            <Slot
              key={slot.id}
              slot={slot}
              onSlotDeleted={handleSlotDeleted}
              onEdit={() => {
                setEditingSlot(slot);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      )}
      <SlotModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingSlot(null);
        }}
        editingSlot={editingSlot}
        onSuccess={handleSlotCreatedOrUpdated}
      />
    </div>
  );
};

export default AvailabilityPage;
