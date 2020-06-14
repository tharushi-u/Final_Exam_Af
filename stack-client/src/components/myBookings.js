import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

const initialState = {
  myCart: [],
};

class myBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const purl = "/myitem";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => {
        const cart = json.filter((cart) => {
          return (
            cart.email === localStorage.getItem("userEmail") &&
            cart.type === "cart"
          );
        });
        this.setState({ myCart: cart });
      });
  }

  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .myItem()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Hotel Booking System"
                content="Hotel Removed from my bookings Successfully!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  //Hotel booking form 

  render() {
    const { myCart } = this.state;
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-primary mb-3">
              <div className="card-header" style={{ color: "Blue" }}>My Booking Cart</div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    {myCart.map((cart) => (
                      <tr>

                        <td className="tableTh" width="25%">
                          <img width="200px" alt="" src={"/" + cart.proImage} className="img-thumbnail"/>
                        </td>

                        <td className="tableTh" width="60%">
                          <h3>{cart.proName}</h3>
                          <br />
                          <h5>
                            One Room Price: Rs. {cart.proPrice} / Discount: Rs.{" "}
                            {cart.proDiscount}
                          </h5>
                          <br />
                          <h5>
                            Total: Rs. {cart.total} / Ordered Quantity:{" "}
                            {cart.proQuantity}
                          </h5>
                        </td>

                        <td className="tableTh" width="15%">
                          <button type="button" className="btn btn-success"> Pay Now </button>
                          <button type="button" onClick={() => this.onDelete(cart._id)} className="btn btn-danger">Remove</button>
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

export default myBookings;
