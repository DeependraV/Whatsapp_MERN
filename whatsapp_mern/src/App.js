import React, {useState, useEffect } from 'react';
import Sidebar from './Sidebar'
import Chat from './Chat'
import './App.css'
import Pusher from 'pusher-js'
import axios from './axios'
const App = () => {
  const [messages, setMessage] = useState([])
  useEffect(() => {
    axios.get('./messages/sync')
    .then(response=>
      {
        setMessage(response.data);
      })
  }, [])
useEffect(() => {
 
    const pusher = new Pusher('13856bd5d777b6e1b980', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessage([...messages,newMessage])
    });
  return  ()=>
    {
      channel.unbind_all();
      channel.unsubscribe();
    }

}, [messages])

console.log(messages);

  return (
    <div className="app">
    <div className="app_body">
      <Sidebar/>
      <Chat messages={messages}/>
    </div>
    </div>
  )
}
export default App
