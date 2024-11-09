import React, { act } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';

const NavItem = ({ label, index, activeNav, setActiveNav }) => {

    const dispatch = useDispatch();

  return (
    <Link to={`/${label.toLowerCase()}`} data-testid={`${activeNav === index ? 'active-category-link' : 'category-link'}`} className={`hover:text-gray-400 cursor-pointer ${activeNav === index ? 'nav_active' : ''}`} onClick={() => dispatch(setActiveNav(index))}>{label}</Link>
  )
}

export default NavItem