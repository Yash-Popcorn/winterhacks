import Nav from "../components/Navbar";
import ReactPlayer from 'react-player'

const url = 'https://storage.googleapis.com/blur-video-posts/blurred_video'
export default function Posts() {
    return (
        <>
            <Nav/>
            <video controls width="30%">
                <source src={url} type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
            </video>
        </>
    )
}