import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
return (
    <header className="site-header">
    <nav className="nav container">
    <div className="logo">🧁 DulceLobito</div>
        <ul className="nav-list">
        <li><Link to="/login">Iniciar sesión</Link></li>
        <li><a href="">Productos</a></li>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#contacto">Contacto</a></li>
    </ul>
    </nav>
</header>
    
    )
}
