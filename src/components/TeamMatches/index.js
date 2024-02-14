import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/:id'

class TeamMatches extends Component {
  state = {
    teamMathesData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMathes()
  }

  getFormatedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMathes = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const fetchData = await response.json()
    const formatedData = {
      teamBannerUrl: fetchData.team_banner_url,
      latestMatch: this.getFormatedData(fetchData.latest_match_details),
      recentMatches: fetchData.recent_matches.map(eachMatch =>
        this.getFormatedData(eachMatch),
      ),
    }
    this.setState({teamMathesData: formatedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {teamMathesData} = this.state
    const {recentMatches} = teamMathesData

    return (
      <ul className="recent-matches">
        {recentMatches.map(recentMatch => (
          <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMathes = () => {
    const {teamMathesData} = this.state
    const {teamBannerUrl, latestMatch} = teamMathesData

    return (
      <div className="banner-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMathes()}
      </div>
    )
  }
}
export default TeamMatches
