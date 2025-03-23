import { useEffect, useRef, useState } from "react";
import CustomModal from "../customModal";

const RightViewModal = ({
  show,
  onClose,
  children,
  className,
  outSideClickClose = false,
}) => {
  const [isVisible, setIsVisible] = useState(show);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimated(false);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <CustomModal
      show={isVisible}
      onClose={onClose}
      outSideClickClose={outSideClickClose}
    >
      <div
        className={`bg-white h-full ${className} absolute top-0 right-0 transition-transform duration-300 ease-in-out ${
          isAnimated ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {children}
      </div>
    </CustomModal>
  );
};

export default RightViewModal;
