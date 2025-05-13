import { useEffect, useState, useContext } from "react";
//Modal
import ModalTasks from "../components/ModalTasks";
//Objetos
import { categoryColors } from "../objects/colors";
//SweetAlert2
import Swal from 'sweetalert2';
//Context
import ConstContext from "../context/Context";

const Tasks = () => {

    const { 
      contextAddTask, 
      contextTasks, 
      contextCategories,
      contextFirstCat,
      contextSecondCat,
      contextThirdCat,
      contextFourthCat,
      contextFifthCat,
      contextAllCat,
      contextFinishedTasks,
      contextPendingTasks,
      contextFinishTask,
      contextPending,
      contextFinished

    } = useContext(ConstContext);

    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeTab, setActiveTab] = useState(contextPending);
    const [selectedCategory, setSelectedCategory] = useState(null);

    //Agregar tarea
    const handleSaveTask = (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setShowModal(false);
    };

    //Finalizar tarea
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
      const matchesTab = activeTab === contextPending ? !task.completed : task.completed;
      const matchesCategory = selectedCategory ? task.category === selectedCategory : true;
      return matchesTab && matchesCategory;
    });

    //Cargar tareas en render del componente
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
            <h2>{contextTasks}</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>{contextAddTask}</button>
          </div>
        </div>

        {/* Barra lateral y tareas (2do Container) */}
        <div className="container">
          <div className="row">

            {/* Barra lateral */}
            <div className="col-md-2 bg-light p-3">
              <h5 className="mb-4">{contextCategories}</h5>
              <ul className="list-unstyled category-list">
              <li className={`category-item ${selectedCategory === null ? "active-category" : ""}`} onClick={() => setSelectedCategory(null)} >
                <span>{contextAllCat}</span>
              </li>
              <li className={`category-item ${selectedCategory === contextFirstCat ? "active-category" : ""}`} onClick={() => setSelectedCategory(contextFirstCat)} >
                <span className="dot red"></span> {contextFirstCat}
              </li>
              <li className={`category-item ${selectedCategory === contextSecondCat ? "active-category" : ""}`} onClick={() => setSelectedCategory(contextSecondCat)} >
                <span className="dot blue"></span> {contextSecondCat}
              </li>
              <li className={`category-item ${selectedCategory === contextThirdCat ? "active-category" : ""}`} onClick={() => setSelectedCategory(contextThirdCat)}>
                <span className="dot purple"></span> {contextThirdCat}
              </li>
              <li className={`category-item ${selectedCategory === contextFourthCat ? "active-category" : ""}`} onClick={() => setSelectedCategory(contextFourthCat)}>
                <span className="dot green"></span> {contextFourthCat}
              </li>
              <li className={`category-item ${selectedCategory === contextFifthCat ? "active-category" : ""}`} onClick={() => setSelectedCategory(contextFifthCat)}>
                <span className="dot orange"></span> {contextFifthCat}
              </li>
            </ul>
          </div>

            {/* Contenido principal */}
            <div className="col-md-10">
              {/* Pestañas */}
              <div className="container general-text">
                <div className="btn-group mb-4" role="group">
                    <button type="button" className={`btn btn-outline-secondary ${activeTab === contextPending ? "active" : ""}`} onClick={() => setActiveTab(contextPending)}>{contextFinishedTasks}</button>
                    <button type="button" className={`btn btn-outline-secondary ${activeTab === contextFinished ? "active" : ""}`} onClick={() => setActiveTab(contextFinished)}>{contextPendingTasks}</button>
                </div>
              </div>

              {/* Card */}
              <div className="row">

                {filteredTasks.length === 0 ? (
                  <p className="general-text">
                    {activeTab === contextPending ? "No tienes tareas pendientes" : "No tienes tareas finalizadas"}
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
                            <button className="btn btn-success btn-sm" onClick={() => handleCompleteTask(task.id)}>{contextFinishTask}</button>
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