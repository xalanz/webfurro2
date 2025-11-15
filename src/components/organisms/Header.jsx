import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
return (
    <header className="site-header">
    <nav className="nav container">
    <div className="logo">🧁 DulceLobito</div>
        <ul className="nav-list">
        <li><Link to="/Home">inicio</Link></li>
        <li><Link to="/login">Iniciar sesión</Link></li>
        <li><Link to="/Productos">Productos</Link></li>
        <li><Link to="/InformacioNostros">Nosotros</Link></li>
        <li><Link to="/Contacto">Contacto</Link></li>
        
    
    </ul>
    </nav>
</header>
    
    )
}
