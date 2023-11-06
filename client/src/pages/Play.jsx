import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTopGenres } from '../util/spotify'

export default function Play() {
    const navigate = useNavigate()
    const [genres, setGenres] = useState(null)
    const [checked, setChecked] = useState([])

    const handleCheck = (index) => {
        const newChecked = checked?.map((item, i) =>
            i === index ? !item : item
        )
        setChecked(newChecked)
    }
    
    const handleSubmit = () => {
        
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getTopGenres()
                const items = [...new Set(response.items.flatMap((i)=>i.genres))]
                setGenres(items)
                setChecked(new Array(items.length).fill(false))
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchData()
    }, [])

    const home = () => navigate('/')

    return (
        <div>
            <div className="flex justify-center bg-blue-500 text-9xl text-white px-4 py-2 rounded-full mb-4">
                <p>Song Game</p>
            </div>
            <div className="flex justify-center flex-col ">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                    onClick={home}
                >
                    Home
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full"
                    onClick={handleSubmit}
                >
                    Continue
                </button>
            </div>
            <div className=''>
                {genres?.map((item, i) => (
                    <button
                        key={i}
                        className={`flex ${checked[i] ? 'bg-blue-500 text-white' : ''}`}
                        onClick={() => handleCheck(i)}
                    >
                        {item.split(" ").map((n)=>n[0].toUpperCase()+n.slice(1)).join(" ")}
                    </button>
                ))}
            </div>
        </div>
    )
}
