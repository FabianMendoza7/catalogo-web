import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

function EditarProducto(props) {
    const navigate = useNavigate();

    // Obtener el ID.
    const { id } = props.match.params;
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        imagen : ''
    });
    const [archivo, guardarArchivo] = useState('');

    // Cuando el componente carga.
    useEffect(() => {
         // Consultar la api para traer el producto a editar.
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            guardarProducto(productoConsulta.data);
        }

        consultarAPI();
    }, [])

    // Edita un Producto en la base de datos.
    const editarProducto = async e => {
        e.preventDefault();

        // Crear un formdata.
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('descripcion', producto.descripcion);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // Almacenarlo en la BD.
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

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

    // Coloca la imagen en el state.
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    // Extraer los valores del state.
    const { nombre, descripcion, precio, imagen } = producto;

    if(!nombre) return <Spinner />

    return (
        <Fragment>
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

                <div className="campo">
                    <label>Imagen:</label>
                    { imagen ? (
                        <img src={`http://localhost:5000/${imagen}`} alt="imagen" width="300" />
                    ) : null }
                    <input 
                        type="file"  
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment>
    )
}
export default EditarProducto;