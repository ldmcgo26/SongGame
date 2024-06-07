import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate()
    const home = () => navigate('/')

    return (
        <div>
            <div className="flex font-mono items-center justify-center text-6xl text-slate-800 p-4">
                <button onClick={home}>Song Game</button>
            </div>
            <hr className="border-1 border-slate-800 mb-4"></hr>
        </div>
    )
}
