import {useState, useEffect} from "react"
import {getSeries, getSearchedSeries} from "../../helper/backend_helper.js"

import {baseUrl} from "../../helper/url_helper.js"


export const Search = () => {

    const [series, setSeries] = useState([])
    const [search, setSearch] = useState([])
    const [searchResult, setSearchResult] = useState([])

    
    useEffect(() => {
        getSeries()
            .then((serieData) => {
                console.log(serieData)
                setSeries(serieData.products)
            })
            .catch((err) => console.log(err))
    }, [])


    //search update
    useEffect(() => {
        getSearchedSeries(search)
            .then((serieData) => {
                console.log(serieData)
                setSearchResult(serieData.series)
            })
            .catch((err) => console.log(err))
    }, [search])
    
    
    //search enter
    const handleSubmit = (e) => {
        e.preventDefault()

        getSearchedSeries(search)
            .then((serieData) => {
                console.log(serieData)
                setSearchResult(serieData.series)
            })
            .catch((err) => console.log(err))
    }


    return (
        <>
            <h1>Search page</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Votre recherche :
                    <input onChange={(e) => setSearch(e.target.value)} type={"search"} name={"search"}/>
                </label>

                <button>Search</button>
            </form>


            <h2>Résultats :</h2>
            <ul>
                {searchResult.map((serie, i) => (
                    <li key={i}>
                        {serie.title}
                        {serie.images.map((image, i) => (
                            <div key={i}>
                                <img src={`${baseUrl}${image}`} alt={`${serie.title}_img`} />
                            </div>
                        ))}
                    </li>
                ))}
            </ul>

            <h2>Autres séries :</h2>
            <div>
                {series.map((serie, i) => (
                    <div key={i}>
                        {serie.title}
                        {serie.images.map((image, i) => (
                            <div key={i}>
                                <img src={`${baseUrl}${image}`} alt={`${serie.title}_img`} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
    
}