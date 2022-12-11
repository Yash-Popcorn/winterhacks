import { useEffect, useState } from "react"
import Nav from "../components/Navbar"

export default function () {
    const [videoDatas, setData] = useState<string[]>([])

    async function getURLS() {
        const res = await fetch('/api/videos', {
            method: "GET"
        })
        const data = await res.json() as Array<string>
        const arr = new Array<string>()

        for (const i in data) {      
            console.log(`https://storage.googleapis.com/blur-video-posts/${data[i]}`)  
            arr.push(`https://storage.googleapis.com/blur-video-posts/${data[i]}`)    
        }

        setData(arr)
        console.log(arr)
    }
    useEffect(() => {
        getURLS().catch(console.error)
    }, [])

    return (
        <>
            <Nav/>
            {
                videoDatas.map(value => {
                    console.log(value)
                    return (
                        <div className="container" style={{
                            "marginBottom": 10
                        }} key={`${Math.random()}`}>
                            <video
                            id={value}
                            controls
                            preload="auto"
                            data-setup='{}'
                            style={{
                                "maxWidth": "30%",
                                "minWidth": "10%"
                            }}
                            >
                            <source src={value} type="video/mp4"></source>
                            </video>
                        </div>
                    )
                })
            }
        </>
    )
}