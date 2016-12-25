import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _tasks = [];
let _taskList = null;
let _error = null; // eslint-disable-line

function formatTask(data) {
    return {
        id          : data.id,
        text        : data.title,
        notes       : data.notes,
        dueTime     : data.due ? new Date(data.due) : '',
        isCompleted : data.status === 'completed',
        position    : data.position
    };
}

function formatTaskList(data) {
  return {
    id   : data.id,
    name : data.title
  };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    getTasks() {
        return _tasks;
    },

    getTaskList() {
        return _taskList;
    },

    emitChange() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    console.log(action.type, action)
    switch(action.type) {
        case AppConstants.TASKS_LOAD_SUCCESS: {
            _tasks = action.items.map(formatTask);

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASKS_LOAD_FAIL: {
            _tasks = [];
            _error = action.error;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_LOAD_SUCCESS: {
            _taskList = formatTaskList(action.taskList);

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_LOAD_FAIL: {
            _taskList = '';
            _error = action.error;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_UPDATE_SUCCESS: {
            const updatedTaskIndex = _tasks.findIndex(task => task.id === action.taskId);
            _tasks[updatedTaskIndex] = formatTask(action.task);

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_UPDATE_FAIL: {
            _error = action.error;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_CREATE_SUCCESS: {
            const newTask = formatTask(action.task);
            _tasks.unshift(newTask);

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_CREATE_FAIL: {
            _error = action.error;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_DELETE_SUCCESS: {
            const deleteTaskIndex = _tasks.findIndex(task => task.id === action.taskId);
            _tasks.splice(deleteTaskIndex,1);

            TasksStore.emitChange();
            break;
        }

        case AppConstants.TASK_DELETE_FAIL: {
            _error = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            break
        }
    }
});

export default TasksStore;
