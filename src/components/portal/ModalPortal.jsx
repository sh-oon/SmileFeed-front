import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/portal/ModalPortal.module.css";
import { iconSize } from "@/services/utils";
import { AiOutlineClose } from "react-icons/ai";

const SettingsModal = ({ isOpen, onClose, children }) => {
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
          <section
            className={`${styles.modalWrapper} ${
              showAnimation
                ? styles.modalShowAnimation
                : styles.modalHideAnimation
            }`}
          >
            <button className={styles.modalClose} onClick={handleClose}>
              <AiOutlineClose size={iconSize}></AiOutlineClose>
            </button>
            <div className="relative w-full h-full">{children}</div>
          </section>,
          document.getElementById("portal")
        )}
    </>
  );
};

export default SettingsModal;
