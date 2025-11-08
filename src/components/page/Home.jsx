import React from 'react'
import Header from '../organisms/Header'
import Hero from '../organisms/Hero'
import Productos from '../organisms/Productos'
import About from '../organisms/About'
import Contact from '../organisms/Contact'
import Footer from '../organisms/Footer'
import '../organisms/styles/App.css'

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Productos />
            <About />
            <Contact />
            <Footer />
        </>
    )
}
