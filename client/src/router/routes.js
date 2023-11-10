// public routes
import {Home} from "../pages/home/Home.js"
import {Search} from "../pages/product/Search.js"
import {Serie} from "../pages/product/Serie.js"
import {Register} from "../pages/auth/Register.js"
import {Login} from "../pages/auth/Login.js"

// private routes
import {Profil} from "../pages/profil/Profil.js"

// admin routes
import {Admin} from "../pages/admin/Admin.js"


const publicRoutes = [
    {path: "/", component: <Home />},
    {path: "/search", component: <Search/>},
    {path: "/serie/:id", component: <Serie/>},
    {path: "/register", component: <Register/>},
    {path: "/login", component: <Login/>},
]

const privateRoutes = [
    {path: "/profil", component: <Profil/>},
]

const adminRoutes = [
    {path: "/admin", component: <Admin/>},
]

export {publicRoutes, privateRoutes, adminRoutes}