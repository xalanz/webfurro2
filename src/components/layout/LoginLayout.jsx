import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginLayout() {
    // ⭐ CAMBIO 1: Cambiar el estado de 'email' a 'username' para coincidir con el backend
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Nuevo estado para manejar errores de API
    const navigate = useNavigate();
    
    // Endpoint de login (puerto 9090)
    const LOGIN_URL = 'http://localhost:9090/api/auth/login';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Limpiar errores previos

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // ⭐ CAMBIO 2: Enviar username y password al backend
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // ⭐ CAMBIO 3: Guardar el token, username y role en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);
                
                // Limpiar información de autenticación antigua (si existía)
                localStorage.removeItem('isAuthenticated'); 
                localStorage.removeItem('isAdmin');

                // Disparar evento para que otros componentes se actualicen
                window.dispatchEvent(new Event('authChange'));
                
                console.log('Login exitoso. Rol:', data.role);
                
                // Redirigir a home
                navigate('/Home');

            } else {
                // ⭐ CAMBIO 4: Manejar errores del backend (e.g., "Nombre de usuario o contraseña incorrectos")
                const errorMessage = data.error || 'Credenciales inválidas o error de red.';
                setError(errorMessage);
                console.error('Fallo el login:', errorMessage);
            }
        } catch (err) {
            setError('Error de conexión con el servidor. Intente más tarde.');
            console.error('Error de fetch:', err);
        }
    };

    return (
        <div className="login-body">
            <div className="login-container">
                <div className="login-header">
                    <div className="login-logo">🧁 DulceLobito</div>
                    <h1 className="login-title">Bienvenido</h1>
                    <p className="login-subtitle">Inicia sesión en tu cuenta</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Mostrar mensaje de error de API */}
                    {error && <p style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</p>}
                    
                    <div className="login-form-group">
                        {/* ⭐ CAMBIO 5: Cambiar etiqueta para Nombre de Usuario */}
                        <label className="login-label" htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text" // Cambiado de 'email' a 'text'
                            id="username" // Cambiado de 'email' a 'username'
                            className="login-input"
                            placeholder="tu_usuario_unico"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-form-group">
                        <label className="login-label" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="login-checkbox-group">
                        <input type="checkbox" id="remember" className="login-checkbox" />
                        <label htmlFor="remember" className="login-checkbox-label">Recordarme</label>
                    </div>

                    <button type="submit" className="login-button">Iniciar Sesión</button>
                    
                    <div style={{ marginTop: '1rem', padding: '0.8rem', backgroundColor: '#f0f8ff', borderRadius: '4px', fontSize: '0.85rem', color: '#333' }}>
                        <p><strong>prueba:</strong></p>
                        <p>user cargado al inciar backend </p>
                        <p>Usuario: <code>user_user</code>, Contraseña: <code>password</code></p>
                    </div>
                    
                </form>

                <div className="login-divider">o</div>

                <div className="login-footer">
                    <p style={{ color: '#666' }}>
                        ¿No tienes cuenta?{' '}
                        <Link to="/registro" className="login-link">Regístrate aquí</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}