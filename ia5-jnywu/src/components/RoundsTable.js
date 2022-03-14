import React from 'react';
import AppMode from './../AppMode.js';
import ConfirmDialog from './ConfirmDialog.js';

class RoundsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteDialog: this.props.showConfirmDelete,
      target: 0
    }
  }
  //editRound -- Triggered when the user clicks the edit button for a given
  //round. The id param is the unique property that identifies the round.
  //Set the state variable representing the id of the round to be edited and
  //then switch to the ROUNDS_EDITROUND mode to allow the user to edit the
  //chosen round.
  editRound = (id) => {
    this.props.setEditId(id);
    this.props.changeMode(AppMode.ROUNDS_EDITROUND);
  }

  //confirmDelete -- Triggered when the user clicks the delete button
  //for a given round. The id paam is the unique property that 
  //identifies the round. Set the state variable representing the id
  //of the round to be deleted and then present a dialog box asking
  //the user to confirm the deletion.
  //TO DO: Implement the confirmation dialog box. For now, we
  //present alert box placeholder
  DeleteDialog = (id) => {
    this.props.setDeleteId(id);
    this.setState({ showDeleteDialog: true });
    this.setState({ target: id })
  }
  cancelDelete = () => {
    this.setState({ showDeleteDialog: false });
  }
  confirmDelete = () => {
    this.props.deleteRound()
    this.setState({ showDeleteDialog: false });
  }

  //renderTable -- render an HTML table displaying the rounds logged
  //by the current user and providing buttons to view/edit and delete each round.
  renderTable = () => {
    let table = [];
    for (const r in this.props.rounds) {
      table.push(
        <tr key={r}>
          <td>{this.props.rounds[r].date}</td>
          <td>{this.props.rounds[r].course}</td>
          <td>{this.props.rounds[r].strokes}</td>
          <td><button onClick={this.props.menuOpen ? null : () =>
            this.editRound(r)}>
            <span className="fa fa-eye"></span></button></td>
          <td><button onClick={this.props.menuOpen ? null :
            () => this.DeleteDialog(r)}>
            <span className="fa fa-trash"></span></button></td>
        </tr>
      );
    }
    return table;
  }

  //render--render the entire rounds table with header, displaying a "No
  //Rounds Logged" message in case the table is empty.
  render() {
    return (
      <div>
        {this.state.showDeleteDialog == true ?
          <ConfirmDialog
            confirm={this.confirmDelete}
            cancel={this.cancelDelete} />
          : null}
        <div className="padded-page">
          <h1></h1>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Cost</th>
                <th>View/Edit...</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(this.props.rounds).length === 0 ?
                <tr>
                  <td colSpan="5" style={{ fontStyle: "italic" }}>No rounds logged</td>
                </tr> : this.renderTable()
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default RoundsTable;
