import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import EmpleadoListado from './Empleados/EmpleadoListado';
import EmpleadoRegistro from './Empleados/EmpleadoRegistro';

const Empleado = () => {
  const { register, handleSubmit } = useForm();
  const [empleados, setEmpleados] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modo, setModo] = useState('nuevo'); // 'nuevo', 'editar', 'eliminar'
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  const buscarEmpleados = async (data) => {
    try {
      const response = await axios.get('http://localhost:4000/api/empleados', {
        params: {
          ApellidoYNombre: data.ApellidoYNombre
        }
      });
      setEmpleados(response.data.Items);
    } catch (error) {
      console.error('Error al buscar empleados:', error);
    }
  };

  const handleNuevo = () => {
    setModo('nuevo');
    setEmpleadoSeleccionado(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (empleado) => {
    setModo('editar');
    setEmpleadoSeleccionado(empleado);
    setMostrarFormulario(true);
  };

  const handleEliminar = (empleado) => {
    setModo('eliminar');
    setEmpleadoSeleccionado(empleado);
    setMostrarFormulario(true);
  };

  const handleRegistroSubmit = async (datos) => {
    try {
      if (modo === 'nuevo') {
        await axios.post('http://localhost:4000/api/empleados', datos);
      } else if (modo === 'editar') {
        await axios.put(`http://localhost:4000/api/empleados/${datos.IdEmpleado}`, datos);
      } else if (modo === 'eliminar') {
        await axios.delete(`http://localhost:4000/api/empleados/${datos.IdEmpleado}`);
      }

      setMostrarFormulario(false);
      buscarEmpleados({ ApellidoYNombre: '' });
    } catch (error) {
      console.error(`Error al ${modo} empleado:`, error);
    }
  };

  return (
    <div className="container">
      <h2>Buscar Empleados</h2>

      <form onSubmit={handleSubmit(buscarEmpleados)} className="mb-3">
        <input
          type="text"
          placeholder="Apellido y Nombre"
          {...register('ApellidoYNombre')}
          className="form-control d-inline w-50 me-2"
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
        <button type="button" className="btn btn-success ms-2" onClick={handleNuevo}>
          Nuevo Empleado
        </button>
      </form>

      {!mostrarFormulario && (
        <EmpleadoListado
          empleados={empleados}
          onEditar={handleEditar}
          onEliminar={handleEliminar}
        />
      )}

      {mostrarFormulario && (
        <EmpleadoRegistro
          modo={modo}
          empleadoSeleccionado={empleadoSeleccionado}
          onSubmitCallback={handleRegistroSubmit}
          onCancel={() => setMostrarFormulario(false)}
        />
      )}
    </div>
  );
};

export default Empleado;
