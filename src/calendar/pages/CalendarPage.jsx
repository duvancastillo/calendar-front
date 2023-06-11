import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { localizer, getMessages } from '../../helpers';
import {
  Navbar,
  CalendarEvent,
  CalendarModal,
  FabAddNew,
  FabDelete,
} from '../';
import { useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {
  const { events, setActiveEvent } = useCalendarStore();
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastview') || 'week'
  );
  const setStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundcolor: '#34fE23',
      borderRadius: '0px',
      opacity: '0.8',
      bgColor: 'white',
    };

    return {
      style,
    };
  };

  const onDoubleClickEvent = (e) => {
    openDateModal();
  };
  const onSelect = (e) => {
    setActiveEvent(e);
  };
  const onviewChanged = (e) => {
    localStorage.setItem('lastview', e);
    setLastView(e);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        defaultView={lastView}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '90vh' }}
        messages={getMessages()}
        onDoubleClickEvent={onDoubleClickEvent}
        onSelectEvent={onSelect}
        onView={onviewChanged}
        eventPropGetter={setStyleGetter}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
      <FabDelete />
      <FabAddNew />
    </>
  );
};
