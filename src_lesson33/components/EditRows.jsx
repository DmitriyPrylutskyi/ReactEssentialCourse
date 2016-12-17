/**
 * Created by Dmitriy Prilutsky on 16.12.2016.
 */
import React from "react";

require('./EditRows.scss');

class EditRows extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: false,
      name: '',
      sum: 0
    };
  }

  handleFormSubmit (formSubmitEvent) {
    formSubmitEvent.preventDefault();
    this.setState({ form: false})
    const newRow = {
      id: Date.now(),
      name: this.state.name,
      sum: this.state.sum,
      isChecked: false
    };
    this.props.onRowAdd(newRow);
  }

  handleFormCancel() {
    this.setState({ form: false})
  }

  handleTextChange (event) {
    if (event.target.name == "name-field") this.setState({ name: event.target.value })
    if (event.target.name == "sum-field") this.setState({ sum: event.target.value })
  }

  handleRowAdd () {
    this.setState({ form: true})
  }

  handleRowDel () {
    this.props.onRowDel();
  }

  render() {
    return (
      <div className="editrows">
        <button className="add-button" onClick={() => this.handleRowAdd()}>Add new row</button>
        <button className="del-button" onClick={() => this.handleRowDel()}>Delete selected</button>
        {this.state.form ?
          <form onSubmit={(e) => this.handleFormSubmit(e)}>
            <input type="text" placeholder="Name" className="name-field" name="name-field" onChange={(e) => this.handleTextChange(e)} />
            <input type="text" placeholder="Sum" className="sum-field" name="sum-field" onChange={(e) => this.handleTextChange(e)} />
            <button className="btn btn-default" type="submit">Ok</button>
            <button className="btn btn-default" type="button" onClick={() => this.handleFormCancel() }>Cancel</button>
          </form>
        : ''}
      </div>
    )
  }
}

module.exports = EditRows;
