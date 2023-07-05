import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './login.css';
import Swal from 'sweetalert2';
const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
};
const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
};
const formaValidations = {
  registerEmail: [(value) => value.includes('@'), 'el correo debe llevar @'],
  registerPassword: [
    (value) => value.length >= 6,
    'la contraseña debe tener minimo 6 caracteres',
  ],
  registerName: [(value) => value.length >= 1, 'el nombre es obligatorio'],
};
export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  //capturar datos del formulario login
  const {
    loginEmail,
    loginPassword,
    onInputChange: loginInputChange,
  } = useForm(loginFormFields);
  //capturar datos del formulario registro
  const {
    registerName,
    registerEmail,
    registerPassword,
    registerNameValid,
    registerEmailVAlid,
    registerPasswordValid,
    registerPassword2,
    isFormValid,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields, formaValidations);
  //enviar datos del login a backend
  const onSubmitLogoin = (e) => {
    e.preventDefault();

    startLogin({ email: loginEmail, password: loginPassword });
  };

  const onSubmitRegister = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    if (registerPassword !== registerPassword2) {
      Swal.fire('error de registro', 'las contraseñas no coinciden', 'error');
      return;
    }
    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
  };
  // mosrtar alerta de error de autenticacion
  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('error de autenticacion', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onSubmitLogoin}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={loginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={loginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h1>{isFormValid ? 'valido' : 'invalido'}</h1>
          <h3>Registro</h3>
          <form onSubmit={onSubmitRegister}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
