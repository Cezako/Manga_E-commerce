import {useState} from "react"
import {postSerie} from "../../helper/backend_helper.js"


export const Admin = () => {

    // ADD FORM PARAMETERS
    const [title, setTitle] = useState("")
    const [voTitle, setVoTitle] = useState("")
    const [authors, setAuthors] = useState("")
    const [illustrators, setIllustrators] = useState("")
    const [vfEditors, setVfEditors] = useState("")
    const [type, setType] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [pegi, setPegi] = useState(0)
    const [isEnded, setIsEnded] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [images, setImages] = useState([])

    // ERROR
    const [infoError, showInfoError] = useState(false)

    // GENRES
    const [genres, setGenres] = useState([
        { name: 'action', selected: false },
        { name: 'adventure', selected: false },
        { name: 'comedy', selected: false },
        { name: 'drama', selected: false },
        { name: 'fantasy', selected: false },
        { name: 'nekketsu', selected: false }
    ])

    const handleGenreChange = (index) => {
        const updatedGenres = [...genres]
        updatedGenres[index].selected = !updatedGenres[index].selected
        setGenres(updatedGenres)
        //console.log(genres)
    }


    // PEGI
    const pegiOptions = [
        { value: 0, label: 'Tous publics' },
        { value: 7, label: '7 ans et +' },
        { value: 12, label: '12 ans et +' },
        { value: 16, label: '16 ans et +' },
        { value: 18, label: '18 ans et + (public majeur)' },
    ]

    // MANGAS TYPES
    const typeOptions = ['Kodomo (子供)', 'Shōnen (少年)', 'Shōjo (少女)', 'Seinen (青年)', 'Josei (女性)', 'Seijin (成人)']

    // ADD FORM SUBMIT
    const handleAddSerieSubmit = (e) => {
        e.preventDefault()
        showInfoError(false)

        console.log({title, voTitle, authors, illustrators, vfEditors, type, genres, synopsis, pegi, isEnded, isVisible})

        const formData = new FormData()
        formData.append('title', title)
        formData.append('voTitle', voTitle)
        formData.append('authors', authors)
        formData.append('illustrators', illustrators)
        formData.append('vfEditors', vfEditors)
        formData.append('type', type)
        genres.forEach(genre => {
            if (genre.selected) {
                formData.append('genres', genre.name)
            }
        })
        formData.append('synopsis', synopsis)
        formData.append('pegi', pegi)
        formData.append('isEnded', isEnded)
        formData.append('isVisible', isVisible)
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }

        //console.log(formData)

        postSerie(formData)
        .then(() => {
            console.log("Serie created successfully !")
        })
        .catch((err) => {
            if (err && err.status === 400) {
                showInfoError(true)
                console.log(err)
            } else {
                console.log(err)
            }
        })
    }


    return (
        <>
            <h1>Admin</h1>
            
            <h2>Ajouter une série :</h2>

            <form onSubmit={handleAddSerieSubmit}>
                <label>
                    Titre 
                    <input onChange={(e) => setTitle(e.target.value)} type={"text"} name={"title"}/>
                </label>
                <label>
                    Titre VO 
                    <input onChange={(e) => setVoTitle(e.target.value)} type={"text"} name={"voTitle"} />
                </label>
                <label>
                    Auteurs 
                    <input onChange={(e) => setAuthors(e.target.value)} type={"text"} name={"authors"} />
                </label>
                <label>
                    Illustrateurs 
                    <input onChange={(e) => setIllustrators(e.target.value)} type={"text"} name={"illustrators"}/>
                </label>
                <label>
                    Editeur VF 
                    <input onChange={(e) => setVfEditors(e.target.value)} type={"text"} name={"vfEditors"}/>
                </label>
                <label>
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)} name={"type"}>
                        {typeOptions.map((option, i) => (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Genres :
                    {genres.map((genre, index) => (
                        <div key={index}>
                            <label>
                                {genre.name.charAt(0).toUpperCase() + genre.name.slice(1)}
                                <input
                                    type="checkbox"
                                    checked={genre.selected}
                                    onChange={() => handleGenreChange(index)}
                                />
                            </label>
                        </div>
                    ))}
                </label>
                <label>
                    Synopsis 
                    <textarea onChange={(e) => setSynopsis(e.target.value)} type={"text"} name={"synopsis"}/>
                </label>
                <label>
                    Pegi:
                    <select value={pegi} onChange={(e) => setPegi(e.target.value)} name={"pegi"}>
                        {pegiOptions.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Série visible ? 
                    <input onChange={(e) => setIsVisible(e.target.checked)} type={"checkbox"} name={"isVisible"} />
                </label>
                <label>
                    Série terminé ? 
                    <input onChange={(e) => setIsEnded(e.target.checked)} type={"checkbox"} name={"isEnded"} />
                </label>
                <label>
                    Images 
                    <input onChange={(e) => setImages(e.target.files)} type={"file"} name={"images"} multiple/>
                </label>

                <button> Valider </button>
            </form>

            {infoError ?
                <p>Certains champs sont vides ou incorrects</p>
            :
                <></>
            }
        </>
    )
}