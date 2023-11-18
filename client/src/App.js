// ROUTES
import {Route, Routes} from "react-router-dom"
import {privateRoutes, publicRoutes, adminRoutes} from "./router/routes"
import {Header} from "./componnents/header/Header.js"

// MIDDLEWARE
import {AuthMiddleware} from "./router/AuthMiddleware"
import {AdminMiddleware} from "./router/AdminMiddleware"

// REACT REDUX
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

// RELOG USER
import {getVerifyToken} from "./helper/backend_helper.js"
import {addUser} from "./store/slices/userSlice.js"
import {deleteUser} from './store/slices/userSlice.js'

// CSS
import "./utils/Normalize/normalize.css"
import "./App.css"


function App() {
	
	const {user} = useSelector(state => state)
	const dispatch = useDispatch()

	useEffect(() => {

		if (localStorage.getItem('jwt') && !user.isLogged) {
			
			getVerifyToken()
			.then(userData => {
				
				dispatch(addUser(userData))
			})
			.catch((err) => {
				console.log(err)

				// TROUVER UNE FACON DE REMOVE JWT A L'EXPIRATION !!
				//dispatch(deleteUser())
				//localStorage.removeItem('jwt')
			})
		}
	}, [])


	return (
		<>
			<Header/>

			<div class="app-container">

				<Routes>
					{publicRoutes.map((route, i) => (
						<Route 
							path={route.path}
							element={route.component}
							key={i}
							exact={true}
						/>
					))}

					{privateRoutes.map((route, i) => (
						<Route 
							path={route.path} 
							element={<AuthMiddleware> {route.component} </AuthMiddleware>} 
							key={i} 
							exact={true}
						/>
					))}

					{adminRoutes.map((route, i) => (
						<Route 
							path={route.path} 
							element={<AdminMiddleware> {route.component} </AdminMiddleware>}
							key={i} 
							exact={true}
						/>
					))}
				</Routes>

			</div>
		</>
	)
}


export default App
