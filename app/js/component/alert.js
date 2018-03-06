import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

import AlertLogic from './../logic/alert.js'

const Alert = (props) => {
  return (
    <div className="alert-error"
         onClick={ () => { AlertLogic.removeAlertWithId(props.id); } }>
      <div className="alert-text">
        {props.message}
      </div>
    </div>
  );
}

export class AlertZone extends React.Component {
  render() {
    return (
      <div className="alert-zone">
      {
        (this.props.messages.length > 0) ? (
          this.props.messages.map((message) => {
            return (
                      <Alert key={message.id}
                             id={message.id}
                             message={message.message}/>
                   );
          })
        ) : (
          <span/>
        )
      }
      </div>
    );
  }
}
