import Server from './classes/server';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
const server=new Server();
//Body parser/*
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());
//Rutas de mi app
server.app.use('/user',userRoutes);
//conectar BD
server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.port}`);
    const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/fotosgram2',
    {useUnifiedTopology:true,useNewUrlParser:true,
        //useCreateIndex:true
    },(err:any)=>{
        if(err)throw err;
            console.log('Base de datos ONLINE');
    }
)
//levantar express

}
);