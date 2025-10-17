import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function App() {
  const [task, settask] = useState("")
  const [todos, settodos] = useState([])
  const [completedtodos, setcompletedtodos] = useState([])

  // Load from localStorage when app mounts
  useEffect(() => {
    let savedTodos = JSON.parse(localStorage.getItem('todos')) || []
    let savedCompleted = JSON.parse(localStorage.getItem('completedtodos')) || []
    settodos(savedTodos)
    setcompletedtodos(savedCompleted)
  }, [])

  const todosInitialMount = useRef(true)
  const completedInitialMount = useRef(true)

  // Save todos to localStorage whenever they change (skip initial mount)
  useEffect(() => {
    if (todosInitialMount.current) {
      todosInitialMount.current = false
      return
    }
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // Save completedtodos to localStorage whenever they change (skip initial mount)
  useEffect(() => {
    if (completedInitialMount.current) {
      completedInitialMount.current = false
      return
    }
    localStorage.setItem('completedtodos', JSON.stringify(completedtodos))
  }, [completedtodos])

  function addtodos(para) {
    settodos([...todos, { id: uuidv4(), text: para }])
  }

  function edittodo(id) {
    const todoToEdit = todos.find((item) => item.id === id)
    if (!todoToEdit) return;
    settask(todoToEdit.text)
    settodos(todos.filter((item) => item.id !== id))
  }

  function deletetodo(id) {
    settodos(todos.filter((item) => item.id !== id))
  }

  function finishtodos(id) {
    const todoToFinish = todos.find((item) => item.id === id)
    if (!todoToFinish) return;
    settodos(todos.filter((item) => item.id !== id))
    setcompletedtodos([...completedtodos, todoToFinish])
  }

  return (
    <>
      <Navbar />
      <div className='h-[88.8vh] bg-[#242424] m-1.5 rounded-2xl'>
        <h1 className='text-center text-3xl font-bold pt-10 text-white'>Welcome to To Do Manager</h1>
        <h2 className='text-center text-lg font-semibold pt-5 text-white'>Your one stop solution to manage your tasks efficiently and effectively.</h2>
        <h2 className='text-center text-lg font-semibold text-white'>Get started by adding your tasks and stay organized!</h2>
        <div className='flex justify-center gap-3 pt-10'>
          <input className='w-150 bg-[#626060ed] text-white rounded-full p-1.5 px-3' type="text" placeholder='Enter your todo'
            value={task}
            onChange={(e) => settask(e.target.value)}
          />
          <button className='bg-[#4375b1d6] rounded-full px-4 cursor-pointer text-sm hover:scale-105'
            onClick={() => {
              if (task.trim() === "") return; // Prevent empty tasks
              addtodos(task)
              settask("")
            }}
          >Add Task</button>
        </div>
        <div className="flex w-[96%] justify-around mx-10">
          <div>
            <div className='text-white text-center pt-10 font-bold text-2xl'>
              <h3 className='w-[627px]'>Your todos</h3>
            </div>
            <div className=' h-135 mt-5 rounded-2xl overflow-y-auto scrollbar-hide'>
              {todos.map((item, index) => (
                <div key={item.id} className=' rounded-2xl flex justify-between items-center my-3'>
                  <div className='flex items-center justify-center gap-3'>
                    <input type="checkbox" onChange={() => finishtodos(item.id)} />
                    <div className='text-white text-lg text-wrap w-110'>
                      {index + 1}. {item.text}
                    </div>
                  </div>
                  <div>
                    <button onClick={() => edittodo(item.id)} className='w-18 bg-[#4375b1d6] rounded-lg px-4 py-0.5 cursor-pointer text-sm mx-2'>Edit</button>
                    <button onClick={() => deletetodo(item.id)} className='w-18 bg-[#4375b1d6] rounded-lg px-4 py-0.5 cursor-pointer text-sm'>Delete</button>
                  </div>
                </div>
              ))
              }
            </div>
          </div>
          <div>
            <div className='text-white text-center pt-10 font-bold text-2xl'>
              <h3 className='w-[470px]'>Finished todos</h3>
            </div>
            <div className=' h-135 mt-5 rounded-2xl overflow-y-auto scrollbar-hide'>
              {completedtodos.map((item, index) => (
                <div key={item.id} className=' rounded-2xl flex justify-between items-center my-3'>
                  <div className='flex items-center justify-center gap-3'>
                    <div className='text-white text-lg text-wrap w-110'>
                      {index + 1}. {item.text}
                    </div>
                  </div>
                  <div><img width="30px" src="/check.png" alt="check img" /></div>
                </div>
              ))
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
