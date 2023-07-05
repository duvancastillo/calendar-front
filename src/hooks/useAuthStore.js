import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { onChecking, onClearMessage, onLogaut, onLogin } from '../store';

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //autenticacion
  const startLogin = async ({ email, password }) => {
    //estar pendiente del checking
    dispatch(onChecking());
    try {
      //traer datos desde servidor
      const { data } = await calendarApi.post('/auth', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      dispatch(onLogaut('Credenciales incorrectas'));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 10);
    }
  };

  const startRegister = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post('auth/new', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));

      console.log({ data });
    } catch (error) {
      dispatch(onLogaut(error.response.data?.msg || ''));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 10);
    }
  };
  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogaut());
    try {
      const { data } = await calendarApi.get('auth/renew');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogaut());
    }
  };
  const startLogaut = () => {
    localStorage.clear();
    dispatch(onLogaut());
  };

  return {
    //* pro6piedades
    status,
    user,
    errorMessage,

    //* metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogaut,
  };
};
