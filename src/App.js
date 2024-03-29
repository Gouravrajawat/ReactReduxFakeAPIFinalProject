import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteUsers, editUsers, favoriteUsers, editedUsers, getUsersSuccess, editUser1 } from "./actions";
import { Button, Form, Dropdown } from "react-bootstrap";
import './index.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isLoading: true,
      isError: false,
      enableEdit: false,
      userToEdit: {},
      filter: 'all',
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    this.setState({ isLoading: true })
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (response.ok) {
      const users = await response.json()
      this.props.getUsersSuccess(users)
      this.setState({ users, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
      this.setState({
        // userToEdit: true
      })
      this.props.history.push("/edit")
    }
  }
  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr.toUpperCase()}</th>)
  }
  renderTableRows = () => {
    return this.filterUser(this.state.filter).map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{`${user.address.street}, ${user.address.city}`}</td>
          <td>{user.phone}</td>
          <td>{user.website}</td>
          <td>{user.company.name}</td>
          <td>
            {user.favorite ? <span class="glyphicon">&#xe005;</span> : 'Add to favorite'}
          </td>
          <td>
            <Button variant="info" onClick={() => this.editUser(user.id)}>Edit</Button>
            &nbsp;<Button variant="danger" onClick={() => this.deleteUsers(user.id)}>Delete</Button>
            &nbsp;
            <Button variant="success" onClick={() => this.favoriteUsers(user.id)}>{!user.favorite ? 'Add to Favorite' : 'Remove From Favorite'}</Button>
          </td>
        </tr>
      )
    })
  }

  deleteUsers(userid) {
    const { users } = this.state;
    this.setState({
      users: users.filter((user => user.id !== userid))
    })
  }


  editUser = id => {
    const { users } = this.state;
    this.setState({
      users: users.find((user => user.id === id))
    })
    const user = users.find((user => user.id === id))
    this.setState({
      ...this.state,
      enableEdit: true,
      userToEdit: user
    })
  }


  favoriteUsers = userid => {
    const { users } = this.state;
    this.setState({
      users: users.find((user => user.id === userid))
    })
    const user = users.find((user => user.id === userid))
    user.favorite = !user.favorite

    const userIndex = users.findIndex(user => user.id === userid)

    users[userIndex] = user
    this.setState({
      users: users
    })
  }
  handleSave = () => {
    const { users } = this.state;
    const currentUser = users.findIndex((user => this.state.userToEdit.id === user.id))
    users.splice(currentUser, 1, this.state.userToEdit)
    console.log("current user: " + currentUser)
    this.setState({
      ...this.state,
      users: users,
      enableEdit: false,
    })
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      userToEdit: { ...this.state.userToEdit, [e.target.name]: e.target.value }
    });
  }

  filterUser = (option) => {
    switch (option) {
      case "all":
        return this.state.users
        break;
      case "fav":
        return this.state.users.filter(user => user.favorite === true)
        break;
      case "nonfav":
        return this.state.users.filter(user => user.favorite !== true)
        break;
      default:
        return this.state.users;
    }
  }
  render() {
    const { users, isLoading, isError } = this.state
    console.log('users', users)
    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }
    return !this.state.enableEdit
      ? (
        <table id="t01">
          <thead>
            <tr>
              {this.renderTableHeader()}
              <Dropdown>
                <Dropdown.Toggle variant="primary">DROPDOWN</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item value="fav" onClick={() => this.setState({ ... this.state, filter: "fav" })}>Favorite</Dropdown.Item>
                  <Dropdown.Item value="nonfav" onClick={() => this.setState({ ... this.state, filter: "nonfav" })}>Non-favorite</Dropdown.Item>
                  <Dropdown.Item value="all" onClick={() => this.setState({ ... this.state, filter: "all" })}>All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </tr>
          </thead>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
      ) : (
        <div
          style={{ fontSize: 16, backgroundColor: "	silver", width: "50%", paddingLeft: "40px", marginleft: "40px" }}>
          <Form.Group>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={this.state.userToEdit.id}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name='name'
              value={this.state.userToEdit.name}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name='username'
              value={this.state.userToEdit.username}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              name='email'
              value={this.state.userToEdit.email}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name='phone'
              value={this.state.userToEdit.phone}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name='website'
              value={this.state.userToEdit.website}
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="success" onClick={this.handleSave}>Save</Button>
        </div>
      )
  }
}
const mapStateToProps = (state, props) => {
  return {
    user: state.users && state.users.find((user) =>
      props.match && user.id === props.match.params.id)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLoadUsersComplete: users => {
      dispatch(deleteUsers(users));
    },
    onLoadUsersComplete1: users => {
      dispatch(editUsers(users));
    },
    onLoadUsersComplete2: users => {
      dispatch(favoriteUsers(users));
    },
    userToEdit: users => {
      dispatch(editedUsers(users));
    },
    getUsersSuccess: users => {
      dispatch(getUsersSuccess(users))
    },
    editUsers: users => {
      dispatch(editUsers(users));
    },
    editUser1: user => {
      dispatch(editUser1(user));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
