// Write your "projects" router here!
const express = require('express')
const { validateId,
        validateProject } = require('./projects-middleware')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res) => {
    Project.insert(req.body)
        .then(project => {res.status(201).json(project)})
        .catch(err => {res.status(500).json({message: err})})
})

router.put('/:id', validateProject, validateId, async (req, res) => {
    try{
        const changes = req.body
        const id = req.params.id
        const project = await Project.update(id, changes)
        res.status(200).json(project)
    } catch(err) {res.status(500).json(err)}
})

router.delete('/:id', validateId, (req, res) => {
    const id = req.params.id
    Project.remove(id)
        .then(project => {res.status(200).json({message: "Project Removed"})})
        .catch(err => {res.status(500).json({message: err})})
})

router.get('/:id/actions', validateId, (req, res) => {
    const id = req.params.id
    Project.getProjectActions(id)
        .then(actions => {res.status(200).json(actions)})
        .catch(err => {res.status(500).json({message: err})})
})

module.exports = router