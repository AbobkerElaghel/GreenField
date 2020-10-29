import React from "react";
import ReactDom from "react-dom";
import Home from "./component/Home.jsx";
import PostAdd from "./component/PostAdd/PostAdd.jsx";
import Adds from "./component/adds/Adds.jsx";
import LogIn from "./component/login/Login.jsx";
import "./style.css";
import You from "./component/You/You.jsx";
import items from "./links";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "Home",
      currentUser: "",
      userN: "",
    };
    this.onClick = this.onClick.bind(this);
    this.login = this.login.bind(this);
  }

  onClick(e) {
    this.setState({ view: e.target.innerHTML });
  }

  login(email, username = localStorage.getItem("userName")) {
    let userName = localStorage.getItem("currentUser");
    if (userName === "undefined" || userName === null) {
      if (email !== undefined) {
        localStorage.setItem("currentUser", email);
        localStorage.setItem("userName", username);
        this.setState({
          currentUser: userName,
          view: "Home",
          userN: username,
        });
      } else {
        return;
      }
    } else if (this.state.currentUser === "") {
      this.setState({
        currentUser: userName,
        view: "Home",
        userN: username,
      });
    }
  }

  render() {
    this.login();
    console.log(this.state.userN);
    return (
      <div>
        <div className="header">
          <ul>
            <img
              className="logo"
              src="img/korfi.png"
              onClick={() => {
                this.setState({ view: "Home" });
              }}
            />
            <li>
              <a onClick={this.onClick}>Home</a>
            </li>
            <li>
              <a onClick={this.onClick}>PostAdd</a>
            </li>
            <li>
              <a onClick={this.onClick}>Adds</a>
            </li>
            <li>
              <a onClick={this.onClick}>You</a>
            </li>
            <li>
              {this.state.currentUser === "" ? (
                <a onClick={this.onClick}>Login</a>
              ) : (
                <a
                  onClick={() => {
                    this.setState({ currentUser: "" });
                    localStorage.clear();
                  }}
                >
                  logout:
                  {this.state.userN}
                </a>
              )}
            </li>
          </ul>
        </div>
        <div>
          {this.state.view === "Home" ? (
            <Home items={items}/>
          ) : this.state.view === "PostAdd" ? (
            <PostAdd />
          ) : this.state.view === "Adds" ? (
            <Adds />
          ) : this.state.view === "Login" ? (
            <LogIn login={this.login} />
          ) : this.state.view === "You" ? (
            <You />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

ReactDom.render(<App></App>, document.getElementById("app"));
