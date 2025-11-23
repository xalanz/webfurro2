import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginLayout() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Credenciales admin fijas (en producción usar backend)
		const isAdmin = email === 'admin@duocuc.cl' && password === 'admin123';
		
		// Guardar en localStorage
		localStorage.setItem('isAuthenticated', 'true');
		localStorage.setItem('usuario', email);
		localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
		
		// Dispatchear evento para que otros componentes se actualicen
		window.dispatchEvent(new Event('authChange'));
		
		console.log('Login exitoso:', { email, isAdmin });
		
		// Redirigir a home
		navigate('/Home');
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
					<div className="login-form-group">
						<label className="login-label" htmlFor="email">Correo Electrónico</label>
						<input
							type="email"
							id="email"
							className="login-input"
							placeholder="tu@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
						<p><strong>Demo Admin:</strong></p>
						<p>Email: <code>admin@duocuc.cl</code></p>
						<p>Contraseña: <code>admin123</code></p>
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
