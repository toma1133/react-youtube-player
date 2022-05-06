// import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import { PlayerContext } from '../../interfaces/PlayerContext'
import { IRegionCode, regionCode } from '../../services/youtube.service'

const PopularCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: left;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1%;
`

const PopularCard = styled.div.attrs((props: { colorStyle: string }) => props)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 200px;
  border: 1px solid lightgray;
  margin: 10px;
  color: white;
  cursor: pointer;
  text-transform: uppercase;
  background: ${(props) =>
    `${
      props.colorStyle
        ? props.colorStyle
        : 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)'
    }`};
`

const PopularByCountry = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50%;
  width: 100%;
`

const PopularByCountryTopTitle = styled.h3`
  font-size: 2rem;
`

const PopularByCountryTopSperate = styled.hr`
  border: 1px solid whitesmoke;
  width: 60%;
`

const PopularByCountryTopName = styled.h5`
  font-size: 1rem;
`

const PopularList = (): JSX.Element => {
  // const playerContext = useContext(PlayerContext)
  // const { updateVideoInfo } = playerContext
  const navigate = useNavigate()

  return (
    <PopularCards>
      {regionCode.map((region: IRegionCode) => (
        <PopularCard
          key={region.gl}
          colorStyle={region.color}
          onClick={() => {
            if (region.gl) navigate(region.gl)
          }}
        >
          <PopularByCountry>
            <PopularByCountryTopTitle>TOP 50</PopularByCountryTopTitle>
            <PopularByCountryTopSperate />
            <PopularByCountryTopName>{region.name}</PopularByCountryTopName>
          </PopularByCountry>
        </PopularCard>
      ))}
    </PopularCards>
    // <>
    //   <button
    //     onClick={() => {
    //       if (updateVideoInfo) updateVideoInfo('Il0S8BoucSA')
    //     }}
    //   >
    //     Shiver
    //   </button>
    //   <button
    //     onClick={() => {
    //       if (updateVideoInfo) updateVideoInfo('orJSJGHjBLI')
    //     }}
    //   >
    //     Bad Habits
    //   </button>
    //   <button
    //     onClick={() => {
    //       if (updateVideoInfo) updateVideoInfo('Y2ge3KrdeWs')
    //     }}
    //   >
    //     華語
    //   </button>
    // </>
  )
}

export default PopularList
