import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { playSong, getTopGenres } from '../util/spotify'
import { getAccessToken, logout } from '../util/auth'

const access_token = getAccessToken()

export default function Home() {
    const navigate = useNavigate()

    const play = () => navigate('/pick')

    useEffect(() => {
        if (!access_token) {
            navigate('/login')
        }
    }, [access_token])

    return (
        <div>
            <div className="flex font-mono justify-center bg-orange-400 text-6xl text-slate-800 px-4 py-4 rounded-full mb-4">
                <p>Song Game</p>
            </div>
            <div className="flex justify-center flex-col ">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full mb-2"
                    onClick={play}
                >
                    Play!
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}
