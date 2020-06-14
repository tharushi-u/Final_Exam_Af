import React from "react";
import "../App.css";

const initialState = {
  products: [],
};

class HotelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const purl = "/product";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => this.setState({ products: json }));
  }

  onBuy(id) {
    localStorage.setItem("itemId", id);
    window.location.href = "/viewHotel";
  }

  render() {
    const { products } = this.state;
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card border-primary mb-3">
              <div className="card-header" style={{ color: "Blue" }}>Hotels</div>
              <div className="card-body">
                <table className="table">
                  <tbody>
                    {products.map((product) => (

                      // Table for display hotel details

                      <tr key={product._id}>

                        <td className="tableTh" width="25%">
                          <img width="200px"  alt=""  src={"/" + product.image}  className="img-thumbnail"  />
                        </td>

                        <td className="tableTh" width="60%">
                          <h3>{product.name}</h3>
                          <br />
                          <h5>
                            Hotel Category :{product.category} / One Room Price: Rs.{" "}
                            {product.price}
                          </h5>
                        </td>

                        <td className="tableTh" width="15%">
                          <button  type="button"  onClick={() => this.onBuy(product._id)} className="btn btn-success" >  Book Now    </button>
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

export default HotelList;
