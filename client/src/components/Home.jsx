import AddTodoModal from "./partials/AddTodoModal";
import Header from "./partials/Header";
import Todo from "./partials/Todo";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
          <Todo />
        </div>
      </div>

      <div
        className=""
        style={{ position: "fixed", right: 20, bottom: 20, zIndex: 1030 }}
      >
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>
      <AddTodoModal/>
    </>
  );
}
