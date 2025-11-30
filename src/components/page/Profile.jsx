import React, { useState, useEffect } from 'react'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import '../organisms/styles/App.css'
import '../organisms/styles/Profile.css'

export default function Profile() {
    const [user, setUser] = useState(null)
    const [purchases, setPurchases] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem('token')

            // ⭐ CORRECCIÓN CLAVE 1: Verificar si el token existe
            if (!token) {
                // Si no hay token, no podemos hacer la solicitud. 
                // Esto podría ser un punto para redirigir al usuario al login.
                throw new Error('No se encontró el token de sesión. Inicie sesión.');
            }

            // La URL está correcta: apunta al endpoint de perfil autenticado.
            const response = await fetch('http://localhost:9090/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            if (!response.ok) {
                // Si la respuesta no es OK (ej. 401 Unauthorized), 
                // leemos el error del cuerpo si es JSON.
                let errorMessage = 'Error al obtener el perfil.';
                try {
                    const errorData = await response.json();
                    if (response.status === 401 || response.status === 403) {
                        errorMessage = 'Sesión expirada o no autorizada. Vuelva a iniciar sesión.';
                    } else if (errorData.error) {
                         errorMessage = errorData.error;
                    }
                } catch (e) {
                    // Si no es JSON, usamos el estado HTTP
                    errorMessage += ` (Estado HTTP: ${response.status})`;
                }
                
                throw new Error(errorMessage);
            }
            
            const userData = await response.json()
            
            // Los datos del backend son: {id, username, email, role}.
            setUser(userData)
            
            // El backend no devuelve 'purchases', por lo que mantenemos el fallback a []
            // Si implementas 'purchases', deberás hacer otra llamada API o modificar el backend.
            setPurchases(userData.purchases || []) 
            
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Nuevo: handler para cerrar sesión
    const handleLogout = () => {
        const ok = window.confirm('¿Deseas cerrar la sesión?')
        if (!ok) return

        // Limpiar token y cualquier otro dato de sesión/local
        localStorage.removeItem('token')
        // Si guardas otros datos de sesión, límpialos también:
        // localStorage.removeItem('user')
        setUser(null)
        setPurchases([])

        // Redirigir al login o a la página principal
        window.location.href = '/login'
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error: {error}</div>
    
    // ⭐ CORRECCIÓN CLAVE 2: Si el fetch fue exitoso pero user es null (por algún error lógico), 
    // mostramos un mensaje para evitar errores de renderizado.
    if (!user) return <div>No se pudo cargar la información del perfil.</div>

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-info">
                    <h1>Perfil de Usuario</h1>
                    {/* Botón para cerrar sesión */}
                    <button className="logout-button" onClick={handleLogout}>Cerrar sesión</button>

                    {/* El backend devuelve 'username' y 'role', por lo que esto funciona */}
                    <p><strong>Usuario:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p> 
                    <p><strong>Rol:</strong> {user.role}</p>
                </div>

                <div className="purchases-section">
                    <h2>Mis Compras</h2>
                    {purchases.length > 0 ? (
                        <table className="purchases-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchases.map(purchase => (
                                    <tr key={purchase.id}>
                                        <td>{purchase.id}</td>
                                        <td>{purchase.productName}</td>
                                        <td>${purchase.price}</td>
                                        <td>{new Date(purchase.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No hay compras registradas</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}