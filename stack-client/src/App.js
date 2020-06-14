import React from "react";
import "./App.css";
import Nav from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";
import Hotel from "./components/hotel";
import Users from "./components/usersList";
import Category from "./components/category";
import HotelList from "./components/hotelList";
import oneHotel from "./components/oneHotel";
import myBookings from "./components/myBookings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ButterToast, { POS_RIGHT, POS_TOP } from "butter-toast";

class App extends React.Component {
  render() {
    if (localStorage.getItem("userEmail")) {
      if (localStorage.getItem("userType") === "admin") {
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/usersList" component={Users}></Route>
                <Route path="/category" component={Category}></Route>
                <Route path="/hotel" component={Hotel}></Route>
                <Route path="/hotelList" component={HotelList}></Route>
                <Route path="/viewHotel" component={oneHotel}></Route>
                <Route path="/" component={HotelList}></Route>
              </Switch>
              <ButterToast
                position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
              />
            </div>
          </Router>
        );
      } else {
        return (
          <Router>
            <div className="App">
              <Nav />
              <Switch>
                <Route path="/hotelList" component={HotelList}></Route>
                <Route path="/viewHotel" component={oneHotel}></Route>
                <Route path="/bookings" component={myBookings}></Route>
                <Route path="/" component={HotelList}></Route>
              </Switch>
              <ButterToast
                position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
              />
            </div>
          </Router>
        );
      }
    } else {
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
              <Route path="/hotelList" component={HotelList}></Route>
              <Route path="/viewHotel" component={oneHotel}></Route>
              <Route path="/" component={HotelList}></Route>
            </Switch>
            <ButterToast
              position={{ vertical: POS_TOP, horizontal: POS_RIGHT }}
            />
          </div>
        </Router>
      );
    }
  }
}

export default App;
