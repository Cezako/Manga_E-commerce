import React from 'react'
import { Link } from 'react-router-dom'


export const Header = () => {
    
    return (
        <header>
            <nav>
                <div className='mainTitle'>
                    <Link className='logo' to="/">Acceuil</Link>
                    <h1>MangaShop</h1>
                </div>
                <Link to="/Search">Trouver ma Séries</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
            </nav>
        </header>
    )
}