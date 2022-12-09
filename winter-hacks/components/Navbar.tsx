import { changeTheme, Navbar, Switch, Text, useTheme as useNextTheme, useTheme} from '@nextui-org/react'

export default function Nav() {

  const { isDark } = useTheme()

  return (
    <Navbar css={{
      maxW: "100%",
      
    }} isBordered>
        <Navbar.Brand>
          <Text color="inherit" h3 css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}>
            {'Hiding Us'}
          </Text>
        </Navbar.Brand>

        <Navbar.Content hideIn="xs" variant="highlight-rounded">
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link isActive href="#">Posts</Navbar.Link>
        </Navbar.Content>

        <Switch checked={ !isDark } color="secondary" onChange={(e) => {
            changeTheme(e.target.checked ? 'light' : 'dark')
        }}/>
    </Navbar>
  )
}
