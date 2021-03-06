import axios from "axios";
import React from "react";
import PropTypes from "prop-types";

import AlertLogic from "./../logic/alert.js";
import BotPropType from "./../custom-proptypes/bot.js";
import { TextInput } from "./form.jsx";
import { API_URL } from "./../app.js";

export default class BotUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: "", name: "", race: "Terran", errors: []};
  }

  static propTypes = {
    bot: BotPropType,
    uploadPath: PropTypes.string,
    label: PropTypes.string,
    method: PropTypes.string
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
    this.fileUpload(this.state.file, this.state.name, this.state.race);
  }

  fileUpload = (file, name, race) => {
    // Configure upload.
    const url = API_URL + this.props.uploadPath;
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (name) formData.append("name", name);
    if (race) formData.append("race", race);
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
        <input type="submit" value="Submit" className="btn"/>
      </form>
    </React.Fragment>;
  }
}
