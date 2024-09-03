const database = require('./database');

const loginUser = (req, res) => {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    const user = database.find(user => user.email === email && user.password === password);

    if (user) {
        req.session.user = user;
        res.json({ message: 'Login berhasil', user: user });
    } else {
        res.status(401).json({ message: 'Email atau password salah' });
    }
};

const getUserData = (req, res) => {
    if (req.session.user) {
        const { password, ...userWithoutPassword } = req.session.user;
        res.json(userWithoutPassword);
    } else {
        res.status(401).json({ message: 'Silakan login terlebih dahulu' });
    }
};


function getAllUsers(req, res) {
    res.json(database);
}

function updateUser(req, res) {
    const user = database.find(u => u.id === 1); 
    const { name, email, password, linkImgProfile } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (linkImgProfile) user.linkImgProfile = linkImgProfile;

    res.json(user);
}

function removeUser(req, res) {
    const index = database.findIndex(u => u.id === 1); 
    if (index !== -1) {
        database.splice(index, 1);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
}

function addUser(req, res) {
    const { id, name, email, password, linkImgProfile } = req.body;
    const newUser = { id, name, email, password, linkImgProfile };
    database.push(newUser);
    res.json(newUser);
}

module.exports = {
    loginUser,
    getAllUsers,
    getUserData,
    updateUser,
    removeUser,
    addUser
};
