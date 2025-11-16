import React from 'react';
import { Link } from 'react-router-dom';

export default function LoginLayout() {
	const handleSubmit = (e) => {
		e.preventDefault();
		// TODO: implementar autenticación
		console.log('Login submitted');
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
							required
						/>
					</div>

					<div className="login-checkbox-group">
						<input type="checkbox" id="remember" className="login-checkbox" />
						<label htmlFor="remember" className="login-checkbox-label">Recordarme</label>
					</div>

					

					<button type="submit" className="login-button">Iniciar Sesión</button>
                    
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
