import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [userRole, setUserRole] = useState('USER');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función principal para obtener el perfil y verificar la autenticación
  const fetchUserProfile = async () => {
    try {
      // ✅ CONSISTENCIA: Usando sessionStorage
      const token = sessionStorage.getItem('token'); 
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      // ✅ CORRECCIÓN: Usando el puerto 9090 para el perfil
      const response = await fetch('http://localhost:9090/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        // Usa useremail o username del perfil
        setUsuario(data.useremail || data.username);
        setUserRole(data.role);
      } else {
        // Si el token es inválido o expiró, lo eliminamos
        setIsAuthenticated(false);
        sessionStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      // El error de conexión fallido (TypeError: Failed to fetch) establece isAuthenticated a false.
      // Si la conexión es exitosa ahora (puerto 9090), este bloque no se ejecutará, y la sesión se iniciará.
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Manejador de Cierre de Sesión
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsuario('');
    setUsuario('');
    setUserRole('USER');
    // Notificamos a otros componentes del cambio y redirigimos
    window.dispatchEvent(new Event('authChange')); 
    navigate('/Home'); 
  };

  // Efecto para cargar el perfil al montar el componente
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Efecto para escuchar el evento de cambio de autenticación
  useEffect(() => {
    const handleAuthChange = () => {
      fetchUserProfile();
    };

    window.addEventListener('authChange', handleAuthChange);
    return () => window.removeEventListener('authChange', handleAuthChange);
  }, []);

  if (loading) {
    return (
      <header className="site-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <nav className="nav container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ color: 'white' }}>Cargando...</div>
        </nav>
      </header>
    );
  }

  return (
    <header className="site-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <nav className="nav container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <div className="logo" style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🧁 DulceLobito
        </div>
        
        <ul className="nav-list" style={{ display: 'flex', gap: '2rem', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none', flex: 1, justifyContent: 'center' }}>
          <li><Link to="/Home" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>Inicio</Link></li>
          <li><Link to="/Productos" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>Productos</Link></li>
          <li><Link to="/InformacioNostros" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>Nosotros</Link></li>
          <li><Link to="/Profile" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '1rem', transition: 'opacity 0.3s', cursor: 'pointer' }} onMouseEnter={e => e.target.style.opacity = '0.8'} onMouseLeave={e => e.target.style.opacity = '1'}>Perfil</Link></li>
        </ul>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {!isAuthenticated ? (
            // Botón de Iniciar Sesión (visible si NO está autenticado)
            <Link 
              to="/login" 
              style={{ 
                padding: '0.6rem 1.2rem', 
                backgroundColor: '#ff6b6b', 
                color: 'white', 
                borderRadius: '6px', 
                textDecoration: 'none', 
                fontWeight: '600', 
                fontSize: '0.95rem', 
                transition: 'background 0.3s', 
                cursor: 'pointer' 
              }} 
              onMouseEnter={e => e.target.style.background = '#ee5a52'} 
              onMouseLeave={e => e.target.style.background = '#ff6b6b'}
            >
              Iniciar sesión
            </Link>
          ) : (
            <>
              {/* Indicador de Sesión y Botón de Cerrar Sesión (visible si SÍ está autenticado) */}
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                padding: '0.6rem 1rem', 
                borderRadius: '6px', 
                color: 'white', 
                fontWeight: '600', 
                fontSize: '0.95rem', 
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {userRole === 'ADMIN' ? '👨‍💼' : '👤'}
                <span>Sesión:</span>
                <span style={{ opacity: '0.9' }}>
                  {usuario.includes('@') ? usuario.split('@')[0] : usuario}
                </span>
              </div>
              
              <button 
                onClick={handleLogout}
                style={{
                  padding: '0.6rem 1.2rem', 
                  backgroundColor: '#feca57', 
                  color: '#333', 
                  borderRadius: '6px', 
                  border: 'none',
                  fontWeight: '600', 
                  fontSize: '0.95rem', 
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseEnter={e => e.target.style.background = '#ffd387'} 
                onMouseLeave={e => e.target.style.background = '#feca57'}
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}