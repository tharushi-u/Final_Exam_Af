import React from "react";
import "../App.css";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

//Navigation bar

class nav extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  //Display features accoding to the user types

  render() {

    //Admin features
    if (localStorage.getItem("userEmail")) {
      if (localStorage.getItem("userType") === "admin") {
        return (
          <Navbar bg="navbar navbar-black bg-primary" variant="light" >
            <Navbar.Brand> <i class="fa fa-building" aria-hidden="true"></i> Online Hotel Booking System - Admin Dashboard </Navbar.Brand>
            <Navbar.Collapse className="collapse navbar-collapse">
              <Nav className="navbar-nav ml-auto">
                
              <Nav.Link href="/usersList" ><i class="fa fa-users" aria-hidden="true"></i> View Users</Nav.Link>
                <Nav.Link href="/" ><i class="fa fa-h-square" aria-hidden="true"></i> View Hotels</Nav.Link>
                <Nav.Link href="/hotel" ><i class="fa fa-plus" aria-hidden="true"></i> Add Hotels</Nav.Link>
                <Nav.Link href="/category" ><i class="fa fa-list-ul" aria-hidden="true"></i> Add Category</Nav.Link>
                <Nav.Link onClick={ this.Logout } ><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      } else {

        //User features

        return (
          <Navbar bg="navbar navbar-black bg-primary" variant="light">
            <Navbar.Brand > <i class="fa fa-building" aria-hidden="true"></i> Online Hotel Booking System - User Dashboard</Navbar.Brand>
            <Navbar.Collapse className="collapse navbar-collapse">
              <Nav className="navbar-nav ml-auto">

                <Nav.Link href="/" ><i class="fa fa-h-square" aria-hidden="true"></i> View Hotels</Nav.Link>
                <Nav.Link href="/bookings" ><i class="fa fa-user-circle" aria-hidden="true"></i> My Bookings </Nav.Link>
                <Nav.Link onClick={ this.Logout } ><i class="fa fa-sign-out" aria-hidden="true"></i> Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
    } else {
      return (
        <Navbar bg="navbar navbar-black bg-primary" variant="light">
          <Navbar.Brand> <i class="fa fa-building" aria-hidden="true"></i> Online Hotel Booking System - Home </Navbar.Brand>
          <Navbar.Collapse className="collapse navbar-collapse">
            <Nav className="navbar-nav ml-auto">

            <Nav.Link href="/login"><i class="fa fa-fw fa-user" aria-hidden="true"></i> Login</Nav.Link>
              <Nav.Link href="/register"><i class="fa fa-file-text" aria-hidden="true"></i> Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default nav;
