import { useEffect, useState } from "react";
//Modal
import ModalTasks from "../components/ModalTasks";
//Objetos
import { categoryColors } from "../objects/colors";
//SweetAlert2
import Swal from 'sweetalert2';

const Tasks = () => {

    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState("pendientes");
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSaveTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setShowModal(false);
    };

    const handleCompleteTask = (taskId) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres finalizar esta tarea?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, finalizar',
        confirmButtonColor: "#0d6efd",
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, completed: true } : task
          );
          setTasks(updatedTasks);
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));

          Swal.fire({
            title:'¡Tarea terminada!',
            text: 'La tarea fue marcada como finalizada, visualízala en "Tareas Finalizadas".',
            icon: 'success',
            confirmButtonColor: "#0d6efd"
          });
        }

      });
    };

    //Tipo de tareas y filtrado por categorías
    const filteredTasks = tasks.filter(task => {
      const matchesTab = activeTab === "pendientes" ? !task.completed : task.completed;
      const matchesCategory = selectedCategory ? task.category === selectedCategory : true;
      return matchesTab && matchesCategory;
    });

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    const handleCloseModal = () => {
    setShowModal(false);
    };

  return (
    <>
      <div className="container-fluid p-4">
        {/* Título y agregar tarea (1er Container) */}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Mis tareas</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Agregar tarea</button>
          </div>
        </div>

        {/* Barra lateral y tareas (2do Container) */}
        <div className="container">
          <div className="row">

            {/* Barra lateral */}
            <div className="col-md-2 bg-light p-3">
              <h5 className="mb-4">Categorías</h5>
              <ul className="list-unstyled category-list">
              <li className={`category-item ${selectedCategory === null ? "active-category" : ""}`} onClick={() => setSelectedCategory(null)} >
                <span>Todas</span>
              </li>
              <li className={`category-item ${selectedCategory === "Categoría 1" ? "active-category" : ""}`} onClick={() => setSelectedCategory("Categoría 1")} >
                <span className="dot red"></span> Categoría 1
              </li>
              <li className={`category-item ${selectedCategory === "Categoría 2" ? "active-category" : ""}`} onClick={() => setSelectedCategory("Categoría 2")} >
                <span className="dot blue"></span> Categoría 2
              </li>
              <li className={`category-item ${selectedCategory === "Categoría 3" ? "active-category" : ""}`} onClick={() => setSelectedCategory("Categoría 3")}>
                <span className="dot purple"></span> Categoría 3
              </li>
              <li className={`category-item ${selectedCategory === "Categoría 4" ? "active-category" : ""}`} onClick={() => setSelectedCategory("Categoría 4")}>
                <span className="dot green"></span> Categoría 4
              </li>
              <li className={`category-item ${selectedCategory === "Categoría 5" ? "active-category" : ""}`} onClick={() => setSelectedCategory("Categoría 5")}>
                <span className="dot orange"></span> Categoría 5
              </li>
            </ul>
          </div>

            {/* Contenido principal */}
            <div className="col-md-10">
              {/* Pestañas */}
              <div className="container general-text">
                <div className="btn-group mb-4" role="group">
                    <button type="button" className={`btn btn-outline-secondary ${activeTab === "pendientes" ? "active" : ""}`} onClick={() => setActiveTab("pendientes")}>Tareas Pendientes</button>
                    <button type="button" className={`btn btn-outline-secondary ${activeTab === "finalizadas" ? "active" : ""}`} onClick={() => setActiveTab("finalizadas")}>Tareas Finalizadas</button>
                </div>
              </div>

              {/* Card */}
              <div className="row">

                {filteredTasks.length === 0 ? (
                  <p className="general-text">
                    {activeTab === "pendientes" ? "No tienes tareas pendientes" : "No tienes tareas finalizadas"}
                  </p>
                ) : (
                  filteredTasks.map((task) => (
                    <div className="col-md-6" key={task.id}>
                      <div className="task-card" style={{ borderColor: categoryColors[task.category] }}>
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                        <div className="task-footer">
                          <span className={`dot ${categoryColors[task.category]}`}></span>
                          {!task.completed && (
                            <button className="btn btn-success btn-sm" onClick={() => handleCompleteTask(task.id)}>Finalizar tarea</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <ModalTasks onSave={handleSaveTask} onClose={handleCloseModal} />}
    </>
  );
};

export default Tasks;