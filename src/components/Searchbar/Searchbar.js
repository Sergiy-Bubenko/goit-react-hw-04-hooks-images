import { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

class Searchbar extends Component {
  state = {
    requestValue: "",
  };

  handleRequestChange = (evt) => {
    this.setState({ requestValue: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { requestValue } = this.state;

    if (requestValue.trim() === "") {
      return toast.error("измените запрос", {});
    }
    this.setState({ requestValue: "" });
    this.props.onSubmit(requestValue);
  };

  render() {
    return (
      <header className="Searchbar">
        <form onSubmit={this.handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            name="requestValue"
            value={this.state.requestValue}
            onChange={this.handleRequestChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
