const { resolve } = require("bluebird");

module.exports = {
    completedTasks: (projectRepo, taskRepo, projectId) => {
        let completed
        let incompleted
        return projectRepo.getCompletedTasks(projectId)
            .then((data) => {
                completed = data.length
            })
            .then(() => {
                return projectRepo.getIncompletedTasks(projectId)
            })
            .then((data) => {
                incompleted = data.length
                return parseFloat((completed * 100 / (completed + incompleted)).toFixed(1))
            })
    },
    remainingTime: (projectRepo, taskRepo, projectId) => {
        return projectRepo.getRemainingTime(projectId)
            .then((data) => {
                let total = 0
                data.forEach(row => {
                    total += row.duration > 240 ? row.duration * 2 : row.duration
                });
                return total
            })
    },

    status: async (projectRepo, projectId) => {
        const tasksIncompleted = await projectRepo.getIncompletedTasks(projectId);

        if (tasksIncompleted.length > 0) {
            return 'project cannot be complet'
        } else {
            return 'finished project'
        }
    },

    priority: async (projectRepo, projectId) => {
        const tasksCompleted = await projectRepo.getCompletedTasks(projectId);
        const tasksIncompleted = await projectRepo.getIncompletedTasks(projectId);

        let total = 0;

        const times = await projectRepo.getRemainingTime(projectId);

        times.forEach(row => {
            total += row.duration > 240 ? row.duration * 2 : row.duration
        });

        total * 4;

        let percentage = (tasksCompleted.length / (tasksCompleted.length + tasksIncompleted.length)) * 100;
        percentage = percentage * 2;

        const priority = (percentage + total) / 6;

        console.log(priority);
        return priority;
    }
}