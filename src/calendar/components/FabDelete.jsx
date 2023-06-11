import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { startdeletingEvent, hasEventSelect } = useCalendarStore();

  const handleDelete = () => {
    startdeletingEvent();
  };

  return (
    <button
      className="btn btn-danger fab-delete"
      onClick={handleDelete}
      style={{ display: hasEventSelect ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
