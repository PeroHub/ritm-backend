const Program = require('../models/Program');


const getPrograms = async (req, res) => {
  const programs = await Program.find({}).sort({ createdAt: -1 });
  res.json(programs);
};


const addProgram = async (req, res) => {
  const { programName, faculty, description } = req.body;
  if (!programName || !faculty || !description) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  const program = new Program({ programName, faculty, description });
  const createdProgram = await program.save();
  res.status(201).json(createdProgram);
};


// Recommended Fix: Use findByIdAndDelete
const deleteProgram = async (req, res) => {
  try {
    const program = await Program.findByIdAndDelete(req.params.id);

    if (!program) {
      // If no program was found and deleted, send a 404 error
      return res.status(404).json({ message: 'Program not found' });
    }

    // If the program was found and deleted successfully
    res.json({ message: 'Program removed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getPrograms, addProgram, deleteProgram };