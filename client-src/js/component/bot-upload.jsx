import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";
import BotPropType from "./../custom-proptypes/bot.js";
import {TextInput} from "./form.jsx";
import {API_URL} from "./../app.js";
import UserPropType from "../custom-proptypes/user";
import {Dropdown} from "./form";
import FileUpload from "./file-upload";

export default class BotUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", name: "", race: "Terran", bot_type: "", bot_types: [], errors: []};
  }

  static propTypes = {
    bot: BotPropType,
    uploadPath: PropTypes.string,
    label: PropTypes.string,
    method: PropTypes.string,
    bot_types: UserPropType
  }

  componentDidMount() {
    this.getBotTypeData();
  }

  // todo: should bot_types be in the state?
  getBotTypeData() {
    axios.get(`${API_URL}/bot_types`)
      .then(response => this.setState({ bot_types: response.data }) );
  }

  onChange = event => {
    let new_state = {};
    new_state[event.target.name] = event.target.value;
    this.setState(new_state);
  }

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.fileUpload(this.state.file, this.state.name, this.state.race, this.state.bot_type);
  }

  fileUpload = (file, name, race, bot_type) => {
    // Configure upload.
    const url = API_URL + this.props.uploadPath;
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (name) formData.append("name", name);
    if (race) formData.append("race", race);
    if (bot_type) formData.append("bot_type", bot_type);
    const config = { headers: { "content-type": "multipart/form-data" } };
    // Submit the upload
    if (this.props.method == "patch")
      axios.patch(url, formData, config)
        .then(() => AlertLogic.addSuccess("Upload successful!"))
        .catch(error=>this.setState({errors: error.response.data}));
    else
      axios.post(url, formData, config)
        .then(() => AlertLogic.addSuccess("Upload successful!"))
        .catch(error=>this.setState({errors: error.response.data}));
  }

  renderBotTypeEntry = (bot_type) => {
    return <option value={bot_type.id}>{bot_type.name}</option>;
  }

  render() {
    let bot = this.props.bot;
    return <React.Fragment>
      <title>{this.props.label}</title>
      <form className="flex-horizontal" onSubmit={this.onSubmit}>
        <TextInput name="name"
          error={this.state.errors.name}
          type="text"
          placeholder={ bot ? bot.name : "Bot Name" }
          className="text-input"
          onChange={this.onChange}/>
        <input name="file"
          type="file"
          className="btn"
          onChange={this.onFileChange}/>
        <select name="race"
          className="text-input"
          onChange={this.onChange}
          defaultValue={bot && bot.race}>
          <option value="Terran">Terran</option>
          <option value="Protoss">Protoss</option>
          <option value="Zerg">Zerg</option>
          <option value="Random">Random</option>
        </select>
        {/*todo: use valueExtractor and labelExtractor: https://github.com/n4kz/react-native-material-dropdown/issues/40*/}
        <select name="bot_type"
          className="text-input"
          onChange={this.onChange}
          defaultValue={bot && bot.bot_type}>
          {
            this.state.bot_types.map(row => {
              return this.renderBotTypeEntry(row);
            })
          }
        </select>
        <input type="submit" value="Submit" className="btn"/>
      </form>
    </React.Fragment>;
  }
}
