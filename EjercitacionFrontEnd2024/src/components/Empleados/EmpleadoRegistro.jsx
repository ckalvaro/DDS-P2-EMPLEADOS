import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const EmpleadoRegistro = ({ modo, empleadoSeleccionado, onSubmitCallback, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (empleadoSeleccionado) {
      setValue('ApellidoYNombre', empleadoSeleccionado.ApellidoYNombre);
      setValue('Dni', empleadoSeleccionado.Dni);
      setValue('FechaNacimiento', empleadoSeleccionado.FechaNacimiento.slice(0, 10)); // YYYY-MM-DD
      setValue('Suspendido', empleadoSeleccionado.Suspendido);
    } else {
      reset();
    }
  }, [empleadoSeleccionado, setValue, reset]);

  const onSubmit = (data) => {
    const datosFinales = {
      ...data,
      Dni: parseInt(data.Dni),
      Suspendido: data.Suspendido === 'true' || data.Suspendido === true
    };
    if (empleadoSeleccionado?.IdEmpleado)
      datosFinales.IdEmpleado = empleadoSeleccionado.IdEmpleado;

    onSubmitCallback(datosFinales);
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        {modo === 'nuevo' && 'Registrar nuevo empleado'}
        {modo === 'editar' && 'Editar empleado'}
        {modo === 'eliminar' && 'Eliminar empleado'}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label>Apellido y Nombre</label>
            <input
              type="text"
              className="form-control"
              {...register('ApellidoYNombre', { required: true })}
              disabled={modo === 'eliminar'}
            />
            {errors.ApellidoYNombre && <small className="text-danger">Este campo es obligatorio</small>}
          </div>

          <div className="mb-3">
            <label>DNI</label>
            <input
              type="number"
              className="form-control"
              {...register('Dni', { required: true, min: 1000000 })}
              disabled={modo === 'eliminar'}
            />
            {errors.Dni && <small className="text-danger">DNI inválido</small>}
          </div>

          <div className="mb-3">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              className="form-control"
              {...register('FechaNacimiento', { required: true })}
              disabled={modo === 'eliminar'}
            />
            {errors.FechaNacimiento && <small className="text-danger">Fecha requerida</small>}
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              {...register('Suspendido')}
              disabled={modo === 'eliminar'}
            />
            <label className="form-check-label">Suspendido</label>
          </div>

          <button type="submit" className="btn btn-success me-2">
            {modo === 'nuevo' && 'Registrar'}
            {modo === 'editar' && 'Guardar cambios'}
            {modo === 'eliminar' && 'Confirmar eliminación'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmpleadoRegistro;
