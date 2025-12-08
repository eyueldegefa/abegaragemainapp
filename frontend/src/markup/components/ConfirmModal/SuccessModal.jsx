import React from 'react'

function SuccessModal({ message, closeModal }) {
  return (
    <div
      className="confirm-modal row"
    >
      <div className="col-md-3"></div>
      <div className="col-md-6 p-4 rounded shadow-lg text-center">
        <h2 className="mb-4">{message}</h2>
        <div className="">
            <button className="theme-btn btn-style-one m-2" onClick={closeModal}>
                <span>OK</span>
            </button>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default SuccessModal