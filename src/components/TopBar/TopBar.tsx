import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const TopBarContainer = styled.nav`
  height: 32px;
  width: 100%;
`

const TopBar = (): JSX.Element => {
  const history = useNavigate()

  return (
    <TopBarContainer>
      <button
        onClick={() => {
          history(-1)
        }}
      >
        <FontAwesomeIcon icon={faCircleArrowLeft} size={'2x'} />
      </button>
      <button
        onClick={() => {
          history(1)
        }}
      >
        <FontAwesomeIcon icon={faCircleArrowRight} size={'2x'} />
      </button>
    </TopBarContainer>
  )
}

export default TopBar
