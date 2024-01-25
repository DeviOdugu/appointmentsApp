// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentList: [],
    activeStarred: false,
  }

  onChangeTitle = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  activeStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachFavorite => {
        if (eachFavorite.id === id) {
          return {
            ...eachFavorite,
            isFavorite: !eachFavorite.isFavorite,
          }
        }
        return eachFavorite
      }),
    }))
  }

  onClickStarred = () => {
    this.setState(prevState => ({activeStarred: !prevState.activeStarred}))
  }

  render() {
    const {titleInput, dateInput, appointmentList, activeStarred} = this.state
    const starredList = appointmentList.filter(
      eachStarred => eachStarred.isFavorite === true,
    )

    const appointments = activeStarred ? starredList : appointmentList

    const activeStarredButton = activeStarred ? 'starred-button' : 'starred'

    return (
      <div className="bg">
        <div className="card-container">
          <div className="a">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading"> Add Appointment </h1>
              <label htmlFor="title" className="title-label">
                TITLE
              </label>
              <input
                type="text"
                value={titleInput}
                id="title"
                placeholder="Title"
                className="title-input"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="date" className="date-label">
                DATE
              </label>
              <input
                type="date"
                value={dateInput}
                id="date"
                onChange={this.onChangeDate}
                className="date-input"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png "
                alt="appointments"
                height="170px"
                width="170px"
                className="image"
              />
            </div>
          </div>
          <hr />
          <div className="b">
            <h1 className="apt"> Appointments </h1>
            <button
              type="button"
              className={activeStarredButton}
              onClick={this.onClickStarred}
            >
              Starred
            </button>
          </div>
          <ul className="lists">
            {appointments.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                activeStar={this.activeStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
