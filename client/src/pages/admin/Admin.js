import {useState} from "react"
import {postSerie} from "../../helper/backend_helper.js"


export const Admin = () => {

    const [title, setTitle] = useState("")
    const [voTitle, setVoTitle] = useState("")
    const [authors, setAuthors] = useState("")
    const [illustrators, setIllustrators] = useState("")
    const [type, setType] = useState("")
    const [genres, setGenres] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [pegi, setPegi] = useState(0)
    const [isEnded, setIsEnded] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [images, setImages] = useState([])


    const handleAddSerieSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', title)
        formData.append('voTitle', voTitle)
        formData.append('authors', authors)
        formData.append('illustrators', illustrators)
        formData.append('type', type)
        formData.append('genres', genres)
        formData.append('synopsis', synopsis)
        formData.append('pegi', pegi)
        formData.append('isEnded', isEnded)
        formData.append('isVisible', isVisible)
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }

        console.log(formData)

        postSerie(formData)
        .then(() => {
            console.log("success")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (

        <>
            <h1>Admin dashboard</h1>
            
            <h2>Add Product :</h2>

            <form onSubmit={handleAddSerieSubmit}>
                <label>
                    Titre <input onChange={(e) => setTitle(e.target.value)} type={"text"} name={"title"}/>
                </label>
                <label>
                    Titre VO <input onChange={(e) => setVoTitle(e.target.value)} type={"text"} name={"voTitle"} />
                </label>
                <label>
                    Auteurs <input onChange={(e) => setAuthors(e.target.value)} type={"text"} name={"authors"} />
                </label>
                <label>
                    Illustrateurs <input onChange={(e) => setIllustrators(e.target.value)} type={"text"} name={"illustrators"}/>
                </label>
                <label>
                    Type <input onChange={(e) => setType(e.target.value)} type={"text"} name={"type"}/>
                </label>
                <label>
                    Genres <input onChange={(e) => setGenres(e.target.value)} type={"text"} name={"genres"}/>
                </label>
                <label>
                    Synopsis <input onChange={(e) => setSynopsis(e.target.value)} type={"description"} name={"synopsis"}/>
                </label>
                <label>
                    Pegi <input onChange={(e) => setPegi(e.target.value)} type={"number"} name={"pegi"}/>
                </label>
                <label>
                    Série visible ? <input onChange={(e) => setIsVisible(e.target.checked)} type={"checkbox"} name={"isVisible"} />
                </label>
                <label>
                    Série terminé ? <input onChange={(e) => setIsEnded(e.target.checked)} type={"checkbox"} name={"isEnded"} />
                </label>
                <label>
                    Images <input onChange={(e) => setImages(e.target.files)} type={"file"} name={"images"} multiple/>
                </label>

                <button> OK </button>
            </form>
        </>
    )
}