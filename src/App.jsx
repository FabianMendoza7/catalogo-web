import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/*** Layout */
import Header from './componentes/layout/Header';
import Navegacion from './componentes/layout/Navegacion';

/** Componentes */
import Productos from './componentes/productos/Productos';
import EditarProducto from './componentes/productos/EditarProducto';
import NuevoProducto from './componentes/productos/NuevoProducto';
import Login from './componentes/auth/Login';

/** Contexto **/
import { CatalogoContext, CatalogoProvider } from './context/catalogoContext';

function App() {
    const [ auth, guardarAuth ] = useContext(CatalogoContext);

    return (
      <Router>
          <>
            <CatalogoProvider value={[ auth, guardarAuth ]}>
              <Header />

              <div className="grid contenedor contenido-principal">
                  <Navegacion />

                  <main className="caja-contenido col-9">
                        <Routes>
                            <Route exact path="/productos" element={<Productos />} />
                            <Route exact path="/productos/nuevo" element={<NuevoProducto />} />
                            <Route exact path="/productos/editar/:id" element={<EditarProducto />} />

                            <Route exact path="/iniciar-sesion" element={<Login />} />
                        </Routes>
                  </main>
              </div>
            </CatalogoProvider>
          </>
      </Router>
    )
}

export default App;