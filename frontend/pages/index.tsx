import { useState, useEffect } from "react";
import axios from "axios";

type todo = {
  id: BigInt,
  name: String,
  description: String,

};

export default function Home() {
  const [todoList, settodoList] = useState<Array<todo>>();
  const [datachange, setDatachange] = useState<boolean>(false);
  useEffect(() => {
    axios.get('/todo/todo').then((res) => settodoList(res.data)).catch((errors) => console.log(errors))
  }, [])
  useEffect(() => {
  }, [datachange])
  const send_data = (event: any) => {
    // https://stackoverflow.com/questions/61522494/react-axios-error-request-aborted-for-delete-request-in-firefox-but-not-in-chro
    // This app is intended to be barebones. If you dislike this hackish approach simply delete it and do it your way.
    event.preventDefault()
    const name = event.target.name.value;
    const description = event.target.description.value;
    const final_data = { name, description }
    axios.post('/todo/todo_create', final_data).catch((error) => console.log(error))
    const n_todo: todo = { id: BigInt(0), name: name, description: description }
    const new_array = todoList
    new_array?.push(n_todo)
    settodoList(new_array)
    setDatachange(!datachange)
  }
  return (
    <>
    <h1>Todo page</h1>
      {todoList?.map((object, i) => <div key={i}>{object.name} : {object.description}</div>)}
      <div>
        <form onSubmit={send_data}>
          <label>Name:</label>
          <input type="text" name="name" id="name" />
          <label>Description:</label>
          <input type="text" name="description" id="description" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}
