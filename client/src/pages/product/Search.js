import {useState, useEffect} from "react"
import {getSeries, getSearchedSeries} from "../../helper/backend_helper.js"


export const Search = () => {

    const [series, setSeries] = useState([])
    const [search, setSearch] = useState([])
    const [searchResult, setSearchResult] = useState([])

    
    useEffect(() => {
        getSeries()
            .then((serieData) => {
                console.log(serieData)
                setSeries(serieData.series)
            })
            .catch((err) => console.log(err))
    }, [])

    /*
    useEffect(() => {
        getSearchedSeries(search)
            .then((serieData) => {
                console.log(serieData)
                setSearchResult(serieData.series)
            })
            .catch((err) => console.log(err))
    }, [search])
    */
    
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
                    </li>
                ))}
            </ul>


            <h2>Autres séries :</h2>
            <ul>
                {series.map((serie, i) => (
                    <li key={i}>
                        {serie.title}
                    </li>
                ))}
            </ul>
        </>
    )
}