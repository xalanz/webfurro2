import React from 'react'
import LoginLayout from '../layout/LoginLayout'
import Contact from '../organisms/Contact'
import '../organisms/styles/login.css'
import Header from '../organisms/Header'

export default function Home() {
    return (
        <>
            <Header/>
            <LoginLayout/>
            <Contact/>
        </>
    )
}
