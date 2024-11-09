import React, { useEffect, useState } from 'react'
import '../style/header.css';
import HeaderLogo from '../logos/logo.png';
import CartLogo from '../logos/cart.png';
import NavItem from './NavItem';

import { useDispatch, useSelector } from 'react-redux';
import { isCartActive, setActiveNav } from '../redux/globalReducer';


const Header = () => {

    const dispatch = useDispatch();
    const { cart, activeNav } = useSelector((state) => state.global);
    

  return (
    <header className="flex items-center justify-between pt-5 bg-white-800 text-black px-28">
            {/* Left Section: List */}
            <nav className="flex space-x-4">
                <NavItem label="ALL" 
                    index={0} 
                    activeNav={activeNav} 
                    setActiveNav={(index) => dispatch(setActiveNav(index))} 
                />
                <NavItem label="CLOTHES" 
                    index={1} 
                    activeNav={activeNav} 
                    setActiveNav={(index) => dispatch(setActiveNav(index))} 
                />
                <NavItem label="TECH" 
                    index={2} 
                    activeNav={activeNav} 
                    setActiveNav={(index) => dispatch(setActiveNav(index))} 
                />
            </nav>

            {/* Middle Section: Logo */}
            <div className="flex items-center">
                <img src={ HeaderLogo } alt="Logo" className="h-10 header_logo" />
            </div>

            {/* Right Section: Cart */}
            <div className="flex place-items-start">
                <button onClick={() => dispatch(isCartActive())} className="relative" data-testid='cart-btn'>
                    <img src={ CartLogo } alt="Logo" className="h-10 cart_logo" />
                    { cart > 0 ? <span className="absolute bottom-2 left-4 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-red-100 bg-black rounded-full p-1"> { cart } </span> : '' }
                </button>
            </div>
        </header>
  )
}

export default Header