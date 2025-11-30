import React, { useState, useEffect } from 'react'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'
import '../organisms/styles/App.css'

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
            const response = await fetch('http://localhost:9090/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            
            if (!response.ok) throw new Error('Error fetching profile')
            
            const userData = await response.json()
            setUser(userData)
            setPurchases(userData.purchases || [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <>
            <Header />
            <div className="profile-container">
                <div className="profile-info">
                    <h1>Perfil de Usuario</h1>
                    <p><strong>Usuario:</strong> {user?.username}</p>
                    <p><strong>Rol:</strong> {user?.role}</p>
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
