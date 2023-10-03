import {useState} from "react"
import {useEffect} from "react"
import {getProfil} from '../../helper/backend_helper.js'


export const Profil = () => {

    const [profil, setProfil] = useState({email: ''})

    useEffect(() => {

        getProfil()
            .then((data) => {

                setProfil(data)
            })
            .catch((err) => console.log(err))
            
    }, [])
    
    return(
        
        <>
            <h1>Welcome {profil.email} !</h1>
        </>
    )
}