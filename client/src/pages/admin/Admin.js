

export const Admin = () => {

    return(
        <>
            <h1>Admin</h1>
        </>
    )
}


/*
import {useState} from "react"
import {useEffect} from "react"
import {getUsers, getProducts, postProduct, deleteProduct} from '../../helper/backend_helper.js'


export const Admin = () => {

    const [users, setUsers] = useState([])
    const [products, setProducts] = useState([])

    // Add-form
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [images, setImages] = useState(false)

    // Update form
    const [showFormUpdate, setShowFormUpdate] = useState(false)
    const [newName, setNewName] = useState("")
    const [newPrice, setNewPrice] = useState(0)
    const [newQuantity, setNewQuantity] = useState(0)
    const [newDescription, setNewDescription] = useState("")
    const [newIsVisible, setNewIsVisible] = useState(false)


    useEffect(() => {

        getUsers()
        .then((data) => {

            setUsers(data)
        })
        .catch((err) => console.log(err))

        getProducts()
        .then((data) => {

            setProducts(data)
        })
        .catch((err) => console.log(err))

    }, [])


    const handleAddSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('quantity', quantity)
        formData.append('description', description)
        formData.append('isVisible', isVisible)
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('image', images[i])
            }
        }

        //console.log({name, price, quantity, description, isVisible, images})

        postProduct(formData)
        .then(() => {

            getProducts()
            .then((data) => {
    
                setProducts(data)
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => {
            console.log(err)
        })
    }


    const handleUpdateSubmit = (e, id) => {
        e.preventDefault()
    }


    const handleDeleteClick = (id) => {

        deleteProduct(id.toString())
        .then(() => {

            getProducts()
            .then((data) => {
    
                setProducts(data)
            })
            .catch((err) => console.log(err))
        })
        .catch((err) => {
            console.log(err)
        })
    }


    return(

        <>
            <h1>Admin dashboard</h1>


            <h2>Users list :</h2>
            <ul>
                {users.map((user, i) => (
                    <li key={i}>{user.email}</li>
                ))}
            </ul>

            
            <h2>Add Product :</h2>
            <form onSubmit={handleAddSubmit}>
                <label>
                    Name <input onChange={(e) => setName(e.target.value)} type={"name"} name={"name"}/>
                </label>
                <label>
                    Price <input onChange={(e) => setPrice(e.target.value)} type={"number"} name={"price"} />
                </label>
                <label>
                    Quantity <input onChange={(e) => setQuantity(e.target.value)} type={"number"} name={"quantity"} />
                </label>
                <label>
                    Description <input onChange={(e) => setDescription(e.target.value)} type={"description"} name={"description"}/>
                </label>
                <label>
                    Visible <input onChange={(e) => setIsVisible(e.target.checked)} type={"checkbox"} name={"isVisible"} />
                </label>
                <label>
                    Images <input onChange={(e) => setImages(e.target.value)} type={"file"} name={"fichier"} />
                </label>
                <button> OK </button>
            </form>


            <h2>Products list :</h2>
            <ul>
                {products.map((product, i) => (
                    <li key={i}>
                        <h3>{product.name}</h3>
                        <button onClick={() => handleDeleteClick(product._id)}>Remove</button>
                        <button onClick={() => setShowFormUpdate(true)}>More</button>
                        {showFormUpdate ?
                        <>
                            <h2>Update Product infos :</h2>
                            <form onSubmit={(e) => handleUpdateSubmit(e, product._id)}>
                                <label>
                                    Name <input onChange={(e) => setNewName(e.target.value)} type={"name"} name={"name"}/>
                                </label>
                                <label>
                                    Price <input onChange={(e) => setNewPrice(e.target.value)} type={"number"} name={"price"} />
                                </label>
                                <label>
                                    Quantity <input onChange={(e) => setNewQuantity(e.target.value)} type={"number"} name={"quantity"} />
                                </label>
                                <label>
                                    Description <input onChange={(e) => setNewDescription(e.target.value)} type={"description"} name={"description"}/>
                                </label>
                                <label>
                                    Visible <input onChange={(e) => setNewIsVisible(e.target.checked)} type={"checkbox"} name={"isVisible"} />
                                </label>
                                <button> OK </button>
                            </form>
                        </>
                        :
                        <></>
                        }
                    </li>
                ))}
            </ul>
        </>
    )
}

*/