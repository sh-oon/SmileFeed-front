import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/portal/ModalPortal.module.css";
import styled, { keyframes } from "styled-components";
import { colorPallet } from "../../styled/common";
import { iconSize } from "@/services/utils";
import { AiOutlineClose } from "react-icons/ai";

const SettingsModal = ({ isOpen, onClose, type, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setIsModalOpen(isOpen);
    setShowAnimation(true);
  }, [isModalOpen, isOpen]);

  const handleClose = () => {
    setShowAnimation(false);
    setTimeout(() => {
      setIsModalOpen(false);
      onClose();
    }, 500);
  };

  return (
    <>
      {isModalOpen &&
        ReactDOM.createPortal(
          <Window
            className={`${
              showAnimation
                ? styles.confirmShowAnimation
                : styles.confirmHideAnimation
            }`}
          >
            <div className="relative w-full h-full">{children}</div>
          </Window>,
          document.getElementById("portal")
        )}
    </>
  );
};


const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const Window = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  animation: ${fadeIn} 0.3s ease-in-out forwards;

  width: 80%;
  background-color: ${colorPallet.bgLight};
  border-radius: 1rem;
  box-shadow: 0 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  z-index: 999;
`;


export default SettingsModal;
