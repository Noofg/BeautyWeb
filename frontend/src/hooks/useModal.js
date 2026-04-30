import { useState } from "react";

export default function useModal() {
  const [modal, setModal] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const showModal = ({ title, message, onConfirm }) => {
    setModal({
      show: true,
      title,
      message,
      onConfirm,
    });
  };

  return { modal, setModal, showModal };
}