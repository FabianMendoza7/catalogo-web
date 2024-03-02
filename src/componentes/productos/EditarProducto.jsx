import { useState, useEffect } from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditarProducto(props) {
    const navigate = useNavigate();

    // Obtener el ID.
    const { id } = useParams();
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        descripcion: '',
        precio: ''
    });

    // Cuando el componente carga.
    useEffect(() => {
         // Consultar la api para traer el producto a editar.
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            guardarProducto(productoConsulta.data);
        }

        consultarAPI();
    }, [id])

    // Edita un Producto en la base de datos.
    const editarProducto = async e => {
        e.preventDefault();

        try {
            const res = await clienteAxios.put(`/productos/${id}`, producto);

            // Lanzar una alerta.
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // Redireccionar.
            navigate('/productos');

        } catch (error) {
            console.log(error);

            // Lanzar alerta.
            Swal.fire({
                type:'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    // Leer los datos del formulario.
    const leerInformacionProducto = e => {
        guardarProducto({
            // obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    // Extraer los valores del state.
    const { nombre, descripcion, precio } = producto;

    if(!nombre) return <Spinner />

    return (
        <>
            <h2>Editar Producto</h2>

            <form
                onSubmit={editarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"
                        onChange={leerInformacionProducto}
                        defaultValue={nombre}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input 
                        type="text" 
                        placeholder="Descripción Producto" 
                        name="descripcion"
                        onChange={leerInformacionProducto}
                        defaultValue={descripcion}
                    />
                </div>                

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio"
                        onChange={leerInformacionProducto}
                        defaultValue={precio}
                    />
                </div>

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Editar Producto" 
                        />
                </div>
            </form>
        </>
    )
}
export default EditarProducto;