import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions';
import '../assets/styles/components/Register.scss';
import Header from '../components/Header';

const Register = (props) => {
  const [form, setValues] = useState({
    email: '',
    password: '',
    name: '',
  });
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.registerUser(form, '/login');
  };
  return (
    <>
      <Header isRegister />
      <section className='register'>
        <section className='register__container'>
          <h2>Regístrate</h2>
          <form className='register__container--form' onSubmit={handleSubmit}>
            <input className='input' type='text' placeholder='Nombre' name='name' onChange={handleInput} />
            <input className='input' type='text' placeholder='Correo' name='email' onChange={handleInput} />
            <input className='input' type='password' placeholder='Contraseña' name='password' onChange={handleInput} />
            <button className='button' type='submit'>Registrarmo</button>
          </form>
          <Link to='/login'>Iniciar sesión</Link>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  registerUser,
};
export default connect(null, mapDispatchToProps)(Register);
