import { useNavigate } from 'react-router-dom'
import { getAccessToken, logout } from '../util/auth'
import Login from './Login'
import Header from '../components/Header'

const access_token = getAccessToken()

export default function Home() {
    const navigate = useNavigate()

    const play = () => navigate('/play')

    return (
        <div>
            <Header></Header>
            <div className="flex font-mono flex-col items-center">
                <div className="w-1/2">
                    {access_token ? (
                        <div className="flex justify-center flex-col ">
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
