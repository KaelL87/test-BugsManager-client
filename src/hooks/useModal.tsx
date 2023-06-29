/* eslint-disable @typescript-eslint/no-unused-vars */

import { useAppDispatch, useAppSelector } from '../helpers/ndex';
import { pop, push, stateModal } from 'src/store/slices/modalSlice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
type OnCloseFn = () => void;
type PushModal = (name: string, timeout?: number) => void;
type ReplaceTo = (name: string, timeout?: number) => void;

type OnIsOpen = (name: string) => boolean;

const useModal = () : {
  pushModal: PushModal;
  onClose: OnCloseFn;
  onIsOpen: OnIsOpen;
  replaceTo: ReplaceTo;
} => {
  const modalState = useAppSelector(stateModal);

  const dispatch = useAppDispatch();
  const onClose: OnCloseFn = () => dispatch(pop());
  const replaceTo: ReplaceTo = (name, timeout) => {
    dispatch(pop());
    const handleDispatch = () => dispatch(push({ name }));

    if (timeout) {
      setTimeout(handleDispatch, timeout);
      return;
    }
    handleDispatch();
  };

  const pushModal: PushModal = (name, timeout) => {
    const handleDispatch = () => dispatch(push({ name }));

    if (timeout) {
      setTimeout(handleDispatch, timeout);
      return;
    }
    handleDispatch();
  };

  const onIsOpen: OnIsOpen = currentName =>
    modalState.modals.some(({ name }) => currentName === name);

  return {
    pushModal,
    onClose,
    onIsOpen,
    replaceTo,
  };
};
export default useModal;
