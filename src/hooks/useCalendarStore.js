import { useDispatch, useSelector } from 'react-redux';
import {
  onAddNewWEvent,
  onDeleteEvent,
  onSetActiveEVent,
  onUpdateEvent,
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEVent(calendarEvent));
  };

  const startSavingdEvent = (calendarEvent) => {
    if (calendarEvent._id) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //craando
      dispatch(onAddNewWEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startdeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //* propiedades
    events,
    activeEvent,
    hasEventSelect: !!activeEvent,
    //* metodes
    startdeletingEvent,
    setActiveEvent,
    startSavingdEvent,
  };
};
