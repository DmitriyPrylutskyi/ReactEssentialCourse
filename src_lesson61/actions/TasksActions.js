import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import api from '../api';

const TasksActions = {
    loadTasks(taskListId) {
        api.listTasks(taskListId)
        .then(data => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASKS_LOAD_SUCCESS,
                items : data.items || []
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASKS_LOAD_FAIL,
                error : err
            });
        });
    },

    loadTaskList(taskListId) {
        api.taskList(taskListId )
          .then(data => {
              AppDispatcher.dispatch({
                type: AppConstants.TASK_LIST_LOAD_SUCCESS,
                taskList: data
              });
          })
          .catch(err => {
              AppDispatcher.dispatch({
                type: AppConstants.TASK_LIST_LOAD_FAIL,
                error: err
              });
          });
    },

    updateTaskStatus(params) {
        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            status: params.isCompleted ? 'completed' : 'needsAction'
        })
        .then(data => {
            AppDispatcher.dispatch({
                type   : AppConstants.TASK_UPDATE_STATUS_SUCCESS,
                task   : data,
                taskId : params.taskId,
                status: params.isCompleted
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                status: !params.isCompleted,
                type  : AppConstants.TASK_UPDATE__STATUS_FAIL,
                error : err
            });
        });
    },

    updateTask(params) {
        api.updateTask({
            taskListId: params.taskListId,
            taskId: params.taskId,
            title: params.text,
            notes: params.notes,
            due: params.due
        })
        .then(data => {
            console.info(params.text);
            AppDispatcher.dispatch({
                type   : AppConstants.TASK_UPDATE_SUCCESS,
                task   : data,
                taskId : params.taskId
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_UPDATE_FAIL,
                error : err
            });
        });
    },

    createTask(params) {
        api.insertTask({
            taskListId: params.taskListId,
            title: params.text,
            notes: params.notes,
            date: params.due
        })
        .then(data => {
            AppDispatcher.dispatch({
                type : AppConstants.TASK_CREATE_SUCCESS,
                task : data
            });
        })
        .catch(err => {
            AppDispatcher.dispatch({
                type  : AppConstants.TASK_CREATE_FAIL,
                error : err
            });
        });
    },

    deleteTask(params) {
        api.deleteTask({
          taskListId: params.taskListId,
          taskId: params.taskId
        })
          .then(data => {
            console.info(params.taskId);
            AppDispatcher.dispatch({
              type   : AppConstants.TASK_DELETE_SUCCESS,
              task   : data,
              taskId : params.taskId
            });
          })
          .catch(err => {
            console.info(params.taskId);
            AppDispatcher.dispatch({
              type  : AppConstants.TASK_DELETE_FAIL,
              error : err
            });
          });
    }
};

export default TasksActions;
