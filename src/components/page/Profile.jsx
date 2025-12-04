import React, { useState, useEffect } from 'react'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import keznit from '../organisms/img/keznit.jpg'
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
            // ✅ CORRECCIÓN: Usando sessionStorage (Consistente con Login y Header)
            const token = sessionStorage.getItem('token')

            if (!token) {
                // Si no hay token, simplemente mostramos el error sin intentar fetch
                setLoading(false)
                return 
            }

            // ✅ URL CORREGIDA: Usando el puerto 9090
            const response = await fetch('http://localhost:9090/api/users/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            if (!response.ok) {
                let errorMessage = 'Error al obtener el perfil.'
                
                if (response.status === 401 || response.status === 403) {
                    errorMessage = 'Sesión expirada o no autorizada. Vuelva a iniciar sesión.'
                    sessionStorage.removeItem('token') // Forzamos el logout
                } else {
                    try {
                        const errorData = await response.json()
                        if (errorData.error) {
                             errorMessage = errorData.error
                        }
                    } catch (e) {
                        errorMessage += ` (Estado HTTP: ${response.status})`
                    }
                }
                
                throw new Error(errorMessage)
            }
            
            const userData = await response.json()
            setUser(userData)
            setPurchases(userData.purchases || []) 
            
        } catch (err) {
            setError(err.message)
            // Si hay un error, el usuario no está autenticado o el token es malo.
            // Si el error es "No se encontró el token", el Header mostrará el login, lo cual es correcto.
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        // ❌ REGLA DE SEGURIDAD: Reemplazar window.confirm por un manejo interno o modal
        console.log('Logout iniciado desde Profile.jsx')
        
        sessionStorage.removeItem('token') // ✅ CORRECCIÓN: Usando sessionStorage
        setUser(null)
        setPurchases([])
        
        // Notificamos el cambio para que otros componentes (como Header) se actualicen
        window.dispatchEvent(new Event('authChange')); 
        
        // Redireccionar
        window.location.href = '/login'
    }

    if (loading) {
        return (
            <>
                <Header />
                <div className="profile-container">
                    <div className="loading-state">
                        <span style={{ fontSize: '3rem' }}>⏳</span>
                        <span>Cargando perfil...</span>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    if (error) {
        return (
            <>
                <Header />
                <div className="profile-container">
                    <div className="error-state">
                        <h2>⚠️ Error</h2>
                        <p>{error}</p>
                        <button onClick={() => window.location.href = '/login'}>
                            Ir al Login
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    
    if (!user) {
        return (
            <>
                <Header />
                <div className="profile-container">
                    <div className="error-state">
                        <h2>⚠️ No Autenticado</h2>
                        <p>No se pudo cargar la información del perfil. Por favor, inicie sesión.</p>
                        <button onClick={() => window.location.href = '/login'}>
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-banner"></div>
                    
                    {/* Botón de Logout local, pero usamos la lógica de sesión del Header */}
                    <button className="logout-button" onClick={handleLogout}>
                        <span></span>
                        <span>Cerrar sesión</span>
                    </button>
                    
                    <div className="profile-content">
                        <div className="profile-avatar">
                            <img 
                                src={keznit} 
                                alt={user.username}
                            />
                        </div>
                        
                        <div className="profile-info-header">
                            <h1>{user.username}</h1>
                            <span className="profile-role-badge">
                                🎭 {user.role}
                            </span>
                        </div>

                        <div className="profile-details-grid">
                            <div className="profile-detail-card">
                                <span className="icon">👤</span>
                                <strong>Nombre de Usuario</strong>
                                <div className="value">{user.username}</div>
                            </div>

                            <div className="profile-detail-card">
                                <span className="icon">📧</span>
                                <strong>Correo Electrónico</strong>
                                <div className="value">{user.email}</div>
                            </div>

                            <div className="profile-detail-card">
                                <span className="icon">🆔</span>
                                <strong>ID de Usuario</strong>
                                <div className="value">#{user.id}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="purchases-section">
                    <h2>Historial de Compras</h2>
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
                                {purchases.map((purchase, index) => (
                                    <tr key={purchase.id || index}>
                                        <td data-label="ID">#{purchase.id || index}</td>
                                        <td data-label="Producto">{purchase.productName || 'Producto Desconocido'}</td>
                                        <td data-label="Precio">${(purchase.price || 0).toLocaleString('es-CL')}</td>
                                        <td data-label="Fecha">
                                            {new Date(purchase.date || Date.now()).toLocaleDateString('es-ES', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-purchases">
                            <span className="no-purchases-icon">📦</span>
                            <p>No hay compras registradas todavía</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}