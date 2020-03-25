import React, { Component } from "react";
import api from "../../services/api";

import "../../resource/css/New.css";

class New extends Component {
  state = {
    image: null,
    site: "",
    sectionId: "",
    name: "",
    title: "",
    contents: "",
    hashtags: ""
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    data.append("image", this.state.image);
    data.append("site", this.state.site);
    data.append("sectionId", this.state.sectionId);
    data.append("name", this.state.name);
    data.append("title", this.state.title);
    data.append("contents", this.state.contents);
    data.append("hashtags", this.state.hashtags);

    await api.post("posts", data);

    this.props.history.push("/feed");
  };

  handleImageChange = e => {
    this.setState({ image: e.target.files[0] });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form action="" id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />

        <input
          type="text"
          name="site"
          placeholder="사이트"
          onChange={this.handleChange}
          value={this.state.author}
        />
        
        <input
          type="text"
          name="sectionId"
          placeholder="섹션ID"
          onChange={this.handleChange}
          value={this.state.author}
        />

        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={this.handleChange}
          value={this.state.author}
        />

        <input
          type="text"
          name="title"
          placeholder="기사타이틀"
          onChange={this.handleChange}
          value={this.state.place}
        />

        <textarea
          type="text"
          name="contents"
          placeholder="기사내용"
          onChange={this.handleChange}
          value={this.state.description}
        />

        <input
          type="text"
          name="hashtags"
          placeholder="#해시태그"
          onChange={this.handleChange}
          value={this.state.hashtags}
        />

        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default New;
