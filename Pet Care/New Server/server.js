const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const SERVER_PORT = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/PetCare', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB...', err));


// Define your Mongoose schemas
const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const PetSchema = new mongoose.Schema({
    name: String,
    breed: String,
    age: Number,
    weight: Number,
    image: String,
    creator: String
});

// Define your Mongoose models
const User = mongoose.model('User', UserSchema);
const Pet = mongoose.model('Pet', PetSchema);

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(bodyParser.json());

// Helper function
function authenticateToken(req, res, next) {
    // rest of your code...
}

// Update the endpoints to use Mongoose

app.post('/users/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ email: req.body.email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch {
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }

    try {
        // Check the password
        if(await bcrypt.compare(req.body.password, user.password)) {
            // Create and assign a token
            console.log( process.env.ACCESS_TOKEN_SECRET, ' process.env.ACCESS_TOKEN_SECRET');
            const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET);
            // Remove sensitive data
            user.password = undefined;
            res.json({ accessToken: accessToken, user: user });
        } else {
            res.send('Not Allowed');
        }
    } catch (e) {
        console.log('Login error', e);
        res.status(500).send();
    }
});

app.get('/pets', async (req, res) => {
    const pets = await Pet.find();
    res.json(pets);
});

app.post('/pets',  async (req, res) => {
    const pet = new Pet({ name: req.body.name, breed: req.body.breed, age: req.body.age, weight: req.body.weight, image: req.body.image });
    await pet.save();
    res.json(pet);
});

app.get('/pets/:id', async (req, res) => {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ error: "Pet not found." });

    // if (pet.creator !== req.user.username) return res.status(403).json({ error: "You're not allowed to edit this pet." });

    // pet.name = req.body.name;
    // await pet.save();
    res.json(pet);
});
app.put('/pets/:id', async (req, res) => {
    const pet = req.body
    const id = req.params.id
    console.log(pet, id);

    await Pet.findByIdAndUpdate(id, pet);
    
    // const pet = await Pet.findByIdAndUpdate(id, data);
    
    // if (!pet) return res.status(404).json({ error: "Pet not found." });

    res.json(pet);
});
app.delete('/pets/:id', async (req, res) => {
    await Pet.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Resource deleted successfully' });
  });
 

  app.get('/users/profile', async (req, res) => {
    console.log('hello');
    // const { _id } = req.user;

    // userModel.findOne({ _id }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
    //     .then(user => { res.status(200).json(user) })
    //     .catch(next);
  })



console.log(`Server started at port ${SERVER_PORT}`);
app.listen(SERVER_PORT);


