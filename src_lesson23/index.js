import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

const COLORNOTE = [
  {
    id: 1,
    color: 'yellow',
  },
  {
    id: 2,
    color: 'blue',
  },
  {
    id: 3,
    color: 'green',
  },
  {
    id: 4,
    color: 'red',
  },
  {
    id: 5,
    color: 'gray',
  },
];

const Note = React.createClass({
  render: function() {
    const style = { backgroundColor: this.props.color };
    return (
      <div className="note" style={style}>
        <span className="delete-note" onClick={this.props.onDelete}> × </span>
        {this.props.children}
      </div>
    );
  }
});

const NoteEditor = React.createClass({
  getInitialState: function() {
    return {
      text: '',
      color: 'yellow',
    };
  },

  handleTextChange: function(event) {
     this.setState({ text: event.target.value });
  },

  handleColorChange: function(color) {
    this.setState({
      color: color
    });
  },

  handleNoteAdd: function() {
    if (this.state.text != '') {
      const newNote = {
        text: this.state.text,
        color: this.state.color,
        id: Date.now()
      };

      this.props.onNoteAdd(newNote);
      this.setState({text: ''});
    }
  },

  render: function() {
    return (
      <div className="note-editor">
                <textarea
                  placeholder="Enter your note here..."
                  rows={5}
                  className="textarea"
                  value={this.state.text}
                  onChange={this.handleTextChange}
                />
        <ColorNote onColorChange={this.handleColorChange}/>
        <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
      </div>
    );
  }
});

const ColorNote = React.createClass ({
  getInitialState: function() {
    return {
      colorNote: COLORNOTE,
      selectedOption: '1',
    };
  },

  colorChange: function (changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value,
    });
    this.props.onColorChange(this.state.colorNote[changeEvent.target.value-1].color);
  },

  render: function () {
    const that = this;
    return (
      <fieldset>
        {this.state.colorNote.map(function(radio) {
          return (
            <label className={'colors' +  (that.state.selectedOption == radio.id ? ' checked': '')} style={{backgroundColor : radio.color}}
                   key = {radio.id}
            >
              <input type="radio" className="radio"
                     value={radio.id}
                     checked={that.state.selectedOption == radio.id}
                     onChange={that.colorChange} />
            </label>
          )
        })
        }
      </fieldset>
    )
  }
});

const NotesGrid = React.createClass({
  componentDidMount: function() {
    const grid = this.refs.grid;
    this.msnry = new Masonry( grid, {
      itemSelector: '.note',
      columnWidth: 200,
      gutter: 10,
      isFitWidth: true
    });
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  },

  render: function() {
    const onNoteDelete = this.props.onNoteDelete;
    return (
      <div className="notes-grid" ref="grid">
        {
          this.props.notes.map(function(note){
            return (
              <Note
                key={note.id}
                onDelete={onNoteDelete.bind(null, note)}
                color={note.color}>
                {note.text}
              </Note>
            );
          })
        }
      </div>
    );
  }
});

const NotesApp = React.createClass({
  getInitialState: function() {
    return {
      notes: [],
      filter: '',
    };
  },

  componentDidMount: function() {
    const localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      this.setState({ notes: localNotes });
    }
  },

  componentDidUpdate: function() {
      this._updateLocalStorage();
  },

  handleNoteDelete: function(note) {
    this.refs.search.value ='';
    this.setState({ filter: [] });
    const noteId = note.id;
    const newNotes = this.state.notes.filter(function(note) {
      return note.id !== noteId;
    });
    this.setState({ notes: newNotes });
  },

  handleNoteAdd: function(newNote) {
    this.refs.search.value ='';
    this.setState({ filter: [] });
    const newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({ notes: newNotes });
  },

  handleSearch: function() {
    const searchQuery = this.refs.search.value.toLowerCase();
    this.setState({filter: searchQuery})
  },

  filterNotes: function (notes, filter) {
    if (filter != '') {
      const searchNotes = this.state.notes.filter(function (note) {
        const searchNote = note.text.toLowerCase();
        return searchNote.indexOf(filter) !== -1;
      });
      return searchNotes;
    }
    return notes;
  },

  render: function() {
    return (
      <div className="notes-app">
        <h2 className="app-header">NotesApp</h2>
          <input type="text" placeholder="Search..." ref="search" className="search-field" onChange={this.handleSearch} />
        <NoteEditor onNoteAdd={this.handleNoteAdd} />
        <NotesGrid notes={this.filterNotes(this.state.notes, this.state.filter)} onNoteDelete={this.handleNoteDelete} />
      </div>
    );
  },

  _updateLocalStorage: function() {
      const notes = JSON.stringify(this.state.notes);
      localStorage.setItem('notes', notes);
  }
});

ReactDOM.render(
  <NotesApp />,
  document.getElementById('app')
);
