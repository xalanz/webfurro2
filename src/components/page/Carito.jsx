import React from 'react'
import Contact from '../organisms/Contact'
import '../organisms/styles/login.css'
import Header from '../organisms/Header'
import CarritoProductos from '../organisms/CarritoProductos'

export default function Home() {
    return (
        <>
            <Header/>
            <CarritoProductos/>
            <Contact/>
        </>
    )
}
