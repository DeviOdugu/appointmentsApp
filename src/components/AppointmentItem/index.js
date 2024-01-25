// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, activeStar} = props
  const {id, title, date, isFavorite} = appointmentDetails
  const favoriteImage = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickFavorite = () => {
    activeStar(id)
  }

  return (
    <li className="list">
      <div className="c">
        <p className="title"> {title} </p>
        <button
          type="button"
          data-testid="star"
          onClick={onClickFavorite}
          className="button"
        >
          <img
            src={favoriteImage}
            height="20px"
            width="20px"
            alt={favoriteImage}
            className="star-image"
          />
        </button>
      </div>
      <div>
        <p className="date"> Date: {date} </p>
      </div>
    </li>
  )
}

export default AppointmentItem
