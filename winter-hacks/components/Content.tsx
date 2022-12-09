import { Image, Text } from "@nextui-org/react";

export default function Content() {
    return (
        <>
            <Text h1 css={{
                paddingLeft: "$md",
                paddingTop: "$16",
                textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}>Share without fear</Text>
            <Text h3 css={{
                color: "$gray700",
                paddingLeft: "$9",
                maxWidth: "55%"
            }}>
                A website that allows people to anonymously post videos with a blur, providing a unique and anonymous perspective on various topics.
            </Text>
            <Image width={320}
                height={180}  
                src="/wave.png"
                alt="Default Image"
                objectFit="cover"
                css={{
                    right: "50%"
                }}
            >
                
            </Image>

        </>
    )
}