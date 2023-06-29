import React from "react";

import { useAppSelector } from "src/helpers/ndex";
import useDidMountEffect from "src/hooks/useDidMountEffect";
import useModal from "src/hooks/useModal";
import useSafeState from "src/hooks/useSafeState";
import { stateModal } from "src/store/slices/modalSlice";
import { dynamic } from "src/helpers/makeLazy";
import "./modal.scss";

export type ModalId = "AddBugModal" | "FiltersModal";

const componentRecord: Record<
  ModalId,
  (props?: Record<string, unknown>) => JSX.Element
> = {
  AddBugModal: dynamic(() => import("src/components/addBugModal")),
  FiltersModal: dynamic(() => import("src/components/filtersModal")),
};

const Modal: React.FC = () => {
  const modalState = useAppSelector(stateModal);
  const [close, setClose] = useSafeState(false);
  const [close1, setClose1] = useSafeState(false);
  const onCloseModal = () => {
    setClose(true);
  };
  useDidMountEffect(() => {
    if (close) {
      setClose1(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close]);
  useDidMountEffect(() => {
    if (close1) {
      setClose1(false);
      setTimeout(() => {
        onClose();
        setClose(false);
      }, 450);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close1]);
  const { onClose } = useModal();
  return (
    <div className="Modal">
      {modalState?.modals.map(({ name }, index) => {
        const Component = (componentRecord as any)[name];
        return (
          !!Component && (
            <div key={index}>
              <div
                role="button"
                className="back_drop_modal"
                onClick={() => onCloseModal()}
              />
              <div className="Modal_wrapper">
                <div
                  className={
                    close ? "Modal_content" : "Modal_content active_modal"
                  }
                  key={index}
                >
                  <Component key={index} onClose={() => onCloseModal()} />
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};
export default Modal;
