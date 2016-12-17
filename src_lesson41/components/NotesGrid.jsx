/**
 * Created by Dmitriy Prilutsky on 12.12.2016.
 */
import React from "react";

require('./NotesGrid.scss');

const Note = require('./Note.jsx');

class NotesGrid extends React.Component {
  componentDidMount () {
    const grid = this.refs.grid;
    this.msnry = new Masonry( grid, {
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 10,
      isFitWidth: true
    });
  }

  componentDidUpdate (prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  }

  render () {
    const onNoteDelete = this.props.onNoteDelete;
    return (
      <div className="notes-grid" ref="grid">
        {
          this.props.notes.map ((note)=> {
            return (
              <Note
                key={note.id}
                onDelete={() => onNoteDelete(note)}
                color={note.color}>
                {note.text}
              </Note>
            );
          })
        }
      </div>
    );
  }
}

module.exports = NotesGrid;
