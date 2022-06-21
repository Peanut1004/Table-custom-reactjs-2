import React, { useContext } from "react";
import { AppContext } from "../Context";

function Modal() {
  const { handleButtonModal, formError } = useContext(AppContext);

  return (
    <div className="modal">
      <div className="modal-wrap">
        <h3 className="modal-title">Invalid</h3>
        <div className="modal-content">
          {Object.values(formError).map((el, index) => (
            <p key={index}>{el}</p>
          ))}

          <div className="modal-button">
            <button onClick={handleButtonModal}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
