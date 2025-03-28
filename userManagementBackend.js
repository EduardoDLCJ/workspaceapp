const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/user_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User schema and model
const userSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    telefono: String,
    correo: { type: String, unique: true },
    pass: String,
    edad: Number,
});

const User = mongoose.model('User', userSchema);

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).send('Token requerido');
    jwt.verify(token, 'secret_key', (err, decoded) => {
        if (err) return res.status(401).send('Token inválido');
        req.userId = decoded.id;
        next();
    });
};

// Routes
app.get('/usuarios', verifyToken, async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).send('Error al obtener los usuarios');
    }
});

app.post('/registro', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.pass, 10);
        const nuevoUsuario = new User({ ...req.body, pass: hashedPassword });
        const savedUser = await nuevoUsuario.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).send('Error al registrar el usuario');
    }
});

app.put('/usuarios/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).send('Error al actualizar el usuario');
    }
});

app.delete('/usuarios/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
});

// Authentication route
app.post('/login', async (req, res) => {
    try {
        const { correo, pass } = req.body;
        const user = await User.findOne({ correo });
        if (!user) return res.status(404).send('Usuario no encontrado');
        const isPasswordValid = await bcrypt.compare(pass, user.pass);
        if (!isPasswordValid) return res.status(401).send('Contraseña incorrecta');
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Error al iniciar sesión');
    }
});

// Start server
const PORT = 4001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});