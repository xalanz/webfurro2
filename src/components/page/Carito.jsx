import React from 'react'
import Contact from '../organisms/Contact'
import Header from '../organisms/Header'
import CarritoProductos from '../organisms/CarritoProductos'
import '../organisms/styles/CaritoPro.css'

export default function Home() {
    return (
        <>
            <Header/>
            <CarritoProductos/>
            <Contact/>
        </>
    )
}
