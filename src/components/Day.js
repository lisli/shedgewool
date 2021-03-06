import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadSchedule } from '../redux/reducers/schedule';
import Loader from './Loader';
import Container from './Container';
import '../styles/Day.css';

const contains = (sessions, id) => {
  return sessions.filter(session => session.id === id)[0];
}

class Day extends Component {
  static propTypes = {
    schedule: React.PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { schedule } = this.props;
    if (!(schedule.data || schedule.error) && !schedule.loading) {
      this.props.loadSchedule();
    }
  }

  render() {
    const { schedule, params: {day} } = this.props;
    let { sessionId } = this.props.params;
    sessionId = sessionId && Number(sessionId);

    if (!schedule.data) return <Loader />;

    return (
      <div>
        <Container>
          <header className="Day-header">
            {Object.keys(schedule.data || {}).map(d => (
              d === day
                ? <h2 key={d}>{d}</h2>
                : <Link to={`/${d}`} key={d}>{d}</Link>
            ))}
          </header>
        </Container>

        {Object.keys(schedule.data[day] || {}).map(hour => {
          const currentSession = contains(schedule.data[day][hour], sessionId);
          return (
            <div key={hour}>
              <Container>
                <div className="Day-timeslot">
                  <div className="Day-hour">{hour}</div>
                  {schedule.data[day][hour].map(session => {
                    const image = session.speaker.image
                      ? `http://abstractions.io/images/speakers/${session.speaker.image}`
                      : session.speaker.external_image;
                    return (
                      <div key={session.id}>
                        <Link className="Day-sessionLink" to={
                          session.id === sessionId
                            ? `/${day}`
                            : `/${day}/${session.id}`
                        }>
                          <figure className="Day-figure">
                            { image &&
                              <img src={image}
                                alt={session.talk.title}
                                className="Day-image"
                              />
                            }
                            <figcaption>
                              {session.talk.title}<br/>
                              <small><em>{session.time_start} – {session.time_end}</em></small>
                            </figcaption>
                          </figure>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </Container>
              { sessionId && currentSession &&
                React.cloneElement(this.props.children, {
                  session: currentSession,
                })
              }
            </div>
          );
        })}
      </div>
    );
  }
}

Day = connect(state => ({
  schedule: state.schedule,
}), {
  loadSchedule,
})(Day);

export default Day;
