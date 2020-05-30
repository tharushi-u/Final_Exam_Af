import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const url = "/register";
    fetch(url)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          users: json.filter(
            (user) => user.email !== localStorage.getItem("userEmail")
          ),
        })
      );
  }

  /* --------------deleting a record in this list----------------- */
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .registerUser()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Store"
                content="Delete Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  /*-----------------changing the priviledges-----------------------*/
  onUserChange(id, type) {
    if (window.confirm("Are you sure to change the privilege?")) {
      var data = { type: type };
      api
        .registerUser()
        .update(id, data)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Store"
                content="Change Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  onSmChange(id, type, email) {
    if (window.confirm("Are you sure to change the privilege?")) {
      var data = { type: type };
      api
        .registerUser()
        .update(id, data)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Store"
                content="Change Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
          var data = { email: email };
          api.registerUser().email(data);
        });
    }
  }

  editButton(type, id, email) {
    if (type === "user") {
      return [
        <button
          type="button"
          onClick={() => this.onUserChange(id, "admin")}
          className="btn btn-warning"
        >
          Admin
        </button>,
        <br></br>,
        <button
          type="button"
          onClick={() => this.onSmChange(id, "sm", email)}
          className="btn btn-success"
        >
          S.M
        </button>,
      ];
    } else if (type === "admin") {
      return [
        <button
          type="button"
          onClick={() => this.onUserChange(id, "user")}
          className="btn btn-warning"
        >
          User
        </button>,
        <br></br>,
        <button
          type="button"
          onClick={() => this.onSmChange(id, "sm", email)}
          className="btn btn-success"
        >
          S.M
        </button>,
      ];
    } else if (type === "sm") {
      return [
        <button
          type="button"
          onClick={() => this.onUserChange(id, "admin")}
          className="btn btn-warning"
        >
          Admin
        </button>,
        <br></br>,
        <button
          type="button"
          onClick={() => this.onUserChange(id, "user")}
          className="btn btn-success"
        >
          User
        </button>,
      ];
    }
  }

  render() {
    if (localStorage.getItem("userEmail")) {
      const { users } = this.state;
      return (
        <div className="container">
          <br></br>
          <br></br>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">Users</div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="tableTh">First Name</th>
                        <th className="tableTh">Last Name</th>
                        <th className="tableTh">Email</th>
                        <th className="tableTh">Phone</th>
                        <th className="tableTh">User Type</th>
                        <th className="tableTh">Change</th>
                        <th className="tableTh">Remove User</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr>
                          <td className="tableTh">{user.fname}</td>
                          <td className="tableTh">{user.lname}</td>
                          <td className="tableTh">{user.email}</td>
                          <td className="tableTh">{user.phone}</td>
                          <td className="tableTh">{user.type}</td>
                          <td className="tableTh">
                            {this.editButton(user.type, user._id, user.email)}
                          </td>
                          <td className="tableTh">
                            <button
                              type="button"
                              onClick={() => this.onDelete(user._id)}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Users;
