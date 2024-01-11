import { useState, useEffect } from 'react'
import { generatePlaylist } from '../util/spotify'

export default function Play(props) {
    const [queue, setQueue] = useState(
        generatePlaylist(props.artists, props.genres)
    )

    return <div></div>
}
