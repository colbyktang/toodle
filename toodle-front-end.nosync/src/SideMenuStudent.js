import React, {useState} from 'react';
import "./sideMenuStudent.css";
import { FaBars, FaWindowClose } from "react-icons/fa";
import {Link} from "react-router-dom";
import {SideBarData} from './SideBarData';
import { IconContext } from 'react-icons';

function SideMenuStudent(){
    const [sideBar, setSideBar] = useState(false)

    //function to change the state of the variable 
    const showSideBar = () => setSideBar(!sideBar)
    return(
        <>
        <IconContext.Provider value={{color: 'red'}}>
            <div className="navBar01">

                <Link to="#" className='menu-bars'>
                    <FaBars onClick={showSideBar}/>
                </Link>
            </div>

            <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSideBar}>
                    <li className="navbar-toggle">
                        <a href="#" className="menu-bar">
                            <FaWindowClose />

                        </a>
                    </li>
                    {SideBarData.map((item, index) => {
                        
                        return(
                            <li key={index} className={item.cName}>
                                <a href={item.path} >
                                    {item.icon}
                                    <span>{item.title}</span>
                                </a>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        </IconContext.Provider>
        </>

    )
}





export default SideMenuStudent