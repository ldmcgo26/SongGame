import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTopGenres } from '../util/spotify'
import Play from './Play'

const Alert = (props) => (
    <div className="z-50 fixed bottom-4 font-mono left-4 w-1/5 h-8vh bg-slate-400 text-slate-800 p-4 rounded-lg">
        {props.message}
    </div>
)

export default function Pick() {
    const navigate = useNavigate()
    const [genres, setGenres] = useState(null)
    const [artists, setArtists] = useState(null)
    const [checkedGenres, setCheckedGenres] = useState([])
    const [checkedArtists, setCheckedArtists] = useState([])
    const [submitArtist, setSubmitArtist] = useState([])
    const [submitGenre, setSubmitGenre] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [players, setPlayers] = useState(0)

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
        setSubmitArtist(
            checkedArtists
                .map((item, i) => {
                    if (item) return artists[i][1]
                })
                .filter((i) => i)
        )
        setSubmitGenre(
            checkedGenres
                .map((item, i) => {
                    if (item) return genres[i]
                })
                .filter((i) => i)
        )
    }

    useEffect(() => {
        if (
            submitArtist.length > 0 &&
            submitGenre.length > 0 &&
            submitArtist.length + submitGenre.length <= 5
        ) {
            setSubmitted(true)
        } else {
            setShowAlert(true)
        }
    }, [submitArtist, submitGenre])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTopGenres()
                const currentGenres = [
                    ...new Set(response.items.flatMap((i) => i.genres)),
                ]
                const currentArtists = response.items.map((i) => [i.name, i.id])
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

    useEffect(() => {
        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }, [showAlert])

    const home = () => navigate('/')

    return (
        <div>
            <p className="flex font-mono justify-center bg-orange-400 text-6xl text-slate-800 p-4 rounded-full mx-2 mb-4">
                Song Game
            </p>
            {!submitted ? (
                <div>
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
                    <p className="flex font-mono justify-center bg-slate-300 text-2xl text-slate-800 p-4 rounded-full m-2">
                        Pick Number of Players
                    </p>
                    <div className="flex justify-center">
                        <input
                            className="border-slate-800 border-2 rounded-lg text-slate-800 p-4 m-2"
                            type="number"
                            value={players}
                            onChange={(e) => setPlayers(e.target.value)}
                        />
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
                                {item[0]
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
            ) : (
                <Play
                    artists={submitArtist.join()}
                    genres={submitGenre.join()}
                    players={players}
                ></Play>
            )}
            {showAlert ? (
                <div>
                    <Alert message="Please select 5 or fewer combined Artists/Genres, but at least one of each"></Alert>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}
