import {useState} from "react"
import {postLogin} from '../../helper/backend_helper.js'
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {addUser} from '../../store/slices/userSlice.js'


export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [infoError, showinfoError] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()

        postLogin({email, password})
            .then((data) => {

                //dispatch(user)
                localStorage.setItem('jwt', data.jwt)
                console.log(data)
                dispatch(addUser(data))

                if (data.user.isAdmin) {
                    navigate("/admin")
                } else {
                    navigate("/profil")
                }
                
            })
            .catch((err) => {
                console.log(err)
                showinfoError(true)
            })
    }
    

    return(
        <>
            <h1>Login</h1>
            
            <form onSubmit={handleSubmit}>

                <label>
                    Email
                    <input onChange={(e) => setEmail(e.target.value)} type={"email"} name={"email"}/>
                </label>

                <label>
                    Mot de passe
                    <input onChange={(e) => setPassword(e.target.value)} type={"password"} name={"password"}/>
                </label>

                <button>Connexion</button>

                {infoError ?
                    <p>Invalid connexions informations ...</p>
                :
                    <></>
                }
            </form>
        </>
    )
}