import React from "react";
import "../css/modal.css";

function AppModal({ modal, setModal }) {
  if (!modal.show) return null;

  return (
    <div
      className="modal-overlay"
      onClick={() => setModal({ ...modal, show: false })}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>{modal.title}</h3>
        <p>{modal.message}</p>

        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={() => setModal({ ...modal, show: false })}
          >
            Huỷ
          </button>

          <button
            className="btn-confirm"
            onClick={() => {
              modal.onConfirm && modal.onConfirm();
              setModal({ ...modal, show: false });
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppModal;