const CLIENT_ID = '1094779988969-5jocsmlophl3oq5rbdfd0ilbhu3mqmqo.apps.googleusercontent.com';
const SCOPES = ['https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/plus.me'];

/*eslint-disable */
export default {
    authorize(params) {
        return new Promise((resolve, reject) => {
            gapi.auth.authorize(
                {
                    'client_id': CLIENT_ID,
                    'scope': SCOPES,
                    'immediate': params.immediate,
                    'cookie_policy': 'single_host_origin'
                },
                authResult => {
                    if (authResult.error) {
                        return reject(authResult.error);
                    }

                    return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve() ) );
                }
            );
        });
    },

    listTaskLists() {
        const request = gapi.client.tasks.tasklists.list();

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    insertTaskList({ title }) {
        const request = gapi.client.tasks.tasklists.insert({
            title: title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    listTasks(taskListId) {
        const request = gapi.client.tasks.tasks.list({
            tasklist: taskListId
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    insertTask({ taskListId, title }) {
        const request = gapi.client.tasks.tasks.insert({
            tasklist : taskListId,
            title    : title
        });

        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    updateTask({ taskListId, taskId, ...params }) {
        console.info(taskListId, taskId);
        const request = gapi.client.tasks.tasks.update({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId,
            ...params
        });
        return new Promise((resolve, reject) => {
            request.execute(resp => resolve(resp));
        });
    },

    deleteTask({ taskListId, taskId, ...params }) {
        console.info(taskListId, taskId);
        const request = gapi.client.tasks.tasks.delete({
            tasklist : taskListId,
            task     : taskId,
            id       : taskId,
            ...params
        });

        return new Promise((resolve, reject) => {
          request.execute(resp => resolve(resp));
        });
    }
}
/*eslint-disable */
