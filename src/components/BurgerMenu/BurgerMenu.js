import React, { useState } from 'react';
import { StaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"; 
import './BurgerMenu.css';

const BurgerMenu = ({ data }) => {
    const [isExpanded, setExpanded] = useState(false);

    function handleToggle() {
        setExpanded(!isExpanded);
    }
    return (
        <div className="nav-container">
            <nav className={`site-nav ${isExpanded ? 'site-nav--open' : ""}`}>
                <ul>
                    <li onClick={handleToggle}>
                        <Link to="/" activeClassName="active">
                            Project
                        </Link>
                    </li>
                    <li onClick={handleToggle}>
                        <a href={data.datoCmsHome.resume.url} target="_blank" rel="noopener noreferrer">
                            Resume
                        </a>
                    </li>
                    <li onClick={handleToggle}>
                        <Link to="/about" activeClassName="active">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <div className={`menu-toggle ${isExpanded ? 'open' : ""}`} onClick={handleToggle}>
                <div className="hamburger"></div>
            </div>
        </div>
    )
  }
  
  export default props => (
    <StaticQuery query={graphql`
      query BurgerQuery
      {
        datoCmsHome { 
          resume {
            url
          }
        }
      }
    `}
    render={data => <BurgerMenu data={data} {...props} />}
    />
  )
  
