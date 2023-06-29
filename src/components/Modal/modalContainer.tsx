/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import Modal from "src/components/Modal/Modal";
import { stateModal } from "src/store/slices/modalSlice";
import { useAppSelector } from "src/helpers/ndex";

const ModalContainer: React.FC = () => {
  const modalState = useAppSelector(stateModal);
  return <>{modalState?.modals.length > 0 ? <Modal /> : null}</>;
};

export default ModalContainer;
