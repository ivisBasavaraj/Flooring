const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Project = require('../models/Project');
const User = require('../models/User');

// @route   POST api/projects
// @desc    Create a new project
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('plannerData', 'Project data is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, plannerData, thumbnail, isPublic, tags } = req.body;

      const newProject = new Project({
        name,
        description,
        plannerData,
        thumbnail,
        isPublic: isPublic || false,
        tags: tags || [],
        user: req.user.id
      });

      const project = await newProject.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/projects
// @desc    Get all projects for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { user: req.user.id },
        { 'collaborators.user': req.user.id },
        { isPublic: true }
      ]
    }).sort({ updatedAt: -1 });
    
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user has access to this project
    if (
      project.user.toString() !== req.user.id &&
      !project.collaborators.some(collaborator => 
        collaborator.user.toString() === req.user.id
      ) &&
      !project.isPublic
    ) {
      return res.status(401).json({ msg: 'Not authorized to access this project' });
    }

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user owns the project or is a collaborator with edit rights
    if (
      project.user.toString() !== req.user.id &&
      !project.collaborators.some(collaborator => 
        collaborator.user.toString() === req.user.id && 
        collaborator.role === 'editor'
      )
    ) {
      return res.status(401).json({ msg: 'Not authorized to edit this project' });
    }

    const { name, description, plannerData, thumbnail, isPublic, tags } = req.body;

    // Update fields if they exist in the request
    if (name) project.name = name;
    if (description !== undefined) project.description = description;
    if (plannerData) project.plannerData = plannerData;
    if (thumbnail) project.thumbnail = thumbnail;
    if (isPublic !== undefined) project.isPublic = isPublic;
    if (tags) project.tags = tags;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this project' });
    }

    await project.remove();

    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects/:id/collaborators
// @desc    Add a collaborator to a project
// @access  Private
router.post(
  '/:id/collaborators',
  [
    auth,
    [
      check('email', 'Email is required').isEmail(),
      check('role', 'Role must be either viewer or editor').isIn(['viewer', 'editor'])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const project = await Project.findById(req.params.id);

      // Check if project exists
      if (!project) {
        return res.status(404).json({ msg: 'Project not found' });
      }

      // Check if user owns the project
      if (project.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized to add collaborators' });
      }

      const { email, role } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      // Check if user is already a collaborator
      if (
        project.collaborators.some(
          collaborator => collaborator.user.toString() === user._id.toString()
        )
      ) {
        return res.status(400).json({ msg: 'User is already a collaborator' });
      }

      project.collaborators.push({
        user: user._id,
        role
      });

      await project.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/projects/:id/collaborators/:user_id
// @desc    Remove a collaborator from a project
// @access  Private
router.delete('/:id/collaborators/:user_id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }

    // Check if user owns the project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to remove collaborators' });
    }

    // Check if collaborator exists
    const collaboratorIndex = project.collaborators.findIndex(
      collaborator => collaborator.user.toString() === req.params.user_id
    );

    if (collaboratorIndex === -1) {
      return res.status(404).json({ msg: 'Collaborator not found' });
    }

    // Remove collaborator
    project.collaborators.splice(collaboratorIndex, 1);
    await project.save();

    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 