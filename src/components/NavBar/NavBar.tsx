import {
  faBorderAll,
  faCompactDisc,
  faGears,
  faHeart,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const NavBarContainer = styled.nav`
  padding: 5%;
  width: 20%;
  text-transform: uppercase;
`

const NavBarMenu = styled.ul`
  color: darkgray;
`

const NavBarMenuHeader = styled.li`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 8px 0px;
`

const NavBarMenuItem = styled.li`
  font-size: 1rem;
  padding: 16px 0px;
  vertical-align: middle;
`

const NavBarMenuItemIcon = styled.span`
  float: left;
`

const NavBarMenuItemLink = styled(NavLink)`
  color: darkgray;
  margin: 0 0 0 20px;
  display: block;

  &.active {
    color: black;
  }
`

const NavBar = (): JSX.Element => {
  return (
    <NavBarContainer>
      <NavBarMenu>
        <NavBarMenuHeader>Music</NavBarMenuHeader>
        <NavBarMenuItem>
          <NavBarMenuItemIcon>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavBarMenuItemIcon>
          <NavBarMenuItemLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/popular"
          >
            Popular
          </NavBarMenuItemLink>
        </NavBarMenuItem>
        <NavBarMenuItem>
          <NavBarMenuItemIcon>
            <FontAwesomeIcon icon={faBorderAll} />
          </NavBarMenuItemIcon>
          <NavBarMenuItemLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/genres"
          >
            Genres
          </NavBarMenuItemLink>
        </NavBarMenuItem>
        <NavBarMenuItem>
          <NavBarMenuItemIcon>
            <FontAwesomeIcon icon={faUser} />
          </NavBarMenuItemIcon>
          <NavBarMenuItemLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/artists"
          >
            Artists
          </NavBarMenuItemLink>
        </NavBarMenuItem>
        <NavBarMenuItem>
          <NavBarMenuItemIcon>
            <FontAwesomeIcon icon={faCompactDisc} />
          </NavBarMenuItemIcon>
          <NavBarMenuItemLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/albums"
          >
            Albums
          </NavBarMenuItemLink>
        </NavBarMenuItem>
        <NavBarMenuItem>
          <NavBarMenuItemIcon>
            <FontAwesomeIcon icon={faGears} />
          </NavBarMenuItemIcon>
          <NavBarMenuItemLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/settings"
          >
            Settings
          </NavBarMenuItemLink>
        </NavBarMenuItem>
      </NavBarMenu>
      <NavBarMenu>
        <NavBarMenuHeader>Playlists</NavBarMenuHeader>
        <NavBarMenuItem>
          <NavBarMenuItemIcon>
            <FontAwesomeIcon icon={faHeart} />
          </NavBarMenuItemIcon>
          <NavBarMenuItemLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/faviorites"
          >
            Favorites
          </NavBarMenuItemLink>
        </NavBarMenuItem>
      </NavBarMenu>
    </NavBarContainer>
  )
}

export default NavBar
