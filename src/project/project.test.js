const project = require('./project')
const Promise = require('bluebird')

const AppDAO = require('../../src/db/dao')
const ProjectRepository = require('../../src/project/project_repository')
const TaskRepository = require('../../src/task/task_repository')
const { resolve } = require('bluebird')

let dao
let projectRepo
let taskRepo

describe('Análise dos projetos', () => {

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

    it('Deve retornar que o projeto 3 não pode ser finalizado', () => {
        const projectId = 3
        return (project.status(projectRepo, projectId))
            .then((data) => expect(data).toBe('project cannot be complet'));
    })

    it('Deve retornar a prioridade do projeto 3', () => {
        const projectId = 3
        return (project.priority(projectRepo, projectId))
            .then((data) => expect(data).toBe(244.44444444444446));
    })


})