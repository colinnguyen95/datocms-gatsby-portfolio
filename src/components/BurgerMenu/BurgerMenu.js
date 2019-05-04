import React from 'react';
import { Link } from "gatsby"; 
import './BurgerMenu.css';

class BurgerMenu extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hasScrolled: false,
            isExpanded: false
        }
    }

    handleToggle(e){
        e.preventDefault();
        this.setState({
            isExpanded: !this.state.isExpanded,
            height: this.refs.inner.clientHeight
        })
    }

    render() {
        const {isExpanded} = this.state;
        return(
        <div className="nav-container">
            <nav className={`site-nav ${isExpanded ? 'site-nav--open' : ""}`} ref="inner">
                <ul>
                    <li onClick={(e) => this.handleToggle(e)}>
                        <Link to="/" activeClassName="active">
                            Project
                        </Link>
                    </li>
                    <li onClick={(e) => this.handleToggle(e)}>
                        <Link to="/about" activeClassName="active">
                            About
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <div className={`menu-toggle ${isExpanded ? 'open' : ""}`} onClick={(e) => this.handleToggle(e)}>
                <div className="hamburger"></div>
            </div>
        </div>
        )
    }
}

export default BurgerMenu
