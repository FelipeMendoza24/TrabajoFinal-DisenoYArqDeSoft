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

  return (
    <div>
      {/* AppBar */}
      <div className="app-bar">
        Inmobiliaria MENAV
      </div>

      {/* Main content */}
      <div className="app-container">
        {/* lado izquierdo anadir propiedad */}
        <div className="left-side">
          <h2>Añadir Nueva Propiedad</h2>
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
        </div>

        {/* Lado derecho lista */}
        <div className="right-side">
          <h2>Lista de Propiedades</h2>
          {properties.length === 0 ? (
            <p>La lista no esta disponible</p>
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

