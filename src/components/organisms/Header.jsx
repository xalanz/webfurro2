import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const usuarioGuardado = localStorage.getItem('usuario');
    const adminStatus = localStorage.getItem('isAdmin');
    
    setIsAuthenticated(authStatus === 'true');
    setUsuario(usuarioGuardado || '');
    setIsAdmin(adminStatus === 'true');

    const handleAuthChange = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const usuarioGuardado = localStorage.getItem('usuario');
      const adminStatus = localStorage.getItem('isAdmin');
      setIsAuthenticated(authStatus === 'true');
      setUsuario(usuarioGuardado || '');
      setIsAdmin(adminStatus === 'true');
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('usuario');
    localStorage.removeItem('isAdmin');
    window.dispatchEvent(new Event('authChange'));
    navigate('/Home');
  };

  return (
    <header className="site-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <nav className="nav container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="logo" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🧁 DulceLobito</div>
        
        <ul className="nav-list" style={{ display: 'flex', gap: '2rem', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', flex: 1, justifyContent: 'center' }}>
          <li><Link to="/Home" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>inicio</Link></li>
          <li><Link to="/Productos" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>Productos</Link></li>
          <li><Link to="/InformacioNostros" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>Nosotros</Link></li>
          <li><Link to="/Profile" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>Perfil</Link></li>
        </ul>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {!isAuthenticated ? (
            <Link to="/login" style={{ padding: '0.6rem 1.2rem', backgroundColor: '#ff6b6b', color: 'white', borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'background 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.background = '#ee5a52'} onMouseLeave={e => e.target.style.background = '#ff6b6b'}>Iniciar sesión</Link>
          ) : (
            <>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.6rem 1rem', borderRadius: '6px', color: 'white', fontWeight: '600', fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.3)' }}>
                {isAdmin ? '👨‍💼 Admin' : '👤'} <span style={{ marginLeft: '0.3rem' }}>{usuario.split('@')[0]}</span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={e => e.target.style.background = '#ee5a52'}
                onMouseLeave={e => e.target.style.background = '#ff6b6b'}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
