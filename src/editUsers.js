import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

export class editUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      users: [],
      enableEdit: false,
      userToEdit: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange(e) {
    this.setState({
      ...this.state,
      userToEdit: { ...this.state.userToEdit, [e.target.name]: e.target.value }
    });
    const user = users.find((user => user.id === id))
    this.setState({
      ...this.state,
      enableEdit: true,
      userToEdit: user
    })
  }
  render() {
    return this.state.users.map(user => {
      return (
        <input key={user.id}>
          <input type={editUser.id} onChange={this.handleChange} />
          <input type={editUser.name} onChange={this.handleChange} />
          <input type={editUser.username} onChange={this.handleChange} />
          <input type={editUser.email} onChange={this.handleChange} />
          <input type={`${editUser.address.street}, ${editUser.address.city}`} onChange={this.handleChange} />
          <input type={editUser.phone} onChange={this.handleChange} />
          <input type={editUser.website} onChange={this.handleChange} />
          <input type={editUser.company.name} onChange={this.handleChange} />
          <Button variant="info" onClick={() => this.editUser(user.id)}>Save</Button>
        </input>
      );
    })
  }
}
const mapStateToProps = (state, props) => {
  return {
    editUser: state.user,
    //   user: state.users && state.users.find((user) =>
    //    user.id === props.match.params.id)
  };
};

export default connect(
  mapStateToProps, null)(editUsers)






