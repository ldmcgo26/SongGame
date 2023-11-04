import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopGenres } from "../util/spotify";

export default function Play() {
    const navigate = useNavigate();
    const [artists, setArtists] = useState(null)
    const [checked, setChecked] = useState([])

    const handleCheck = (index) => {
        const newChecked = checked?.map((item, i) => i === index ? !item : item)
        setChecked(newChecked)
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getTopGenres();
            setArtists(response.items);
            setChecked(new Array(response.items.length).fill(false));
          } catch (error) {
            console.error("Error:", error);
          }
        };
    
        fetchData();
      }, []);


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
                <div className={`grid grid-cols-${artists?.length} gap-4`}>
                    {artists?.map((item, i) => (
                        <button key={i} className={checked?.[i] ? "bg-blue-700" : "bg-blue-500"} onClick={() => handleCheck(i)}>
                            {item.genres[0]}
                        </button>
                    ))}
                </div>
        </div>
    );
}
