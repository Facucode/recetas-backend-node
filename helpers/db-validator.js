const existeRecetaPorId = async( id ) => {

    const existeReceta = await Receta.findById(id);
    if ( !existeReceta ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

export {
    existeRecetaPorId
}