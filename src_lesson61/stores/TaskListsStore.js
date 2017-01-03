import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _taskLists = [];
let _error = null; // eslint-disable-line

function formatTaskList(data) {
    return {
        id   : data.id,
        name : data.title
    };
}

const TaskListsStore = Object.assign({}, EventEmitter.prototype, {
    getTaskLists() {
        return _taskLists
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
    console.info(action.type, action);
    switch(action.type) {
        case AppConstants.TASK_LISTS_LOAD_SUCCESS: {
            _taskLists = action.items.map(formatTaskList);

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LISTS_LOAD_FAIL: {
            _taskLists = [];
            _error = action.error;

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_CREATE_SUCCESS: {
            const newTaskList = formatTaskList(action.taskList);
            _taskLists.push(newTaskList);

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_CREATE_FAIL: {
            _error = action.error;

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_UPDATE_SUCCESS: {
            const updateListIndex = _taskLists.findIndex(taskLists => taskLists.id === action.taskListId);
            _taskLists[updateListIndex].name = action.title;

            TaskListsStore.emitChange();
            break;
        }
        case AppConstants.TASK_LIST_UPDATE_FAIL: {
            _error = action.error;

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_DELETE_SUCCESS: {
            const deleteTaskListIndex = _taskLists.findIndex(taskList => taskList.id === action.taskListId);
            _taskLists.splice(deleteTaskListIndex,1);

            TaskListsStore.emitChange();
            break;
        }

        case AppConstants.TASK_LIST_DELETE_FAIL: {
            _error = action.error;

            TaskListsStore.emitChange();
            break;
        }

        default: {
            break
        }
    }
});

export default TaskListsStore;
