// add middlewares here related to projects
const Project = require('./projects-model')

const validateId = async (req, res, next) => {
    try{
        const id = req.params.id
        const project = await Project.get(id)
        if(!project) {
            res.status(404).json({message: 'Project not found'})
        } else {
            req.project = project
            next()
        }
    } catch(err) {
        res.status(500).json({message: err})
    }
}

const validateProject = async (req, res, next) => {
    try{
        const project = req.body
        if(!project.name || !project.description ) {
            res.status(400).json({message: "You must have all information entered."})
        } else {
            next()
        }
    } catch(err) {
        res.status(500).json({message: err})
    }
}

module.exports = { validateId, validateProject }