/**
 * Created by Dmitriy Prilutsky on 12.12.2016.
 */

import React from "react";
require ('./NoteEditor.scss');

const ColorNote = require('./ColorNote.jsx');

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      color: 'yellow',
    };
  }

  handleTextChange (event) {
    this.setState({ text: event.target.value });
  }

  handleColorChange (color) {
    this.setState({
      color: color
    });
  }

  handleNoteAdd () {
    if (this.state.text != '') {
      const newNote = {
        text: this.state.text,
        color: this.state.color,
        id: Date.now()
      };
      this.props.onNoteAdd(newNote);
      this.setState({text: ''});
    }
  }

  render () {
    return (
      <div className="note-editor">
                <textarea
                  placeholder="Enter your note here..."
                  rows={5}
                  className="textarea"
                  value={this.state.text}
                  onChange={(e)=>this.handleTextChange(e)}
                />
        <ColorNote onColorChange={(c)=>this.handleColorChange(c)}/>
        <button className="add-button" onClick={()=>this.handleNoteAdd()}>Add</button>
      </div>
    );
  }
}

module.exports = NoteEditor;
