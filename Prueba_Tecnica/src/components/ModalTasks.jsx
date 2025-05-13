import { useState } from "react";
//SweetAlert2
import Swal from 'sweetalert2';

const ModalTasks = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Categoría 1");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (title.trim() === "" || description.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Campos vacíos",
      text: "Por favor llena todos los campos antes de guardar.",
      confirmButtonColor: "#0d6efd"
    });
    return;
  }
    const newTask = {
      id: Date.now(),
      title,
      category,
      description,
      completed: false
    };
    onSave(newTask);
    Swal.fire({
      icon: "success",
      title: "¡Tarea creada!",
      text: "La tarea fue guardada exitosamente.",
      timer: 1500,
      showConfirmButton: false
  });
    setTitle("");
    setCategory("Categoría 1");
    setDescription("");
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content p-4">
        <h3 className="text-center mb-4">Agregar tarea</h3>

        <div className="mb-3">
          <label className="form-label">Nombre de tarea</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>

        <div className="mb-3">
          <label className="form-label">Selecciona categoría</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Categoría 1</option>
            <option>Categoría 2</option>
            <option>Categoría 3</option>
            <option>Categoría 4</option>
            <option>Categoría 5</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" rows="4" value={description} onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalTasks;
