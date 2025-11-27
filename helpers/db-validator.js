const existeRecetaPorId = async( id ) => {
console.log(id)
    const existeReceta = await Receta.findById(id);
    if ( !existeReceta ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

export {
    existeRecetaPorId
}