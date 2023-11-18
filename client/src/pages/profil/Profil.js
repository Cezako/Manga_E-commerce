import {useState} from "react"
import {useEffect} from "react"
import {getProfil} from '../../helper/backend_helper.js'


export const Profil = () => {

    const [profil, setProfil] = useState({})

    useEffect(() => {

        getProfil()
            .then((data) => {

                console.log(data.users)
                setProfil(data.users)
            })
            .catch((err) => console.log(err))
            
    }, [])
    
    return(
        
        <>
            <h1>Welcome {profil.username} !</h1>
        </>
    )
}