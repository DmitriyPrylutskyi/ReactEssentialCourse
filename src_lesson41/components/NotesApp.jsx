import React from 'react';

require('./NotesApp.scss');

const NoteEditor = require('./NoteEditor.jsx');
const NotesGrid = require('./NotesGrid.jsx');

class NotesApp extends React.Component {
  constructor (props) {
   super(props);
   this.state = {
     notes: [],
     filter: '',
   }
  }

  componentDidMount () {
    const localNotes = JSON.parse(localStorage.getItem('notes'));
    if (localNotes) {
      this.setState({ notes: localNotes });
    }
  }

  componentDidUpdate () {
      this._updateLocalStorage();
  }

  handleNoteDelete (note) {
    this.refs.search.value ='';
    this.setState({ filter: [] });
    const noteId = note.id;
    const newNotes = this.state.notes.filter ((note) => {
      return note.id !== noteId;
    });
    this.setState({ notes: newNotes });
  }

  handleNoteAdd (newNote) {
    this.refs.search.value ='';
    this.setState({ filter: [] });
    const newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({ notes: newNotes });
  }

  handleSearch () {
    const searchQuery = this.refs.search.value.toLowerCase();
    this.setState({filter: searchQuery})
  }

  filterNotes  (notes, filter) {
    if (filter != '') {
      const searchNotes = this.state.notes.filter ((note)=> {
        const searchNote = note.text.toLowerCase();
        return searchNote.indexOf(filter) !== -1;
      });
      return searchNotes;
    }
    return notes;
  }

  render () {
    return (
      <div className='notes-app'>
        <h2 className='app-header'>NotesApp</h2>
          <input type='text' placeholder='Search...' ref='search' className='search-field' onChange={() => this.handleSearch()} />
        <NoteEditor onNoteAdd={(newNote) => this.handleNoteAdd(newNote)} />
        <NotesGrid notes={this.filterNotes(this.state.notes, this.state.filter)} onNoteDelete={(note) => this.handleNoteDelete(note)} />
      </div>
    );
  }

  _updateLocalStorage () {
    const notes = JSON.stringify(this.state.notes);
    localStorage.setItem('notes', notes);
  }
}

module.exports = NotesApp;
