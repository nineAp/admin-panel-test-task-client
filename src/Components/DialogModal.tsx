// src/components/DialogModal.tsx
import React from "react";
import { IDialog } from "../services/getDialogs";

interface DialogModalProps {
  dialog: IDialog;
  onClose: () => void;
}

const DialogModal: React.FC<DialogModalProps> = ({ dialog, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Диалог с {dialog.company}</h2>
        <p>
          <strong>Сотрудник:</strong> {dialog.employee}
        </p>
        <p>
          <strong>Начальное время:</strong>{" "}
          {new Date(dialog.startTime).toLocaleString()}
        </p>
        <p>
          <strong>Время последнего сообщения:</strong>{" "}
          {new Date(dialog.lastMessageTime).toLocaleString()}
        </p>
        <p>
          <strong>Комментарии:</strong> {dialog.comments}
        </p>
      </div>
    </div>
  );
};

export default DialogModal;
