const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Student = require('./models/Students');

const CONNECTION_URL = "mongodb+srv://abc:123@cluster0.kcyrqot.mongodb.net/students?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error(`Failed to connect to the database: ${error}`);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  try {
    const students = await Student.find().exec();
    console.log(students);
    res.status(200).send(students);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.post('/students', async (req, res) => {
  try {
    const { firstname, lastname, place } = req.body;
    const student = new Student({
      _id: new mongoose.Types.ObjectId(),
      firstname,
      lastname,
      place,
    });
    const result = await student.save();
    console.log(result);
    res.status(200).json({ msg: "Successfully submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred" });
  }
});

app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Student.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(200).json({ msg: "Successfully deleted" });
    } else {
      res.status(404).json({ msg: "Student not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred" });
  }
});

app.put('/students/:id', async (req, res) => {
  try {
    const { firstname, lastname, place } = req.body;
    const id = req.params.id;
    const result = await Student.updateOne({ _id: id }, { $set: { firstname, lastname, place } });
    if (result.nModified > 0) {
      res.status(200).json({ msg: "Successfully submitted" });
    } else {
      res.status(404).json({ msg: "Student not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred" });
  }
});
