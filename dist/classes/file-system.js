"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            //Crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            //Nombre de archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            /*console.log(file.name);
            console.log(NombreArchivo);*/
            //mover archivo del Temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    //no se pudo mover
                    reject(err);
                }
                else {
                    //todo salio bien!
                    resolve(nombreArchivo);
                }
            });
        });
    }
    generarNombreUnico(nombreOriginal) {
        //6.copy.jpg
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = (0, uniqid_1.default)();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        const pathUserTemp = pathUser + '/temp';
        //console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
}
exports.default = FileSystem;
