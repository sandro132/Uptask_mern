import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tareas.js";


const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where("creador").equals(req.usuario);
    
    res.json(proyectos);
};

const nuevoProyectos = async (req, res) => {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario.id;
    
    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const obtenerProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id);
    
    //Condicional que me verifica si el proyecto existe
    if(!proyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    };
    
    // condicional que restringe el acceso a los proyectos
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no Valida");
        return res.status(401).json({ msg: error.message });
    };

    // Obtener tarea del proyecto

    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id)

    res.json({
        proyecto,
        tareas,
    });

};

const editarProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id);
    
    //Condicional que me verifica si el proyecto existe
    if(!proyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    };
    
    // condicional que restringe el acceso a los proyectos
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no Valida");
        return res.status(401).json({ msg: error.message });
    };

    proyecto.nombre =  req.body.nombre || proyecto.nombre;
    proyecto.descripcion =  req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega =  req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente =  req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error) 
    }


};

const eliminarProyecto = async (req, res) => {
    const { id } = req.params;
    const proyecto = await Proyecto.findById(id);
    
    //Condicional que me verifica si el proyecto existe
    if(!proyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({ msg: error.message });
    };
    
    // condicional que restringe el acceso a los proyectos
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no Valida");
        return res.status(401).json({ msg: error.message });
    };

    try {
        await proyecto.deleteOne();
        res.json({ msg: "Proyecto Eliminado" })
    } catch (error) {
        console.log(error);
    }
};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};


export {
    obtenerProyecto,
    nuevoProyectos,
    obtenerProyectos,
    editarProyecto,
    eliminarColaborador,
    agregarColaborador,
    eliminarProyecto,
}