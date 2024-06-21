import { useState, useEffect } from 'react'
import { generatePlaylist, setRepeat, playSong } from '../util/spotify'

export default function Play(props) {
    const [queue, setQueue] = useState()
    const [curSong, setCurSong] = useState('Play the first song!')
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const playlist = await generatePlaylist(
                    props.artists,
                    props.genres
                )
                setQueue(playlist)
            } catch (error) {
                console.error('Error fetching playlist:', error)
            }
        }

        fetch()
    }, [props.artists, props.genres])

    const [points, setPoints] = useState(Array(parseInt(props.players)).fill(0))

    const handleClick = () => {
        const fetchPlaySong = async () => {
            try {
                await playSong(queue?.[0]?.uri)
                setCurSong(
                    queue?.[0]?.name + ', ' + queue?.[0]?.artists[0].name
                )
                setRepeat()
                setQueue(queue?.slice(1))
                setHidden(false) // This ensures the song is revealed after playing
            } catch (error) {
                console.error('Error playing song:', error)
            }
        }

        fetchPlaySong()
    }
    console.log(queue)

    return (
        <div className="flex flex-col items-center">
            <div>
                {points?.map((value, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-center gap-2"
                    >
                        <p className="flex font-mono border-slate-800 border-2 justify-center bg-slate-300 text-2xl text-slate-800 p-4 rounded-full m-2">
                            Player {i + 1}
                        </p>
                        <div className="border-slate-800 border-2 w-16 h-16 rounded-xl flex justify-center items-center">
                            {value}
                        </div>
                        <button
                            className="bg-orange-200 hover:bg-orange-500 border-slate-800 border-2 w-12 h-12 rounded-full flex justify-center items-center"
                            onClick={(e) => {
                                const newPoints = [...points]
                                newPoints[i]++
                                setPoints(newPoints)
                            }}
                        >
                            +1
                        </button>
                        <button
                            className="bg-orange-200 hover:bg-orange-500 border-slate-800 border-2 w-12 h-12 rounded-full flex justify-center items-center"
                            onClick={(e) => {
                                const newPoints = [...points]
                                newPoints[i]--
                                setPoints(newPoints)
                            }}
                        >
                            -1
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    key="playsong"
                    onClick={handleClick}
                    className="font-mono bg-orange-200 text-2xl border-2 border-slate-800 text-slate-800 p-4 rounded-full m-2"
                >
                    Play Song
                </button>
            </div>
            <button
                className={`border-slate-800 border-2 w-auto min-w-32 min-h-16 h-auto rounded-sm flex justify-center items-center p-2 ${
                    !hidden ? 'bg-orange-200 hover:bg-orange-500' : ''
                }`}
                onClick={() => setHidden(!hidden)}
            >
                {!hidden ? 'Click to reveal song' : curSong}
            </button>
        </div>
    )
}
