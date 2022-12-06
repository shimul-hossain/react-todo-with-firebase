import './App.css';
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import { useEffect, useState } from 'react';

function App() {
  let db = getDatabase();
  let [data, setData]= useState('');
  let [todo, setTodo]= useState([]);
  let [editStatus, setEditStatus]= useState(false);
  let [editId, setEditId]= useState('');
  let [error, setError]= useState('');

  const handleInput = (e) => {
    setData(e.target.value);
    e.target.value ? setError(''):setError('Please Enter Some Text');
  }
  const handleSubmit = () => { 
    if(data.trim() == ''){
      setError('Please Enter Some Text')
    }else{
      if(editStatus){
        update(ref(db, 'todo-list/'+editId), {
          name: data
        })
        .then(response => {  
          setEditId('');
          setData('');
          setEditStatus(false);
        })
      }else{
        set(push(ref(db, 'todo-list')), {
          name : data,
        }).then(response => {
          setData('')
        })
      }
    }
  }

  const handleDelete = (id) => {
    remove(ref(db, 'todo-list/'+id))
    .then(response => {  
    })
  }

  const handleEdit = (id, name) => {
    setData(name);
    setEditId(id);
    setEditStatus(true);
  }

  useEffect(() => {
    const todoRef = ref(db, 'todo-list');
    onValue(todoRef, (snapshot) => {
      let arr = []; 
       snapshot.forEach(item => {
        arr.push({...item.val(), id: item.key});
       })
       setTodo(arr)
    });
  }, [])


  return (
    <>
       <div className="row justify-content-center">
        <div className="col-8">
        {error && 
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        }
        <div className="input-group mb-3">
          <input type="text" className="form-control shadow-none" placeholder="Enter Text" value={data} onChange={handleInput}/>
          <button className="btn btn-outline-secondary" type="button" onClick={handleSubmit}> {editStatus ? 'Update':'Add' }</button>
        </div>
        </div>
        <div className="col-8 mt-5">
        <table className="table w-100">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Data</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((item, index)=> (
                <tr key={item.id}>
                  <th scope="row">{index+1}</th>
                  <td>{item.name}</td>
                  <td><button type="button" className="btn btn-primary me-2" onClick={() => handleEdit(item.id, item.name)}>Edit</button><button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button></td>
                </tr>
            ))}
          </tbody>
        </table>
        </div>
       </div>
    </>
  );
}

export default App;
