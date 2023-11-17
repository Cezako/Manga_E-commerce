import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import {deleteUser} from '../../store/slices/userSlice.js'


export const Header = () => {

    const {user} = useSelector(state => state)
    const dispatch = useDispatch()

    const handleLogout = () => {

        dispatch(deleteUser())
        localStorage.clear()
    }
    
    return (
        <header>
            <nav>
                <div className='mainTitle'>
                    <button><Link className='logo' to="/">Acceuil</Link></button>
                    <h1>MangaShop</h1>
                </div>
                <button><Link to="/Search">Trouver ma Série</Link></button>

                {user.isAdmin?
                    <button><Link to="/Admin">Admin</Link></button>
                :
                    <></>
                }

                {user.isLogged?
                    <button onClick={handleLogout}>Logout</button>
                :
                    <>
                        <button> <Link to="/Login">Login</Link></button>
                        <button> <Link to="/Register">Register</Link></button>
                    </>
                }
            </nav>
        </header>
    )
}