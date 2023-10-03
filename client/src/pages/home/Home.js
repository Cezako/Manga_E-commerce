import {useState} from "react"
import {useEffect} from "react"
import {getSeries} from "../../helper/backend_helper.js"
//import {Link} from 'react-router-dom'

import {baseUrl} from "../../helper/url_helper.js"


export const Home = () => {

    const [series, setSeries] = useState([])

    useEffect(() => {
        getSeries()
            .then((serieData) => {
                console.log(serieData)
                setSeries(serieData.series)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <h1>Home page</h1>

            <h2>Nos Séries :</h2>

            <ul>
                {series.map((serie, index) => (
                    <li key={index}> 
                        {serie.title}
                        <ul>
                            {serie.images.map((image, i) => (
                                <li key={i}>
                                    <img src={`${baseUrl}${image}`} alt={`${serie.title}_img`} />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}