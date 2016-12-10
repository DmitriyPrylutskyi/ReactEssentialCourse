import React from "react";
import ReactDOM from "react-dom";
import "./stylesheets/main.scss";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleTextChange (event) {
    this.setState({ text: event.target.value });
  }

  handleTodoAdd () {
    if (this.state.text != '') {
      const newTodo = {
        text: this.state.text,
        complete: false,
        id: Date.now()
      };
      this.props.onTodoAdd(newTodo);
      this.setState({text: ''});
    }
  }

  render () {
    return (
      <div className="todo-add">
        <input
         placeholder="Enter todo here..."
         className="todo-input"
         value={this.state.text}
         onChange = {this.handleTextChange.bind(this)}
        />
        <button type="button" className="btn btn-default" onClick={this.handleTodoAdd.bind(this)}>Add</button>
      </div>
    );
  }
}

class Todo extends React.Component {
  render () {
    return (
      <div className="todo-item" >
        <div onClick={this.props.onComplete}>
          <p className={this.props.complete ? ' complete': ' uncomplete'}>
            {this.props.children}
          </p>
        </div>
        <span className="delete-todo" onClick={this.props.onDelete}> × </span>
      </div>
    );
  }
}

class TodosList extends React.Component {
  constructor(props) {
    super(props);
    this.onTodoDelete = this.props.onTodoDelete;
    this.onTodoComplete = this.props.onTodoComplete;
  }

  render () {
    return (
      <div className="todos-list">
        {
          this.props.todos.map((todo)=>{
            return (
              <Todo
                key={todo.id}
                onDelete={this.onTodoDelete.bind(null, todo)}
                onComplete={this.onTodoComplete.bind(null, todo)}
                complete={todo.complete}
                >
                {todo.text}
              </Todo>
            );
          })
        }
      </div>
    );
  }
}

class FiltersTodos extends React.Component {

  handleTodoFiler (event) {
    const filter = event.target.name;
    this.props.onTodoFilter(filter);
  }

  render () {
    return (
      <div className="todos-filters btn-group" role="group">
          <button type="button" className="btn btn-default" name="all" onClick={this.handleTodoFiler.bind(this)}>All</button>
          <button type="button" className="btn btn-default" name="active" onClick={this.handleTodoFiler.bind(this)}>Active</button>
          <button type="button" className="btn btn-default" name="complete" onClick={this.handleTodoFiler.bind(this)}>Complete</button>
      </div>
    );
  }
}

class TodosApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: "all",
    };
  }

  componentDidMount () {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    if (localTodos) {
      this.setState({ todos: localTodos });
      this.setState({ todos: localTodos });
    }
  }

  componentDidUpdate () {
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    const todos = JSON.stringify(this.state.todos);
    localStorage.setItem('todos', todos);
  }

  handleTodoDelete (todo) {
    const todoId = todo.id;
    const newTodos = this.state.todos.filter((todo) => {
      return todo.id !== todoId;
    });
    this.setState({ todos: newTodos });
  }

  handleTodoAdd (newTodo) {
    const newTodos = this.state.todos.slice();
    newTodos.unshift(newTodo);
    this.setState({ todos: newTodos });
  }

  handleTodoComplete (todo) {
    const todoId = todo.id;
    const compTodos = this.state.todos.slice();
    compTodos.map((todo) => {
      if(todo.id === todoId)
        todo.complete = !todo.complete;
    });
    this.setState({ todos: compTodos });
  }

  handleTodoFilter (filter) {
    this.setState({ filter: filter });
  }

  filterTodos (todos, filter) {
    if (filter === 'active')
      return todos.filter( todo => todo.complete === false );

    if (filter === 'complete')
      return todos.filter( todo => todo.complete === true );

    return todos;
  }

  render () {
    return (
      <div className="title">
        <header>
          <h2 className="app-header">TODOS</h2>
        </header>
        <div className="todos-app">
          <AddTodo onTodoAdd={this.handleTodoAdd.bind(this)} />
          <FiltersTodos onTodoFilter={this.handleTodoFilter.bind(this)}/>
          <TodosList
            todos={this.filterTodos(this.state.todos, this.state.filter)}
            onTodoDelete={this.handleTodoDelete.bind(this)}
            onTodoComplete={this.handleTodoComplete.bind(this)} />
        </div>
      </div>
    );
  }
}

ReactDOM.render (
  <TodosApp>
  </TodosApp>,
  document.getElementById('app')
);
