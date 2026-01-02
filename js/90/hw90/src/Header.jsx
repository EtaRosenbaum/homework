import './Header.css';
import { Link, NavLink } from 'react-router';

export default function Header() {
    return (
        <header className="site-header">
            <div className="left">
                <Link to="/" className="logo">RealEstate</Link>

                <nav className="nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/buy">Buy</NavLink>
                    <NavLink to="/sell">Sell</NavLink>
                </nav>
            </div>

            <div className="right">
                <Link to="/sell" className="cta">List your property</Link>
            </div>
        </header>
    );
}