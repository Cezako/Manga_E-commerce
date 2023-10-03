import React from "react"
import {Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
import {useEffect, useState} from "react"


export const AuthMiddleware = (props) => {

    const [loaded, setLoaded] = useState(false)
    const {user} = useSelector(state => state)


    useEffect(() => {

        //console.log(user)
        
        if (!user.isLogged) {
            setLoaded(false)
        } else {
            setLoaded(true)
        }
    }, [user])


    if (!localStorage.getItem("jwt")) {
        return (
            <Navigate to={"/login"}/>
        )
    }
    switch (loaded) {
        case true: {
            return props.children

        }
        case false: {
            return <h1>Loading</h1>
            
        }
        default: return <h1>Loading</h1>
    }
}
