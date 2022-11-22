import Server from './classes/server';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import userRoutes from './routes/user';
import postRoutes from './routes/post';
const server = new Server();
//Body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//FileUpload
server.app.use(fileUpload({ useTempFiles: true }));
//Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);
//conectar BD
server.start(() => {
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/fotosgram2',
        { useUnifiedTopology: true, useNewUrlParser: true }, (err: any) => {
            if (err) throw err;
            console.log('Base de datos ONLINE2');
        }
    )
    //levantar express

    console.log(`Servidor corriendo en puerto ${server.port}`);
}
);