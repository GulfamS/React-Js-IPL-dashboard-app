import './index.css'

const LatestMatch = props => {
  const {latesMatchData} = props
  const {
    competingTeam,
    date,
    venue,
    result,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latesMatchData

  return (
    <div className="latest-match-container">
      <h1 className="latest-heading">Latest Matches</h1>
      <div className="latest-match-card">
        <div className="latest-match-details-logo-container">
          <div className="latest-match-container-first">
            <p className="latest-team-name">{competingTeam}</p>
            <p className="latest-team-date">{date}</p>
            <p className="latest-team-venue">{venue}</p>
            <p className="latest-team-result">{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="latest-logo"
          />
        </div>
        <hr className="line" />
        <div className="latest-match-container-second">
          <p className="latest-label">First Innings</p>
          <p className="latest-value">{firstInnings}</p>
          <p className="latest-label">Second Innings</p>
          <p className="latest-value">{secondInnings}</p>
          <p className="latest-label">Man Of The Match</p>
          <p className="latest-value">{manOfTheMatch}</p>
          <p className="latest-label">Umpires</p>
          <p className="latest-value">{umpires}</p>
        </div>
      </div>
    </div>
  )
}
export default LatestMatch
