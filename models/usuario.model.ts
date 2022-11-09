import {model, Schema,Document} from  'mongoose';
const usuarioSchema=new Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es necesario']
    },
    avatar:{
        type:String,
        default:'av-1.png'
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'El correo es necesario']
    }
});

interface IUsuario extends Document{
    nombre:string;
    email:string;
    avatar:string;
    compararPassword(password:string):boolean;
}
export const Usuario=model<IUsuario>('Usuario',usuarioSchema);