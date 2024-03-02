import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function NuevoProducto({ cerrarModal }) {
    const navigate = useNavigate();
    const [producto, guardarProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: ''
    });

    // Almacena el nuevo producto en la base de datos.
    const agregarProducto = async e => {
        e.preventDefault();

        try {
            const res = await clienteAxios.post('/productos', producto);

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

            cerrarModal();

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

    return (
        <>
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

                <div className="enviar">
                        <input 
                            type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Producto" 
                        />
                </div>
            </form>
        </>
    )
}
export default NuevoProducto;