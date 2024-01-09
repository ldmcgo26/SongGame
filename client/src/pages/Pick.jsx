import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTopGenres } from '../util/spotify'

export default function Pick() {
    const navigate = useNavigate()
    const [genres, setGenres] = useState(null)
    const [artists, setArtists] = useState(null)
    const [checkedGenres, setCheckedGenres] = useState([])
    const [checkedArtists, setCheckedArtists] = useState([])

    const handleCheckGenres = (index) => {
        const newChecked = checkedGenres?.map((item, i) =>
            i === index ? !item : item
        )
        setCheckedGenres(newChecked)
    }

    const handleCheckArtists = (index) => {
        const newChecked = checkedArtists?.map((item, i) =>
            i === index ? !item : item
        )
        setCheckedArtists(newChecked)
    }

    const handleSubmit = () => {
        navigate('/play')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTopGenres()
                const currentGenres = [
                    ...new Set(response.items.flatMap((i) => i.genres)),
                ]
                const currentArtists = response.items.map((i) => i.name)
                setGenres(currentGenres)
                setArtists(currentArtists)
                setCheckedGenres(new Array(currentGenres.length).fill(false))
                setCheckedArtists(new Array(currentArtists.length).fill(false))
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchData()
    }, [])

    const home = () => navigate('/')

    return (
        <div>
            <p className="flex font-mono justify-center bg-orange-400 text-6xl text-slate-800 p-4 rounded-full mx-2 mb-4">
                Song Game
            </p>
            <div className="flex font-mono justify-center flex-col mx-2 gap-2">
                <button
                    className="bg-orange-300 hover:bg-orange-500 text-slate-800 px-4 py-2 rounded-full"
                    onClick={home}
                >
                    Home
                </button>
                <button
                    className="bg-orange-300 hover:bg-orange-500 text-slate-800 px-4 py-2 rounded-full"
                    onClick={handleSubmit}
                >
                    Continue
                </button>
            </div>
            <p className="flex font-mono justify-center bg-slate-300 text-2xl text-slate-800 px-4 py-4 rounded-full m-2">
                Pick Artists
            </p>
            <div className="grid grid-cols-2 mx-1">
                {artists?.map((item, i) => (
                    <button
                        key={i}
                        className={`flex justify-center py-1 m-1 rounded-full font-mono ${
                            checkedArtists[i]
                                ? 'bg-blue-500 text-white'
                                : 'text-slate-800 bg-orange-200'
                        }`}
                        onClick={() => handleCheckArtists(i)}
                    >
                        {item
                            .split(' ')
                            .map((n) => n[0].toUpperCase() + n.slice(1))
                            .join(' ')}
                    </button>
                ))}
            </div>
            <p className="flex font-mono justify-center bg-slate-300 text-2xl text-slate-800 px-4 py-4 rounded-full m-2">
                Pick Genres
            </p>
            <div className="grid grid-cols-3 mx-1">
                {genres?.map((item, i) => (
                    <button
                        key={i}
                        className={`flex justify-center py-1 m-1 rounded-full font-mono ${
                            checkedGenres[i]
                                ? 'bg-blue-500 text-white'
                                : 'text-slate-800 bg-orange-200'
                        }`}
                        onClick={() => handleCheckGenres(i)}
                    >
                        {item
                            .split(' ')
                            .map((n) => n[0].toUpperCase() + n.slice(1))
                            .join(' ')}
                    </button>
                ))}
            </div>
        </div>
    )
}
