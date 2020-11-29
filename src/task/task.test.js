const task = require('./task')
const Promise = require('bluebird')

const AppDAO = require('../../src/db/dao')
const ProjectRepository = require('../../src/project/project_repository')
const TaskRepository = require('../../src/task/task_repository')
const { resolve } = require('bluebird')

let dao
let projectRepo
let taskRepo

describe('Análise das tarefas', () => {

    beforeAll(() => {
        return new Promise((resolve, reject) => {
            dao = new AppDAO('../../database.db');
            resolve()
        }).then(() => {
            projectRepo = new ProjectRepository(dao);
            taskRepo = new TaskRepository(dao);
            resolve()
        }).then(() => {
            resolve()
        })
    })

    it('Deve aceitar criação de tarefa no projeto de id 3 (2 tarefas incompletas)', () => {
        const name = "Tarefa confirmada"
        const description = "Essa tarefa tentará ser adicionada em um projeto 3"
        const duration = 600
        const isComplete = 0
        const projectId = 3
        return (task.createTask(projectRepo, taskRepo, name, description, duration, isComplete, projectId))
            .then((data) => expect(data).toBe('Refused'));
    })

    it('Deve mostrar a tarefa de maior prioridade do projeto 3 (500)', () => {
        const projectId = 3
        return (task.getPriorityTask(projectRepo, projectId))
            .then(data => expect(data).toBe(600))
    })
})