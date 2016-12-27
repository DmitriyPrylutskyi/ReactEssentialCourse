import React from 'react';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDel from 'material-ui/svg-icons/action/delete-forever';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';


import TaskListsActions from '../actions/TaskListsActions';
import TasksActions from '../actions/TasksActions';
import TasksStore from '../stores/TasksStore';
import Task from './Task.jsx';
import TaskCreateModal from './TaskCreateModal.jsx';
import DeleteTaskListModal from './TaskDeleteModal.jsx'

require ('./TasksPage.less');

const ENTER_KEY = 13;
const ESC_KEY = 27;

function getStateFromFlux() {
    return {
        tasks: TasksStore.getTasks(),
        taskList: TasksStore.getTaskList() || {}
    };
}

const TasksPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            ...getStateFromFlux(),
            isCreatingTask: false,
            isEditingList: false,
            isDeletingList: false
        };
    },

    componentWillMount() {
        TasksActions.loadTasks(this.props.params.id);
        TasksActions.loadTaskList(this.props.params.id);
    },

    componentDidMount() {
        TasksStore.addChangeListener(this._onChange);
    },

    componentWillReceiveProps(nextProps) {
        if (this.props.params.id !== nextProps.params.id) {
            TasksActions.loadTasks(nextProps.params.id);
            TasksActions.loadTaskList(nextProps.params.id);
        }
    },

    componentWillUnmount() {
        TasksStore.removeChangeListener(this._onChange);
    },

    handleStatusChange(taskId, { isCompleted }) {
        TasksActions.updateTaskStatus({
            taskListId: this.props.params.id,
            taskId: taskId,
            isCompleted: isCompleted
        });
    },

    handleTaskUpdate(taskId, { text, notes, due }) {
        TasksActions.updateTask({
            taskListId: this.props.params.id,
            taskId: taskId,
            text: text,
            notes: notes,
            due: due
        });
    },

    handleAddTask() {
        this.setState({ isCreatingTask : true });
    },

    handleClose() {
        this.setState({ isCreatingTask : false });
    },

    handleTaskSubmit(task) {
        const taskListId = this.props.params.id;

        TasksActions.createTask({ taskListId, ...task });

        this.setState({ isCreatingTask : false });
    },

    handleTaskDelete(taskId) {
      TasksActions.deleteTask({
        taskListId: this.props.params.id,
        taskId: taskId
      });
    },

    handleDeleteTaskList() {
        this.setState({ isDeletingList : true });
    },

    handleDeleteSubmit(){
      TaskListsActions.deleteTaskList(this.state.taskList.id);
      this.context.router.push('/lists')
      this.setState({ isDeletingList : false });
    },

    handleDeleteClose() {
        this.setState({ isDeletingList : false });
    },

    handleEditTaskList(){
        this.setState({ isEditingList:true }, this.focusInput);
    },

    focusInput() {
        this.input.focus();
    },

    handleEditTaskListCancel(){
        this.setState({ isEditingList : false });
    },

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            this.handleEditTaskListSubmit();
        }

        if (e.keyCode === ESC_KEY) {
            this.handleEditListCancel();
        }
    },

    handleEditTaskListSubmit(){
        const taskListId = this.state.taskList.id;
        const title = this.input.value;
        TaskListsActions.updateTaskList(
            {
                id: taskListId,
                title: title
            }
        )
        this.setState({ taskList: {name : title, id : taskListId}, isEditingList : false });
    },

    render() {
        return (
            this.state.isEditingList
            ?
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <div className='TasksPage'>
                        <div className='TaskList editing'>
                            <input
                                className='TaskList__input'
                                type='text'
                                defaultValue={this.state.taskList.name}
                                onKeyDown={this.handleKeyDown}
                                ref={c => this.input = c}
                            />
                            <div className='Task__toolbar'>
                                <div>
                                    <RaisedButton primary onClick={this.handleEditTaskListSubmit} label='Save' style={{marginRight: '20px'}} />
                                    <FlatButton onClick={this.handleEditTaskListCancel} label='Cancel' />
                                </div>
                            </div>
                        </div>
                        <div className='TasksPage__tasks'>
                            {
                                this.state.tasks.map(task =>
                                    <Task
                                      key={task.id}
                                      text={task.text}
                                      notes={task.notes}
                                      date={task.due}
                                      isCompleted={task.isCompleted}
                                      onStatusChange={this.handleStatusChange.bind(null, task.id)}
                                      onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                                      onDelete={this.handleTaskDelete.bind(null, task.id)}
                                    />
                                )
                            }
                        </div>
                    </div>
                </MuiThemeProvider>
            :
                <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                    <div className='TasksPage'>
                        <div className='TasksPage__header'>
                            <h2 className='TasksPage__title'>{this.state.taskList.name}
                                <div className='TaskListPage__tools'>
                                    <IconButton onClick={this.handleEditTaskList}>
                                        <ContentEdit />
                                    </IconButton>
                                    <IconButton onClick={this.handleDeleteTaskList}>
                                        <ContentDel />
                                    </IconButton>
                                </div>
                            </h2>
                            <div className='TasksPage__tools'>
                                <IconButton onClick={this.handleAddTask}>
                                    <ContentAdd />
                                </IconButton>
                            </div>
                        </div>

                        <div className='TasksPage__tasks'>
                            {
                                this.state.tasks.map(task =>
                                    <Task
                                        key={task.id}
                                        text={task.text}
                                        notes={task.notes}
                                        date={task.due}
                                        isCompleted={task.isCompleted}
                                        onStatusChange={this.handleStatusChange.bind(null, task.id)}
                                        onUpdate={this.handleTaskUpdate.bind(null, task.id)}
                                        onDelete={this.handleTaskDelete.bind(null, task.id)}
                                    />
                                )
                            }
                        </div>
                        <TaskCreateModal
                            isOpen={this.state.isCreatingTask}
                            onSubmit={this.handleTaskSubmit}
                            onClose={this.handleClose}
                        />
                        <DeleteTaskListModal
                          isOpen={this.state.isDeletingList}
                          onSubmit={this.handleDeleteSubmit}
                          onClose={this.handleDeleteClose}
                          subject={this.state.taskList.name}
                        />
                    </div>
                </MuiThemeProvider>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default TasksPage;
