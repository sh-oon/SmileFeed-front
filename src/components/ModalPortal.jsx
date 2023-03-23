import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "@/components/ModalPortal.module.css";

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
              X
            </button>
            <div className="relative">{children}</div>
          </section>,
          document.getElementById("portal")
        )}
    </>
  );
};

export default SettingsModal;
