// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const { validateActionId, validateAction } = require('./actions-middlware')
const router = express.Router()

router.get('/', (req,res) => {
    Action.get()
        .then(action => {res.status(200).json(action)})
        .catch(err => {res.status(500).json({message: err})})
})

router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateAction, (req, res) => {
    Action.insert(req.body)
        .then(action => {res.status(201).json(action)})
        .catch(err => {res.status(500).json({message: err})})
})

router.put('/:id', validateActionId, validateAction, async (req, res) => {
    try{
        const changes = req.body
        const id = req.params.id
        const action = await Action.update(id, changes)
        res.status(200).json(action)
    } catch(err) {res.status(500).json(err)}
})

router.delete('/:id', validateActionId, (req, res) => {
    const id = req.params.id
    Action.remove(id)
        .then(action => {res.status(200).json({message: "Action Removed"})})
        .catch(err => {res.status(500).json({message: err})})
})

module.exports = router