import { useNavigate } from 'react-router-dom'
import { getAccessToken, logout } from '../util/auth'
import Login from './Login'

const access_token = getAccessToken()

export default function Home() {
    const navigate = useNavigate()

    const play = () => navigate('/play')

    return (
        <div>
            <div className="flex font-mono justify-center bg-orange-400 text-6xl text-slate-800 px-4 py-4 rounded-full mb-4">
                <p>Song Game</p>
            </div>
            {access_token ? (
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
            ) : (
                <Login></Login>
            )}
        </div>
    )
}
