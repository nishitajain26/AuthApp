require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
app.use(cors());
const mongoDBURL = process.env.mongoDB_URL || 'mongodb://localhost:27017';

mongoose.connect(process.env.mongoDB_URL || 'mongodb://localhost:27017/Auth-App', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));



const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phoneNumber: String,
    password: String
});

const User = mongoose.model('User', userSchema , 'Authorization');


console.log("Database is created");
const getDashboardData = {
    userProfile: {
        name: '',
        email: ''
    }
};


app.get('/', (req, res) => {
    // console.log("Server for AuthApp");
    res.send("Server for AuthApp");
});
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

app.post('/signupUser', async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    console.log('Received signup request:', req.body);
    
   
     try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: 'user already exists' });
        }

        const newUser = new User({ name, email, phoneNumber, password });
        await newUser.save();

        res.status(201).send({ message: 'signup successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
    

});

app.post('/login', async (req, res) => {
    const { loginName, password } = req.body;

    try {
        const user = await User.findOne({ email: loginName, password });
        if (!user) {
            return res.status(400).send({ message: 'invalid credentials' });
        }
        
        res.status(201).send({
            token: 'jwt-token',
            loginName: user.name,
            email: user.email ,
            message : 'login is succesful'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});


const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ') || token.split(' ')[1] !== 'jwt-token') {
        return res.status(401).send('Unauthorized');
    }

    next();
};
app.get('/getDashboardData', authMiddleware, async (req, res) => {
    res.json(getDashboardData);
});