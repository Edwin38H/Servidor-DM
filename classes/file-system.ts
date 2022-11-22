import { FileUpload } from '../interfaces/file-upload';
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';
export default class FileSystem {
    constructor() { };
    guardarImagenTemporal(file: FileUpload, userId: string) {
        return new Promise((resolve, reject) => {
            //Crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            //Nombre de archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            /*console.log(file.name);
            console.log(NombreArchivo);*/
            //mover archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if (err) {
                    //no se pudo mover
                    reject(err);
                } else {
                    //todo salio bien!
                    resolve(nombreArchivo);
                }
            });
        })
    }
    private generarNombreUnico(nombreOriginal: string) {
        //6.copy.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid();
        return `${idUnico}.${extension}`;
    }
    private crearCarpetaUsuario(userId: string) {
        const pathUser = path.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        //console.log(pathUser);
        const existe = fs.existsSync(pathUser);
        if (!existe) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}