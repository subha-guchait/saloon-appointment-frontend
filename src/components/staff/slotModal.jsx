import React, { useState, useEffect } from "react";
import { createSlot, updateSlot } from "../../api/staffApi";
import toast from "react-hot-toast";

const SlotModal = ({ isOpen, onClose, onSuccess, editingSlot = null }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (editingSlot) {
      setDate(editingSlot.date);
      setTime(editingSlot.startTime?.slice(0, 5));
    } else {
      setDate("");
      setTime("");
    }
  }, [editingSlot]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSlot) {
        const updated = await updateSlot(editingSlot.id, { date, time });
        toast.success("Slot updated successfully");
        onSuccess(updated);
      } else {
        const newSlot = await createSlot({ date, time });
        if (newSlot) {
          toast.success("Slot created successfully");
          onSuccess(newSlot);
          setDate("");
          setTime("");
        }
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          {editingSlot ? "Edit Slot" : "Add Slot"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-medium mb-1">Select Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Select Start Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost cursor-pointer"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingSlot ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlotModal;
