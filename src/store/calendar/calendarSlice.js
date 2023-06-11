import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const templeEvent = {
  _id: new Date().getTime(),
  title: 'arreglo en astorga',
  notes: 'hay que revisar las antenas',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'duvan',
  },
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [templeEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEVent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewWEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if ((event._id = payload._id)) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event._id !== state.activeEvent._id
        );
      }
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEVent,
  onAddNewWEvent,
  onUpdateEvent,
  onDeleteEvent,
} = calendarSlice.actions;
