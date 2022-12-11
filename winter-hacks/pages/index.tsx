import { Button, changeTheme, Navbar, Spacer, Switch, Text, useTheme as useNextTheme, useTheme} from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Content from '../components/Content'
import Nav from '../components/Navbar'

export default function Home() {

  const router = useRouter()

  return (
    <div style={{
      width: "100%",
      height: "100%",
    }}>
      <Nav/>
      <Content/>
      <Spacer y={2}/>
      <Button shadow color="gradient" bordered css={{
        left: "$9",
      }} onClick={() => {
        router.push('/posts')
      }}>
        Start
      </Button>

      <div className="bg-image-wrapper">
        <Image
          src="/wave_back.png"
          alt="Cartoon graduates jump with happiness"
          quality="100"
          fill
          />
      </div>
    </div>
  )
}
