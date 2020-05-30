import React from "react";
import "../App.css";

const initialState = {
  myOrder: [],
};

/* Order form */
class Order extends React.Component {
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
            cart.type === "order"
          );
        });
        this.setState({ myOrder: cart });
      });
  }

  render() {
    const { myOrder } = this.state;
    if (localStorage.getItem("userEmail")) {
      return (
        <div className="container">
          <br></br>
          <br></br>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">My Order</div>
                <div className="card-body">
                  <tbody>
                    {myOrder.map((my) => (
                      <tr>
                        <td className="tableTh" width="25%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + my.proImage}
                            className="img-thumbnail"
                          />
                        </td>
                        <td className="tableTh" width="60%">
                          <h3>{my.proName}</h3>
                          <br />
                          <h5>
                            Price: Rs. {my.proPrice} / Discount: Rs.{" "}
                            {my.proDiscount}
                          </h5>
                          <br />
                          <h5>
                            Total: Rs. {my.total} / Quantity: {my.proQuantity}
                          </h5>
                        </td>
                        <td className="tableTh" width="25%">
                          <h5> Payment Method : {my.payment} </h5>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Order;
