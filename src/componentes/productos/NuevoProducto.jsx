import React, {useState, Fragment} from 'react';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function NuevoProducto(props) {
    const navigate = useNavigate();
    const [producto, guardarProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: ''
    });
    const [archivo, guardarArchivo] = useState('');

    // Almacena el nuevo producto en la base de datos.
    const agregarProducto = async e => {
        e.preventDefault();

        // Crear un formdata.
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('descripcion', producto.descripcion);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        // Almacenarlo en la BD.
        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            // Lanzar una alerta.
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
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
            // Obtener una copia del state y agregar el nuevo.
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    // Coloca la imagen en el state.
    const leerArchivo = e => {
        guardarArchivo( e.target.files[0] );
    }

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"
                        onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Descripción:</label>
                    <input 
                        type="text" 
                        placeholder="Descripción Producto" 
                        name="descripcion"
                        onChange={leerInformacionProducto}
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
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file"  
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Producto" />
                </div>
            </form>
        </Fragment>
    )
}
export default NuevoProducto;