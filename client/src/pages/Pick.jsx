import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTopGenres } from '../util/spotify'
import Play from './Play'
import Header from '../components/Header'

const Alert = (props) => (
    <div className="z-50 fixed bottom-4  left-4 w-1/5 h-8vh bg-slate-400 text-slate-800 p-4 rounded-lg">
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
            <Header></Header>
            <div className="flex font-mono flex-col items-center">
                <div className="w-3/4">
                    {!submitted ? (
                        <div>
                            <p className="flex justify-center bg-slate-200 border-slate-800 border-2 text-2xl text-slate-800 p-4 rounded-full m-2">
                                Pick Number of Players
                            </p>
                            <div className="flex justify-center">
                                <input
                                    className="border-slate-800 border-2 rounded-lg text-slate-800 p-4 m-2"
                                    type="number"
                                    value={players}
                                    onChange={(e) => setPlayers(e.target.value)}
                                    max={8}
                                    min={0}
                                />
                            </div>
                            <p className="flex justify-center bg-slate-200 text-2xl text-slate-800 border-slate-800 border-2 px-4 py-4 rounded-full m-2">
                                Pick Artists
                            </p>
                            <div className="grid grid-cols-2 mx-1">
                                {artists?.map((item, i) => (
                                    <button
                                        key={i}
                                        className={`flex justify-center py-1 m-1 rounded-full shadow-lg ${
                                            checkedArtists[i]
                                                ? 'text-slate-800 bg-orange-500'
                                                : 'text-slate-800 bg-orange-200'
                                        }`}
                                        onClick={() => handleCheckArtists(i)}
                                    >
                                        {item[0]
                                            .split(' ')
                                            .map(
                                                (n) =>
                                                    n[0].toUpperCase() +
                                                    n.slice(1)
                                            )
                                            .join(' ')}
                                    </button>
                                ))}
                            </div>
                            <p className="flex justify-center bg-slate-200 border-slate-800 border-2 text-2xl text-slate-800 px-4 py-4 rounded-full m-2">
                                Pick Genres
                            </p>
                            <div className="grid grid-cols-3 mx-1">
                                {genres?.map((item, i) => (
                                    <button
                                        key={i}
                                        className={`flex justify-center py-1 m-1 rounded-full shadow-lg ${
                                            checkedGenres[i]
                                                ? 'text-slate-800 bg-orange-500'
                                                : 'text-slate-800 bg-orange-200'
                                        }`}
                                        onClick={() => handleCheckGenres(i)}
                                    >
                                        {item
                                            .split(' ')
                                            .map(
                                                (n) =>
                                                    n[0].toUpperCase() +
                                                    n.slice(1)
                                            )
                                            .join(' ')}
                                    </button>
                                ))}
                            </div>
                            <hr className="border-1 border-slate-800 my-4"></hr>
                            <div className="flex justify-center flex-col mx-2 mt-4 mb-20">
                                <button
                                    className="bg-orange-200 border-2 border-slate-800 shadow-lg hover:bg-orange-500 text-slate-800 px-4 py-2 rounded-full"
                                    onClick={handleSubmit}
                                >
                                    Continue
                                </button>
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
                            <Alert message="Select 5 or fewer artists and genres, but at least one of each"></Alert>
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    )
}
