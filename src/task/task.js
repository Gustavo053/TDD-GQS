const project = require('../project/project');

module.exports = {
    createTask: async (projectRepo, taskRepo, name, description, duration, isComplete, projectId) => {
        const tasksIncompleted = await projectRepo.getIncompletedTasks(projectId);

        if (tasksIncompleted.length > 5) {
            return 'Refused';
        } else {
            // Adicionar a task ao BD

            let total = 0;

            const times = await projectRepo.getRemainingTime(projectId);

            times.forEach(row => {
                total += row.duration > 240 ? row.duration * 2 : row.duration
                // console.log(row);
                // console.log(total);
            });
            // console.log(projectRepo.getRemainingTime(projectId));

            if (total > 800) {
                return 'Refused';
            } else {
                taskRepo.create(name, description, duration, isComplete, projectId);
                return 'Confirmed';
            }
        }
    },

    getPriorityTask: async (projectRepo, projectId) => {
        let priorityTask = '';

        let tasks = await projectRepo.getRemainingTime(projectId);

        // console.log(tasks);

        if (tasks.length == 0) {
            return 'no tasks incomplets';
        } else {
            priorityTask = tasks[0].duration;

            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].duration > priorityTask) {
                    priorityTask = tasks[i].duration;
                }
            }

            // console.log(priorityTask)
            return priorityTask;
        }
    }
}