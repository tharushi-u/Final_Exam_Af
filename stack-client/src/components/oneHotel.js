import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";

// Define variables
const initialState = {
  products: [],
  messages: [],
  comment: "",
  confirmButton: "Send",
  commentError: "",
  commentId: "",
  proId: "",
  proName: "",
  proPrice: "",
  proDiscount: "",
  proQuantity: "",
  proImage: "",
  quantity: "",
  type: "",
  total: "",
  quantityError: "",
};

class oneHotel extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  onChange(id, msg) {
    this.setState({ confirmButton: "EDIT", commentId: id, comment: msg });
  }

  componentDidMount() {
    const purl = "/product";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => {
        const pro = json.filter(
          (pro) => pro._id === localStorage.getItem("itemId")
        );
        this.setState({
          products: pro,
          proId: pro[0]["_id"],
          proName: pro[0]["name"],
          proPrice: pro[0]["price"],
          proDiscount: pro[0]["discount"],
          proQuantity: pro[0]["quantity"],
          proImage: pro[0]["image"],
        });
      });
  }

  onCart() {
    if (localStorage.getItem("userEmail")) {
      if (this.state.quantity) {
        if (this.state.quantity <= this.state.proQuantity) {
          const total =
            this.state.quantity * this.state.proPrice -
            this.state.proDiscount * this.state.quantity;
          this.setState(
            {
              type: "cart",
              total: total,
              wish_list: "",
              email: localStorage.getItem("userEmail"),
            },
            () => {
              api
                .myItem()
                .create(this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Hotel Booking System"
                        content="Hotel Added to bookings Successfully!"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.componentDidMount();
                  this.setState(initialState);
                });
            }
          );
        } else {
          this.setState({ quantityError: "Quantity Error!" });
        }
      } else {
        this.setState({ quantityError: "Quantity Required!" });
      }
    } else {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Online Hotel Booking System"
            content="Please Login to the system!"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<ExtensionSharp />}
          />
        ),
      });
    }
  }

  
  //Add to booking cart form 
  render() {
    const { products} = this.state;
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-primary mb-3">
              <div className="card-body">
                <table className="table">
                  <tbody>

                    {products.map((product) => (
                      <tr>

                        <td className="tableTh" width="35%">
                          <img  width="200px"  alt="" src={"/" + product.image} className="img-thumbnail" />
                        </td>
                        <td className="tableTh" width="65%">
                          <h3>{product.name}</h3>
                          <br />
                          <h5>
                            Hotel Category :{product.name} / Room Price: Rs.{" "}
                            {product.price}
                          </h5>
                          <br />
                          <h5>Discount : Rs. {product.discount}</h5>
                          <br />
                          <h5>Available Room Quantity : {product.quantity}</h5>
                          <br />
                          Room Quantity purchased:{" "}
                          <input type="text"  name="quantity"  value={this.state.quantity}  onChange={this.handleChange}
                            style={{ width: "50px" }}
                          />{" "}
                          / {product.quantity}
                          <div style={{ color: "red" }}>
                            {this.state.quantityError}
                          </div>
                          <br />
                          <br />
                          <button type="button"  onClick={() => this.onCart()} className="btn btn-success" >  Add to Bookings </button>
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

export default oneHotel;
