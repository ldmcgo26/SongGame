import { useState, useEffect } from 'react'
import { generatePlaylist, setRepeat, playSong } from '../util/spotify'

export default function Play(props) {
    const [queue, setQueue] = useState(
        // [{uri: "spotify:track:7lEptt4wbM0yJTvSG5EBof"}]
    )

    useEffect(() => {
        const fetch = async () => {
            try {
                const playlist = await generatePlaylist(props.artists, props.genres);
                setQueue(playlist);
            } catch (error) {
                console.error("Error fetching playlist:", error);
            }
        };

        fetch();
    }, [props.artists, props.genres]);

    const [points, setPoints] = useState(Array(parseInt(props.players)).fill(0))

    const handleClick = () => {
        const fetchPlaySong = async () => await playSong(queue?.[0]?.uri)
        fetchPlaySong()
        setRepeat()
        // setQueue()
    }

    console.log(queue)

    return (
        <div className="">
            {points?.map((value, i) => (
                <div className='flex justify-center'>
                    <p className="flex font-mono justify-center bg-slate-300 text-2xl text-slate-800 p-4 rounded-full m-2">
                        Player {i + 1}
                    </p>
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
                </div>
            ))}
            <div className='flex justify-center'>
            <button
                onClick={handleClick}
                className="font-mono bg-slate-300 text-2xl text-slate-800 p-4 rounded-full m-2"
            >
                Play Song
            </button>
            </div>
        </div>
    )
}
