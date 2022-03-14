import React from 'react';

class FloatingButton extends React.Component {
  // constructor(props) {
  //   super (props);
  //   this.state = {menuOpened: this.props.menuOpened}
  // }
  render() {
    const buttonDisable = this.props.menuOpen !== false;
    return (
      <div type="button" className="floatbtn" onClick={this.props.handleClick}>
        <span className="floatbtn-icon fa fa-plus"></span>
      </div>
    );
  }
}

export default FloatingButton;
