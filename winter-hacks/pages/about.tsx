import { Text } from "@nextui-org/react";
import Nav from "../components/Navbar";

export default function About () {
    return (
        <>
            <Nav/>
            <div className="container">
                <Text h3 css={{
                    maxWidth: "50%",
                    textAlign: "center",
                    bottom: "50%"
                }}>
                I created this website because I believe that everyone has something valuable to contribute to the world, and that sometimes people are afraid to speak up because they fear being judged or punished. By providing a platform where users can post videos anonymously, I hope to give people the freedom to share their thoughts and experiences without worrying about the consequences. I believe that when people are able to speak openly and honestly, it can foster greater understanding and empathy among us, and ultimately make the world a kinder place.
                </Text>
            </div>
        </>
    )
}