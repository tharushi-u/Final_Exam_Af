import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";

//Define variables

const initialState = {
  name: "",
  nameError: "",
  categories: [],
};

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const url = "/category";
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }));
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  //Delete Hotel categories

  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .category()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Hotel Booking System"
                content="Hotel Category Deleted Successfully!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  //For handle form submit button when add a Hotel category

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      api
        .category()
        .fetchAll()
        .then((res) => {
          const cat = res.data.filter((cat) => cat.name === this.state.name);
          if (cat.length > 0) {
            ButterToast.raise({
              content: (
                <Cinnamon.Crisp
                  title="Online Hotel Booking System"
                  content="This Catgory Name Already Exists!"
                  scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                  icon={<ExtensionSharp />}
                />
              ),
            });
          } else {
            api
              .category()
              .create(this.state)
              .then((res) => {
                ButterToast.raise({
                  content: (
                    <Cinnamon.Crisp
                      title="Online Hotel Booking System"
                      content="Hotel Category Added successfully!"
                      scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                      icon={<AssignmentTurnedIn />}
                    />
                  ),
                });
                this.setState(initialState);
                this.componentDidMount();
              });
          }
        });
    }
  };

  //Validate input fields in hotel category form

  validate = () => {
    let nameError = "";

    if (!this.state.name) {
      nameError = "Category Name Cannot Be Blank";
    }

    if (nameError) {
      this.setState({ nameError });
      return false;
    }

    return true;
  };

  render() {
    if (localStorage.getItem("userEmail")) {
      const { categories } = this.state;
      return (
        <div className="container">
          <br></br>
          <br></br>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card border-primary mb-3">
                <div className="card-header"style={{ color: "Blue" }}> Add Hotel Category</div>
                <div className="card-body">
                  {/*form for add a category*/}
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right"> Hotel Category Name </label>
                      <div className="col-md-6">
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange}/>
                        <div style={{ color: "red" }}>
                          {this.state.nameError}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 offset-md-4">
                      <button type="submit" className="btn btn-primary"> Add Category </button>
                    </div>
                  </form>
                  <br></br>

                  {/*Display Hotel categories.*/}
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="tableTh">Hotel Category Name</th>
                        <th className="tableTh">Remove Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr>
                          <td className="tableTh">{category.name}</td>
                          <td className="tableTh">
                            <button type="button" onClick={() => this.onDelete(category._id)} className="btn btn-danger"> Delete</button>
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

export default Category;
