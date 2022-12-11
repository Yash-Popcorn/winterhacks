import Nav from "../components/Navbar";
import ReactPlayer from 'react-player'
import { Button, Card, Loading, Spacer, Text } from "@nextui-org/react";
import { CameraIcon } from "../components/Camera";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";

//const url = 'https://storage.googleapis.com/blur-video-posts/blurred_video'
export default function Posts() {
    const [videoURL, setURL] = useState<string>()
    const [file, setFile] = useState<File>()

    const [clicked, setClick] = useState<boolean>()
    const router = useRouter()

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setURL(URL.createObjectURL(e.target.files[0]))
            setFile(e.target.files[0])
        }
    }

    const handleSubmit = async () => {
        if (!clicked && file) {
            setClick(true)
            const theFormData = new FormData()
            console.log(file, theFormData)
            theFormData.append("file", file)

            const response = await fetch('/api/videos', {
                method: 'POST',
                body: theFormData,
                //headers: {
                    //'Content-Type': 'multipart/form-data'
                //}
            })

            const data = await response.json()
            router.push('/showposts')
        }
    }

    return (
        <>
            <Nav/>
            {
                /*
                <video controls width="30%">
                    <source src={'/blurred_video.mp4'} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                </video>
                */
            }
            <div className="container">
                <Card isHoverable variant="bordered" css={{ mw: "400px", top: "$5" }}>
                    <Card.Header>
                        <Text b> Upload Video</Text>
                    </Card.Header>
                    <Card.Divider/>
                    <Card.Body>
                        <Text>
                            Provide a video to blur out
                        </Text>
                    </Card.Body>
                    {
                        videoURL && <video
                            id="my-player"
                            controls
                            preload="auto"
                            data-setup='{}'>
                            <source src={videoURL} type="video/mp4"></source>
                        </video>
                    }
                    <Card.Footer>
                        <Button size="sm" icon={<CameraIcon/>} css={{
                            maxWidth: "90%"
                        }}>
                            <Text css={{
                                marginRight: 30,
                                paddingRight: 30
                            }}>
                                
                            </Text>
                            <input type="file" id="myFile" className="button" accept="video/mp4" onChange={(e) => handleFileChange(e)}/>
                        </Button>
                        
                    </Card.Footer>

                    {
                        videoURL && (
                            <>
                                <Spacer/>
                                <Button disabled={clicked} shadow color="gradient" auto css={{
                                    maxWidth: "60%",
                                    left: 11,
                                    marginBottom: 10
                                }} onClick={() => handleSubmit()}>
                                    {
                                        clicked && (
                                            <Loading type="points" color="currentColor" size="sm" />
                                        ) || 'Submit'
                                    }
                                </Button>
                            </>
                        )
                    }
                </Card>
            </div>
        </>
    )
}