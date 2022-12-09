import { Button, changeTheme, Image, Navbar, Spacer, Switch, Text, useTheme as useNextTheme, useTheme} from '@nextui-org/react'
import Content from '../components/Content'
import Nav from '../components/Navbar'

export default function Home() {

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
      }}>
        Start
      </Button>
    </div>
  )
}
