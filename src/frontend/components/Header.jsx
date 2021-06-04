import React from 'react';
import { connect } from 'react-redux';
import '../assets/styles/components/Header.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import profile from '../assets/icons/profile.svg';
import netflix from '../assets/icons/netflix.svg';
import gravatar from '../utils/gravatar';
import { logOutRequest } from '../actions';

const Header = (props) => {
  const { user, isLogin, isRegister } = props;
  const hasUser = Object.keys(user).length > 0;

  const handleLogout = () => {
    document.cookie = 'email=';
    document.cookie = 'name=';
    document.cookie = 'id=';
    document.cookie = 'token=';
    props.logOutRequest({});
    window.location.href = '/login';
  };
  const HeaderClass = classNames('header', {
    isLogin,
    isRegister,
  });
  return (
    <header className={HeaderClass}>
      <Link to='/'>
        <img className='header__img' src={netflix} alt='NetVideo' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {hasUser ?
            <img src={gravatar(user.email)} alt={user.email} /> :
            <img src={profile} alt='' />
          }
          <p>Profile</p>
        </div>
        <ul>
          {hasUser ?
            <li><Link to='/'>{user.name}</Link></li> :
            null
          }
          {hasUser ?
            <li><button onClick={handleLogout} type='button' tabIndex={0}>Log out</button></li> : (
              <div>
                <li><Link to='/login'>Log in</Link></li>
                <li><Link to='/register'>Register</Link></li>
              </div>
            )}
        </ul>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logOutRequest,
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
