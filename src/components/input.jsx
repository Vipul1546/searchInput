import React, { Component } from "react";
import HighlightDropdown from "./highlightDropdown";
import InputField from "./inputField";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchTerm: "",
      filteredData: [],
      showDropDown: false,
      loading: true,
    };
  }

  componentDidMount = () => {
    fetch("https://www.mocky.io/v2/5ba8efb23100007200c2750c")
      .then((response) => response.json())
      .then((result) => {
        this.setState({ data: result, filteredData: result, loading: false });
      })
      .catch((error) => {
        console.log(error);
      });

    // adding event listener for mouse and keyboard
    window.addEventListener("keydown", this.handleEvent);
    window.addEventListener("mouseover", this.handleEvent);
  };

  /**
   * Clearing registered Event
   */
  componentWillUnMount = () => {
    window.removeEventListener("keydown", this.handleEvent);
    window.removeEventListener("mouseover", this.handleEvent);
  };

  /**
   * Handling Mouse and Keyboard event
   */
  handleEvent = (e) => {
    if (this.state.searchTerm && this.state.showDropDown) {
      let active =
        document.querySelector(".hover") ||
        document.querySelector("#myDropdown .card");

      active.classList.remove("hover");
      if (e.which === 40) {
        active = active.nextElementSibling || active;
      } else if (e.which === 38) {
        active = active.previousElementSibling || active;
      } else if (e.target.classList.contains("card")) {
        active = e.target;
      }
      active.classList.add("hover");

      if (e.which === 38 || e.which === 40) {
        document.getElementById("myDropdown").scrollTop = 0;
        document.getElementById("myDropdown").scrollTop =
          document.querySelectorAll(".hover")[0].offsetTop -
          document.getElementById("myDropdown").offsetHeight +
          130;
      }
    }
  };

  handleReset = () => {
    this.setState({
      searchTerm: "",
    });
  };

  render() {
    const { filteredData, searchTerm, loading } = this.state;
    return (
      <React.Fragment>
        {!loading ? (
          <div className="searchArea">
            <InputField
              id="myInput"
              placeholder="Search"
              type="text"
              value={searchTerm}
              handleChange={this.handleSearch}
            />
            <span className="reset" onClick={this.handleReset}>
              x
            </span>
            {filteredData.length > 0 && searchTerm ? (
              <div id="myDropdown" className={this.getDropDownClasses()}>
                {filteredData.map((item) => (
                  <HighlightDropdown
                    key={item.id}
                    searchTerm={searchTerm}
                    item={item}
                  />
                ))}
              </div>
            ) : searchTerm ? (
              "No Users Found."
            ) : (
              ""
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </React.Fragment>
    );
  }

  /**
   * Filtering data on the basis of search term
   */
  handleSearch = (e) => {
    let data1 = [...this.state.data];
    const search_value = e.target.value.toLowerCase();

    let filteredData1 = data1.filter((obj) => {
      return (
        obj["name"].toLowerCase().includes(search_value) ||
        obj["address"].toLowerCase().includes(search_value) ||
        obj["id"].toLowerCase().includes(search_value) ||
        obj["items"].some(function (v) {
          return v.toLowerCase().indexOf(search_value) >= 0;
        })
      );
    });
    this.setState({
      searchTerm: e.target.value,
      showDropDown: filteredData1.length > 0 ? true : false,
      filteredData: filteredData1,
    });
  };

  /**
   * showing dropdown
   */
  getDropDownClasses = () => {
    let classes = "dropdown-content";
    classes += this.state.showDropDown === true ? " show" : "";
    return classes;
  };
}

export default Input;
