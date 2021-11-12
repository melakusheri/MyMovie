require('dotenv').config()
const express = require('express');
const cors = require('cors');
const path = require('path');
const dbConnection = require('./config/connection');
const commentRoutes = require('./routes/comment.js');
const favoritesRoutes = require('./routes/favorite.js');
const likeRoutes = require('./routes/like.js');
const usersRoutes = require('./routes/users.js');



const app = express();
app.use(cors())
const PORT = process.env.PORT || 3001;
dbConnection()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}


app.use(commentRoutes);
app.use(favoritesRoutes);
app.use(likeRoutes);
app.use(usersRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(` Now listening on localhost:${PORT}`));