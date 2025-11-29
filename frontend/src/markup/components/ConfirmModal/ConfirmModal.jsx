// components/ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      className="confirm-modal row"
    >
      <div className="col-md-3"></div>
      <div className="col-md-6 p-4 rounded shadow-lg text-center">
        <h2 className="mb-4">{message}</h2>
        <div className="flex justify-around ">
            <button className="theme-btn btn-style-one m-2" onClick={onConfirm}>
                <span>Yes</span>
            </button>
            <button className="theme-btn btn-style-one m-2" onClick={onCancel}>
                <span>No</span>
            </button>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default ConfirmModal;
