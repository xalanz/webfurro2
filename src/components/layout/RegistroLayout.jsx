import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegistroLayout() {
    // ⭐ 1. Definir estados para los campos requeridos por el backend
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const REGISTER_URL = 'http://localhost:9090/api/auth/register';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        // El backend registra el rol como "USER" por defecto (role: "USER")
        const userData = {
            username,
            useremail,
            password,
            // role: "USER" // Se puede omitir ya que el backend lo pone por defecto
        };

        try {
            const response = await fetch(REGISTER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('¡Cuenta creada con éxito! Serás redirigido al inicio de sesión.');
                // Redirigir al login después de un breve retraso
                setTimeout(() => {
                    navigate('/login'); 
                }, 500);
            } else {
                // Manejar errores de la API (ej. El usuario ya existe)
                const errorMessage = data.error || 'Fallo en el registro. Verifique sus datos.';
                setError(errorMessage);
                console.error('Error de registro:', errorMessage);
            }

        } catch (err) {
            setError('Error de conexión con el servidor. Intente más tarde.');
            console.error('Error de fetch:', err);
        }
    };

    return (
        <div className="register-body">
            <div className="register-container">
                <div className="register-header">
                    <h1>🧁 DulceLobito</h1>
                    <p>Crea tu cuenta</p>
                </div>

                <div className="register-form-section">
                    
                    {/* ⭐ Mostrar mensajes de estado */}
                    {successMessage && <p style={{ color: 'green', marginBottom: '1rem', fontWeight: 'bold' }}>{successMessage}</p>}
                    {error && <p style={{ color: 'red', marginBottom: '1rem', fontWeight: 'bold' }}>{error}</p>}

                    <form onSubmit={handleSubmit}>
                        
                        {/* ⭐ CAMPO 1: Nombre de Usuario (username) */}
                        <div className="register-input-group">
                            <label className="register-input-label" htmlFor="registerUsername">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="registerUsername"
                                className="register-text-input"
                                placeholder="usuario_unico"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        {/* ⭐ CAMPO 2: Correo Electrónico (useremail) */}
                        <div className="register-input-group">
                            <label className="register-input-label" htmlFor="registerEmail">Correo Electrónico</label>
                            <input
                                type="email"
                                id="registerEmail"
                                className="register-text-input"
                                placeholder="tu@correo.com"
                                value={useremail}
                                onChange={(e) => setUseremail(e.target.value)}
                                required
                            />
                        </div>

                        {/* ⭐ CAMPO 3: Contraseña (password) */}
                        <div className="register-input-group">
                            <label className="register-input-label" htmlFor="registerPassword">Contraseña</label>
                            <input
                                type="password"
                                id="registerPassword"
                                className="register-text-input"
                                placeholder="Mínimo 8 caracteres"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        
                        <div className="register-checkbox-wrapper">
                            {/* Dejé el checkbox por estética, pero no se usa en el backend */}
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