import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1 className="logo">facebook</h1>
        <a className="right-menu" href="">Meu perfil <i className="fas fa-user-circle"></i></a>
      </div>
    );
  }
}

export default Header;