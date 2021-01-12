import React from 'react'
import "../assets/styles/components/Header.scss"
import profile from "../assets/icons/profile.svg"
import netflix from "../assets/icons/netflix.svg"
const Header = () =>  (
    <header className="header">
        <img className="header__img" src={netflix} alt="NetVideo"/>
        <div className="header__menu">
            <div className="header__menu--profile">
                <img src={profile} alt=""/>
                <p>Profile</p>
            </div>
            <ul>
                <li><a href="/">Count</a></li>
                <li><a href="/">Sign Out</a></li>
            </ul>
        </div> 
    </header>
)

export default Header