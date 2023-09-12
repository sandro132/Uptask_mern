import Proyecto from "../models/Proyecto.js"

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
    console.log(id)
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

    res.json(proyecto)

};

const editarProyecto = async (req, res) => {};

const eliminarProyecto = async (req, res) => {};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

const obtenerTareas = async (req, res) => {};

export {
    obtenerProyecto,
    nuevoProyectos,
    obtenerProyectos,
    editarProyecto,
    eliminarColaborador,
    agregarColaborador,
    eliminarProyecto,
    obtenerTareas,
}