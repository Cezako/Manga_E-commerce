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
                setSeries(serieData.products)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <h1>Page d'acceuil</h1>
    
            <h2>Nos Séries :</h2>
            <div>
                {series.map((serie, index) => (
                    <div key={index}>
                        {serie.title}
                        <div>
                            {serie.images.map((image, i) => (
                                <div key={i}>
                                    <img src={`${baseUrl}${image}`} alt={`${serie.title}_img`} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
        </>
    )
}