// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    mins: 25,
    secs: '00',
    count: 25,
    isStart: false,
  }

  decreaseMins = () => {
    const {mins, isStart, count} = this.state
    let newMin = mins
    let newCount = count
    if (mins > 0 && isStart === false) {
      newMin = mins - 1
      newCount = count - 1
    }

    this.setState({
      mins: newMin,
      count: newCount,
    })
  }

  increaseMins = () => {
    const {mins, isStart, count} = this.state
    let newMin = mins
    let newCount = count
    if (isStart === false) {
      newMin = mins + 1
      newCount = count + 1
    }

    this.setState({
      mins: newMin,
      count: newCount,
    })
  }

  onClickStartPause = () => {
    const {isStart} = this.state
    if (isStart === false) {
      this.timerId = setInterval(this.tick, 1000)
    }

    if (isStart === true) {
      clearInterval(this.timerId)
    }
    this.setState({
      isStart: !isStart,
    })
  }

  tick = () => {
    const {secs} = this.state
    const {mins} = this.state

    let newSecs
    let newMins
    if (secs === '00') {
      newMins = mins - 1
      newSecs = 60
    } else if (secs === 0) {
      newMins = mins - 1
      newSecs = 60
    } else {
      newSecs = secs
      newMins = mins
    }

    let secString
    if (newSecs <= 10) {
      secString = `0${newSecs - 1}`
    } else {
      secString = `${newSecs - 1}`
    }
    if (newMins === 0 && newSecs === '01') {
      this.setState({
        secs: '00',
        mins: '00',
      })
      clearInterval(this.timerId)
    } else {
      this.setState({
        secs: secString,
        mins: newMins,
      })
    }
  }

  resetTime = () => {
    clearInterval(this.timerId)
    this.setState({
      mins: 25,
      secs: '00',
      count: 25,
      isStart: false,
    })
  }

  render() {
    const {mins, secs, count, isStart} = this.state
    return (
      <div className="bg-cont">
        <div>
          <h1>Digital Timer</h1>
        </div>
        <div className="main-cont">
          <div className="design-image">
            <div className="click-dial">
              <h1 className="time">
                {mins}:{secs}
              </h1>
              <p className="clock-text">{isStart ? 'Running' : 'Paused'}</p>
            </div>
          </div>

          <div className="options-cont">
            <div className="start-reset-cont">
              <div className="sub-cont">
                <button
                  className="buttons"
                  onClick={this.onClickStartPause}
                  type="button"
                >
                  <img
                    src={
                      isStart
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isStart ? 'pause icon' : 'play icon'}
                    className="images"
                  />
                </button>
                <button
                  className="button-side-text"
                  onClick={this.onClickStartPause}
                >
                  {isStart ? 'Pause' : 'Start'}
                </button>
              </div>
              <div className="sub-cont">
                <button className="buttons" type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="images"
                    onClick={this.resetTime}
                    type="button"
                  />
                </button>
                <button
                  className="button-side-text"
                  onClick={this.resetTime}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="para">Set Timer limit</p>
            <div>
              <div className="btn-cont">
                <button
                  className="plus-minus-btn"
                  onClick={this.decreaseMins}
                  type="button"
                >
                  -
                </button>
                <button className="count-btn" type="button">
                  <p>{count}</p>
                </button>
                <button
                  className="plus-minus-btn"
                  onClick={this.increaseMins}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
