import ConstContext from "./Context";

const Provider = ({ children }) => {
  const contextAddTask = "Agregar tarea";
  const contextTasks = "Mis tareas";
  const contextAllCat = 'Todas las categorías';
  const contextCategories = "Categorías";
  const contextFirstCat = "Categoría 1";
  const contextSecondCat = "Categoría 2";
  const contextThirdCat = "Categoría 3";
  const contextFourthCat = "Categoría 4";
  const contextFifthCat = "Categoría 5";
  const contextFinishedTasks = 'Tareas Pendientes';
  const contextPendingTasks = 'Tareas Finalizadas';
  const contextFinishTask = 'Finalizar tarea';
  const contextPending = 'pendientes';
  const contextFinished = 'finalizadas';

  return (
    <>
      <ConstContext.Provider
        value={{
          contextAddTask,
          contextTasks,
          contextCategories,
          contextAllCat,
          contextFirstCat,
          contextSecondCat,
          contextThirdCat,
          contextFourthCat,
          contextFifthCat,
          contextFinishedTasks,
          contextPendingTasks,
          contextFinishTask,
          contextPending,
          contextFinished
        }}
      >
        {children}
      </ConstContext.Provider>
    </>
  );
};

export default Provider;
