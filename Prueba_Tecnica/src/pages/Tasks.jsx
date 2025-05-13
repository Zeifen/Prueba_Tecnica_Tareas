import ModalTasks from "../components/ModalTasks";
import { useEffect, useState } from "react";
import { categoryColors } from "../objects/colors";

const Tasks = () => {

    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    const handleSaveTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setShowModal(false);
    };

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
        {/* Title and Add task (1st Container)*/}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Mis tareas</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>Agregar tarea</button>
          </div>
        </div>

        {/* Sidebar and Tasks (2nd Container)*/}
        <div className="container">
          <div className="row">

            {/* Sidebar */}
            <div className="col-md-2 bg-light p-3">
              <h5 className="mb-4">Categorías</h5>
                <ul className="list-unstyled category-list">
                    <li><span className="dot red"></span> Categoría 1</li>
                    <li><span className="dot blue"></span> Categoría 2</li>
                    <li><span className="dot purple"></span> Categoría 3</li>
                    <li><span className="dot green"></span> Categoría 4</li>
                    <li><span className="dot orange"></span> Categoría 5</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="col-md-10">
              {/* Tabs */}
              <div className="container general-text">
                <div className="btn-group mb-4" role="group">
                    <button type="button" className="btn tab-active">Tareas Pendientes</button>
                    <button type="button" className="btn">Tareas Finalizadas</button>
                </div>
              </div>

              {/* Task Cards */}
              <div className="row">

                  {tasks.length === 0 ? (<p className="general-text">No tienes tareas</p>) : (tasks.map((task) => (
                    <div className="col-md-6" key={task.id}>
                    <div className="task-card" style={{ borderColor: categoryColors[task.category] }}>
                        <h5>{task.title}</h5>
                        <p>{task.description}</p>
                        <div className="task-footer">
                        <span className={`dot ${categoryColors[task.category]}`}></span>
                        <button className="btn btn-success btn-sm">Finalizar tarea</button>
                        </div>
                    </div>
                    </div>
                )))}

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