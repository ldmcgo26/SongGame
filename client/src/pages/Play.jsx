import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTopGenres } from "../util/spotify";

export default function Play() {
    const navigate = useNavigate();
    const artists = getTopGenres();
    const [checked, setChecked] = useState(new Array(artists.length))
    console.log(artists)

    const home = () => navigate("/")

    return (
        <div>
            <div className="flex justify-center bg-blue-500 text-9xl text-white px-4 py-2 rounded-full mb-4">
                <p>Song Game</p>
            </div>
            <div className="flex justify-center flex-col ">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full" onClick={home}>
                    Home
                </button>
            </div>
        </div>
    );
}
