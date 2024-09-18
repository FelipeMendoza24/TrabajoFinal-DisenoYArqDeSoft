import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to hold form data and properties from backend
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipoOferta: '',
    ciudad: '',
    direccion: '',
    tipoPropiedad: '',
    tamano: '',
    precio: '',
    habitaciones: '',
    banos: '',
    estado: ''
  });

  // States for filtering
  const [filterTipoPropiedad, setFilterTipoPropiedad] = useState('');
  const [minPrecio, setMinPrecio] = useState('');
  const [maxPrecio, setMaxPrecio] = useState('');
  const [deleteId, setDeleteId] = useState(''); // State for deleting property by ID
  const [updateId, setUpdateId] = useState(''); // State for updating property state by ID
  const [updateEstado, setUpdateEstado] = useState(''); // State for the new estado of the property


  // Fetch properties from backend when component loads
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:8080/propiedades/todos');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission to add new property
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/guardarPropiedad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProperties(); // Fetch updated properties after new property is added
        setFormData({
          nombre: '',
          tipoOferta: 'Venta',
          ciudad: '',
          direccion: '',
          tipoPropiedad: 'Casa',
          tamano: '',
          precio: '',
          habitaciones: '',
          banos: '',
          estado: ''
        });
      }
    } catch (error) {
      console.error('Error añadiendo propiedad:', error);
    }
  };
  // Handle deleting a property by ID
  const handleDeleteProperty = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`http://localhost:8080/eliminarPropiedad/${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProperties(); // Fetch updated properties after deletion
        setDeleteId(''); // Reset delete ID field
      }
    } catch (error) {
      console.error('Error eliminando la propiedad:', error);
    }
  };

  // Handle updating a property state by ID
  const handleUpdateEstado = async () => {
    if (!updateId || updateEstado === '') return;
    try {
      const response = await fetch(`http://localhost:8080/actualizarPropiedadEstado/${updateId}?estado=${updateEstado}`, {
        method: 'PUT',
      });

      if (response.ok) {
        fetchProperties(); // Fetch updated properties after state change
        setUpdateId(''); // Reset the update ID field
        setUpdateEstado(''); // Reset the estado field
      }
    } catch (error) {
      console.error('Error actualizando estado de la propiedad:', error);
    }
  };
  // Function to filter properties by tipoPropiedad
  const filterByTipoPropiedad = async () => {
    try {
      const response = await fetch(`http://localhost:8080/filtrarPropiedadesTipoPropiedad?tipoPropiedad=${filterTipoPropiedad}`);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error filtering by tipoPropiedad:', error);
    }
  };

  // Function to filter properties by price range
  const filterByPrecio = async () => {
    try {
      const url = `http://localhost:8080/filtrarPropiedadesPrecio?minPrecio=${minPrecio}&maxPrecio=${maxPrecio}`;
      const response = await fetch(url);
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error filtering by precio:', error);
    }
  };

  // Function to clear all filters
  const clearFilters = () => {
    setFilterTipoPropiedad('');  // Clear tipoPropiedad filter
    setMinPrecio('');            // Clear minPrecio filter
    setMaxPrecio('');            // Clear maxPrecio filter
    fetchProperties();           // Fetch all properties again
  };

  return (
    <div>
      {/* AppBar */}
      <div className="app-bar">
        Inmobiliaria MENAV
      </div>

      {/* Main content */}
      <div className="app-container">
        {/* Left side for adding new property */}
        <div className="left-side">
          <h2>Gestión de Propiedades</h2>

          {/* Form to add new property */}
          <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
            <label>Tipo Oferta:</label>
            <select name="tipoOferta" value={formData.tipoOferta} onChange={handleChange} required>
              <option value=""></option>
              <option value="Venta">Venta</option>
              <option value="Arriendo">Arriendo</option>
            </select>
            <label>Ciudad:</label>
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} required />
            <label>Dirección:</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
            <label>Tipo Propiedad:</label>
            <select name="tipoPropiedad" value={formData.tipoPropiedad} onChange={handleChange} required>
              <option value=""></option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
            </select>
            <label>Tamaño:</label>
            <input type="number" name="tamano" value={formData.tamano} onChange={handleChange} required />
            <label>Precio:</label>
            <input type="number" name="precio" value={formData.precio} onChange={handleChange} required />
            <label>Habitaciones:</label>
            <input type="number" name="habitaciones" value={formData.habitaciones} onChange={handleChange} required />
            <label>Baños:</label>
            <input type="number" name="banos" value={formData.banos} onChange={handleChange} required />
            <label>Estado:</label>
            <select name="estado" value={formData.estado} onChange={handleChange} required>
              <option value=""></option>
              <option value={true}>En Oferta</option>
              <option value={false}>Adquirida</option>
            </select>
            <button type="submit">Agregar Propiedad</button>
          </form>

          {/* Section for deleting a property by ID */}
          <div className="delete-section">
            <h3>Eliminar Propiedad</h3>
            <input
              type="text"
              placeholder="Ingrese ID de la propiedad"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <button onClick={handleDeleteProperty}>Eliminar</button>
          </div>

          {/* Section for updating a property state by ID */}
          <div className="update-section">
            <h3>Actualizar Estado de Propiedad</h3>
            <input
              type="text"
              placeholder="Ingrese ID de la propiedad"
              value={updateId}
              onChange={(e) => setUpdateId(e.target.value)}
            />
            <select
              value={updateEstado}
              onChange={(e) => setUpdateEstado(e.target.value)}
            >
              <option value="">Seleccione Estado</option>
              <option value={true}>En Oferta</option>
              <option value={false}>Adquirida</option>
            </select>
            <button onClick={handleUpdateEstado}>Actualizar Estado</button>
          </div>
        </div>

        {/* Right side for filtering and listing properties */}
        <div className="right-side">
          <h2>Lista de Propiedades</h2>

          {/* Filtering by Tipo Propiedad */}
          <div className="filter-section">
            <h3>Filtrar por Tipo de Propiedad</h3>
            <select value={filterTipoPropiedad} onChange={(e) => setFilterTipoPropiedad(e.target.value)}>
              <option value="">Todos</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
            </select>
            <button onClick={filterByTipoPropiedad}>Filtrar</button>
          </div>

          {/* Filtering by Price Range */}
          <div className="filter-section">
            <h3>Filtrar por Rango de Precio</h3>
            <label>Min Precio:</label>
            <input type="number" value={minPrecio} onChange={(e) => setMinPrecio(e.target.value)} />
            <label>Max Precio:</label>
            <input type="number" value={maxPrecio} onChange={(e) => setMaxPrecio(e.target.value)} />
            <button onClick={filterByPrecio}>Filtrar</button>
          </div>

          {/* Button to clear all filters */}
          <div className="filter-section">
            <button onClick={clearFilters}>Eliminar Filtros</button>
          </div>

          {/* Property List */}
          {properties.length === 0 ? (
            <p>La lista no está disponible</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo Oferta</th>
                  <th>Ciudad</th>
                  <th>Dirección</th>
                  <th>Tipo Propiedad</th>
                  <th>Tamaño</th>
                  <th>Precio</th>
                  <th>Habitaciones</th>
                  <th>Baños</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td>{property.nombre}</td>
                    <td>{property.tipoOferta}</td>
                    <td>{property.ciudad}</td>
                    <td>{property.direccion}</td>
                    <td>{property.tipoPropiedad}</td>
                    <td>{property.tamano}</td>
                    <td>{property.precio}</td>
                    <td>{property.habitaciones}</td>
                    <td>{property.banos}</td>
                    <td>{property.estado ? "En Oferta" : "Adquirida"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
