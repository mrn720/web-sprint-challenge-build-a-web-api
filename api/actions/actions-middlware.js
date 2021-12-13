// add middlewares here related to actions
const Action = require('./actions-model')

const validateActionId = async (req, res, next) => {
    try{
        const id = req.params.id
        const action = await Action.get(id)
        if(!action) {
            res.status(404).json({message: 'Action not found'})
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json({message: err})
    }
}

const validateAction = async (req, res, next) => {
    try{
        const action = req.body
        if(!action.project_id || !action.description || !action.notes ) {
            res.status(400).json({message: "You must have all information entered."})
        } else {
            next()
        }
    } catch(err) {
        res.status(500).json({message: err})
    }
}

module.exports = { validateActionId, validateAction }