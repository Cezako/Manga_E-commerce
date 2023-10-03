import {useState} from "react"
import {postRegister} from '../../helper/backend_helper.js'
import {useNavigate} from "react-router-dom"

import {useSelector, useDispatch} from "react-redux"
import {addUser} from '../../store/slices/userSlice.js'

export const Register = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [isSubscribed, setIsSubscribed] = useState(false)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const user = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {email, username, password, isSubscribed}

        console.log(newUser)

        postRegister(newUser)
            .then((data) => {

                localStorage.setItem('jwt', data.jwt)

                dispatch(addUser(data))

                if (data.user.isAdmin) {
                    navigate("/admin")
                } else {
                    navigate("/profil")
                }
                //navigate("/login")
                
            })
            .catch((err) => console.log(err))
    }
    

    return(
        <>
            <h1>Register</h1>
            
            <form onSubmit={handleSubmit}>

                <label>
                    Email
                    <input onChange={(e) => setEmail(e.target.value)} type={"email"} name={"email"}/>
                </label>

                <label>
                    Nom d'utilisateur
                    <input onChange={(e) => setUsername(e.target.value)} type={"text"} name={"username"}/>
                </label>

                <label>
                    Mot de passe
                    <input onChange={(e) => setPassword(e.target.value)} type={"password"} name={"password"}/>
                </label>

                <label>
                    Subscribe ?
                    <input onChange={(e) => setIsSubscribed(e.target.checked)} type={"checkbox"} name={"subscribe"}/>
                </label>

                <button>Register</button>
            </form>
        </>
    )
}