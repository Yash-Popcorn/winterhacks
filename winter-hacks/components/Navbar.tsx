import { changeTheme, Navbar, Switch, Text, useTheme as useNextTheme, useTheme} from '@nextui-org/react'
import { useRouter } from 'next/router'

export default function Nav() {

  const { isDark } = useTheme()
  const router = useRouter()

  return (
    <Navbar css={{
      maxW: "100%",
      
    }}>
        <Navbar.Brand onClick={() => {
          router.push('/')
        }}>
          <Text color="inherit" h3 css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}>
            {'Hiding Us'}
          </Text>
        </Navbar.Brand>

        <Navbar.Content hideIn="xs" variant="highlight-rounded">
          <Navbar.Link href="/about" css={{
            color: isDark && "$white" || "$black"
          }}>About</Navbar.Link>
          <Navbar.Link href="/posts" css={{
            color: isDark && "$white" || "$black"
          }}>Posts</Navbar.Link>
        </Navbar.Content>

        <Switch checked={ !isDark } color="secondary" onChange={(e) => {
            changeTheme(e.target.checked ? 'light' : 'dark')
        }}/>
    </Navbar>
  )
}
