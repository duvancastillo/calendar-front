import { useDispatch, useSelector } from 'react-redux';
import { isCloseDateModal, isOpenDateModal } from '../store';

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModal } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(isOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(isCloseDateModal());
  };

  return {
    //* propiedades
    isDateModal,
    //* motodos
    openDateModal,
    closeDateModal,
  };
};
