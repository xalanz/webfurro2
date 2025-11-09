import React from 'react';
import { Link } from 'react-router-dom';

export default function RegistroLayout() {
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registro enviado');
};

return (
    <div className="register-body">
    <div className="register-container">
        <div className="register-header">
        <h1>🧁 DulceLobito</h1>
        <p>Crea tu cuenta</p>
        </div>

        <div className="register-form-section">
        <form onSubmit={handleSubmit}>
            <div className="register-grid-two">
            <div className="register-input-group">
                <label className="register-input-label" htmlFor="registerFirstName">Nombre</label>
                <input
                type="text"
                id="registerFirstName"
                className="register-text-input"
                placeholder="Juan"
                required
                />
            </div>

            <div className="register-input-group">
                <label className="register-input-label" htmlFor="registerLastName">Apellido</label>
                <input
                type="text"
                id="registerLastName"
                className="register-text-input"
                placeholder="Perez"
                required
                />
            </div>
            </div>

            <div className="register-input-group">
            <label className="register-input-label" htmlFor="registerEmail">Correo Electrónico</label>
            <input
                type="email"
                id="registerEmail"
                className="register-text-input"
                placeholder="tu@correo.com"
                required
            />
            </div>

            <div className="register-input-group">
                <label className="register-input-label" htmlFor="registerPhone">Teléfono</label>
                <input
                type="tel"
                id="registerPhone"
                className="register-text-input"
                placeholder="+56 9 8165 4943 "
                required
                />
            </div>

            <div className="register-input-group">
                    <label className="register-input-label" htmlFor="registerPassword">Contraseña</label>
                <input
                type="password"
                id="registerPassword"
                className="register-text-input"
                placeholder="Mínimo 8 caracteres"
                required
                />
            </div>

            <div className="register-checkbox-wrapper">
                <input
                type="checkbox"
                id="registerTerms"
                className="register-checkbox-input"
                required
                />
                <label className="register-checkbox-label" htmlFor="registerTerms">
                Acepto los <a href="#">Términos y Condiciones</a> y la <a href="#">Política de Privacidad</a>
                </label>
            </div>

            <button type="submit" className="register-create-btn">Crear Cuenta</button>
        
        </form>

        <div className="register-separator">
            <span>o</span>
        </div>

        <div className="register-login-prompt">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </div>
        
        </div>
    </div>
    </div>
    );
}
