import { useState, useEffect } from 'react'
import { generatePlaylist, setRepeat } from '../util/spotify'

export default function Play(props) {
    const [queue, setQueue] = useState()
    const [points, setPoints] = useState(Array(parseInt(props.players)).fill(0))

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const playlist = await generatePlaylist(props.artists, props.genres);
    //         setQueue(playlist);
    //       } catch (error) {
    //         console.error('Error fetching playlist:', error);
    //       }
    //     };
    //     fetchData();
    //   }, []);

    useEffect(() => {
        const task = async () => setRepeat()
        task()
    },[])

    const handleClick = () => {

    }

    return (
        <div className="flex justify-center">
            {points?.map((value, i) => (
                    <input
                        key={i}
                        className="border-slate-800 border-2 rounded-lg text-slate-800 p-4 m-2"
                        type="number"
                        value={value}
                        onChange={(e) => {
                            const newPoints = [...points]
                            newPoints[i] = e.target.value
                            setPoints(newPoints)
                        }}
                    />
            ))}
            <button>

            </button>
        </div>
    )
}
