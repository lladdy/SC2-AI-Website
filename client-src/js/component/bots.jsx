import axios from "axios";
import React from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { withRouter } from "react-router";

import { API_URL } from "./../routing/app.js";
import LoadingAnimation from "./loading.jsx";
import { ResultTable } from "./table.jsx";

class BotTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location.isRequired,
    author_id: PropTypes.number
  }

  componentDidMount() {
    let axios_url = `${API_URL}/bots`;
    if (this.props.author_id)
      axios_url = `${API_URL}/users/${this.props.author_id}/bots`;
    axios.get(axios_url)
      .then(response => this.setState({ bots: response.data }));
  }

  render() {
    if(!this.state.bots) return <LoadingAnimation/>;
    if (this.state.bots.length > 0) {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      let bot_table = this.state.bots.filter(entry => {
        for(let pair of params.entries()) {
          if (entry[pair[0]] && entry[pair[0]] !== pair[1]) return false;
        }
        return true;
      });
      return (
        <div>
          <ResultTable table={bot_table} schema={
            [
              {
                headerName:"Bot name",
                fieldName:"name",
                displayType:"text",
                onClick: (row) => {
                  this.props.history.push(`/bots/?name=${row.name}`);
                }
              },
              {
                headerName:"Author",
                fieldName:"author",
                displayType:"text",
                onClick: (row) => {
                  this.props.history.push(`/authors/?author_id=${row.owner_id}`);
                }
              },
              {
                headerName:"Race",
                fieldName:"race",
                displayType:"text",
                onClick: (row) => {
                  this.props.history.push(`/bots/?race=${row.race}`);
                }
              },
              {
                headerName:"Games Won",
                fieldName:"win_count",
                displayType:"text"
              },
              {
                headerName:"Games Played",
                fieldName:"match_count",
                displayType:"text"
              }
            ]
          }/>
        </div>
      );
    }
    return (<div>No bots found for user</div>);
  }
}
export default withRouter(BotTable);
