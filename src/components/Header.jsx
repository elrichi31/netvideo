import React from 'react'
import {connect} from 'react-redux'
import "../assets/styles/components/Header.scss"
import profile from "../assets/icons/profile.svg"
import netflix from "../assets/icons/netflix.svg"
import gravatar from '../utils/gravatar.js'
import {logOutRequest} from '../actions'
import {Link} from 'react-router-dom'
import classNames from 'classnames'
const Header = (props) => {
    const {user, isLogin, isRegister} = props
    const hasUser = Object.keys(user).length > 0
    const handleLogout = () => {
        props.logOutRequest({})
    }
    const HeaderClass = classNames('header', {
        isLogin,
        isRegister,
    })
    return (
        <header className={HeaderClass}>
            <Link to='/'>
                <img className="header__img" src={netflix} alt="NetVideo"/>
            </Link>
            <div className="header__menu">
                <div className="header__menu--profile">
                    {hasUser ?
                        <img src={gravatar(user.email)} alt={user.email} />
                        :
                        <img src={profile} alt=""/>
                    }
                    <p>Profile</p>
                </div>
                <ul>
                    {hasUser ?
                        <li><Link to="/">{user.name}</Link></li>    
                        : null                        
                    }
                    {hasUser ?
                        <li><a onClick={handleLogout}>Log out</a></li>
                        :
                        <div>
                            <li><Link to="/login">Log in</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </div>
                    }
                </ul>
            </div> 
        </header>
    )
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    logOutRequest,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)