import { useEffect } from "react";
import AddTodoModal from "./partials/AddTodoModal";
import Header from "./partials/Header";
import Todo from "./partials/Todo";
import { getTodosApi, getToken } from "../services/api";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const navigate=useNavigate();

  const [list,setList]=useState([]);

  const[refreshList,setRefreshList]=useState();

  useEffect(()=>{
    if(!getToken()){
      navigate('/login')
    }

    fetchTodoList();
  },[refreshList])

  async function fetchTodoList(){
    const result=await getTodosApi()

    console.log('todolist',result.data.todos)
    if(result.status===200){
      setList(result.data.todos.reverse())
    }
  }



  return (

    
    <>
      <Header />
      

      <div className="container">
        <ToastContainer/>
        <div className="row justify-content-md-center mt-4">
         {list.map((todos)=><Todo todo={todos} key={todos._id}/>)}
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
      <AddTodoModal setRefreshList={setRefreshList}/>
    </>
  );
}
