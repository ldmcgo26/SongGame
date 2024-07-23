import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAccessToken } from '../util/auth'
import Login from './Login'
import Header from '../components/Header'

export default function Home() {
    const [accessToken, setAccessToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const callGetAccessToken = async () => {
            const newToken = await getAccessToken()
            console.log(newToken)
            setAccessToken(newToken)
        }
        callGetAccessToken()
    }, [])

    const play = () => navigate('/play')

    const logout = () => {
        window.localStorage.removeItem('access_token')
        window.localStorage.removeItem('refresh_token')
        setAccessToken(null)
    }

    return (
        <div>
            <Header></Header>
            <div className="flex font-mono flex-col items-center">
                <div className="w-1/2">
                    {accessToken ? (
                        <div className="flex justify-center flex-col ">
                            <p className="py-2">
                                Song Game lets you play a song guessing game
                                without needing someone to randomize the music
                                for you! Click play and choose artists and
                                genres from a personalized list to begin the
                                game!
                            </p>
                            <button
                                className="bg-orange-300 border-2 border-slate-800 shadow-lg hover:bg-orange-500 text-slate-800 px-4 py-2 rounded-full mb-2"
                                onClick={play}
                            >
                                Play!
                            </button>
                            <button
                                className="bg-orange-300 border-2 border-slate-800 shadow-lg hover:bg-orange-500 text-slate-800 px-4 py-2 rounded-full"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Login></Login>
                    )}
                </div>
            </div>
        </div>
    )
}
