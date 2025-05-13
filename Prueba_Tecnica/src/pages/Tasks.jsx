const Tasks = () => {
  return (
    <>
      <div className="container-fluid p-4">
        {/* Title and Add task (1st Container)*/}
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Mis tareas</h2>
            <button className="btn btn-primary">Agregar tarea</button>
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
                <div className="col-md-6">
                  <div className="task-card red-card">
                    <h5>Tarea 1</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam purus sapien...</p>
                    <div className="task-footer">
                      <span className="dot red"></span>
                      <button className="btn btn-success btn-sm">Finalizar tarea</button>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="task-card blue-card">
                    <h5>Tarea 1</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam purus sapien...</p>
                    <div className="task-footer">
                      <span className="dot blue"></span>
                      <button className="btn btn-success btn-sm">Finalizar tarea</button>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="task-card purple-card">
                    <h5>Tarea 1</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam purus sapien...</p>
                    <div className="task-footer">
                      <span className="dot purple"></span>
                      <button className="btn btn-success btn-sm">Finalizar tarea</button>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="task-card orange-card">
                    <h5>Tarea 1</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam purus sapien...</p>
                    <div className="task-footer">
                      <span className="dot orange"></span>
                      <button className="btn btn-success btn-sm">Finalizar tarea</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
