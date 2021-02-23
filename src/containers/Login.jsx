import React, { useState } from "react";
import {connect} from 'react-redux'
import google from "../assets/icons/google.svg";
import twitter from "../assets/icons/twitter.png";
import "../assets/styles/components/Login.scss";
import { Link } from "react-router-dom";
import {loginRequest} from '../actions'
import Header from '../components/Header'

const Login = (props) => {
  const [form, setValues] = useState({
	email: "",
	password: "",
  });
  const handleInput = event => {
	  setValues({
		  ...form,
		  [event.target.name]: event.target.value
	  })
  }
  const handleSubmit = event => {
	  console.log(form)
	  event.preventDefault()
	  props.loginRequest(form)
	  props.history.push('/')
  }
  return (
    <>
      <Header isLogin></Header>
      <section className="login">
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input className="input" type="text" placeholder="Correo" name="email" onChange={handleInput}/>
            <input className="input" type="password" placeholder="Contraseña" name="password" onChange={handleInput}/>
            <button className="button">Iniciar sesión</button>
            <div className="login__container--remember-me">
              <label>
                <input type="checkbox" id="cbox1" value="first_checkbox" />
                Recuérdame
              </label>
              <a href="/">Olvidé mi contraseña</a>
            </div>
          </form>
          <section className="login__container--social-media">
            <div>
              <img src={google} /> Inicia sesión con Google
            </div>
            <div>
              <img src={twitter} /> Inicia sesión con Twitter
            </div>
          </section>
          <p className="login__container--register">
            No tienes ninguna cuenta
            <Link to="/register"> Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};
const mapDispatchToProps = {
	loginRequest
}
export default connect(null, mapDispatchToProps)(Login)
