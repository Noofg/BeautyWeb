import { createContext, useContext, useState } from "react";
import AppModal from "../components/AppModal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
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

  return (
    <ModalContext.Provider value={{ showModal }}>
      {children}
      <AppModal modal={modal} setModal={setModal} />
    </ModalContext.Provider>
  );
}