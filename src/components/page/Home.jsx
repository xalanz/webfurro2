import React from 'react'
import Header from '../organisms/Header'
import Hero from '../organisms/Hero'
import Categories from '../organisms/Categories'
import FeaturedProducts from '../organisms/FeaturedProducts';
import Contact from '../organisms/Contact'
import Footer from '../organisms/Footer'
import '../organisms/styles/App.css'

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Contact />
            <Footer />
        </>
    )
}
