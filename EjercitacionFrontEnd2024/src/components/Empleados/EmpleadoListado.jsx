import React from 'react';

const EmpleadoListado = ({ empleados, onEditar, onEliminar }) => {
  if (!empleados || empleados.length === 0) {
    return <p>No se encontraron empleados.</p>;
  }

  return (
    <div className="mt-4">
      <h3>Listado de empleados</h3>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Apellido y Nombre</th>
            <th>DNI</th>
            <th>Fecha de Nacimiento</th>
            <th>Suspendido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.IdEmpleado}>
              <td>{emp.IdEmpleado}</td>
              <td>{emp.ApellidoYNombre}</td>
              <td>{emp.Dni}</td>
              <td>{new Date(emp.FechaNacimiento).toLocaleDateString()}</td>
              <td>{emp.Suspendido ? 'Sí' : 'No'}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => onEditar(emp)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onEliminar(emp)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpleadoListado;
