import { Avatar, IconButton } from '@material-ui/core'
import React, {useState} from 'react'
import './Chat.css'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import MicIcon from '@material-ui/icons/Mic';
import EmojiEmotionsOutlined from '@material-ui/icons/EmojiEmotionsOutlined';
import axios from './axios'
//import SendIcon from '@material-ui/icons/Send';
const Chat = ({messages}) => {
    const [messageInput, setmessageInput] = useState("")
    const [name, setName] = useState("")
    const send_Message=(e)=>
    {
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();
        setName("You")
        console.log("i am working");
        e.preventDefault();
        axios.post('/messages/new',
        {
           message:messageInput,
           name:messages[2].name,
           timestamp:`${date}  ${time}`,
           receiver:true
       });
       setmessageInput('')
       setName("")

    }

    return (
        <div className="chat">
          <div className="chat_header">
          <Avatar/>
              <div className="chat_headerInfo">
                <h3>Room Name</h3>
                <p>last seen at ..... </p>
              </div>
            <div className="chat_headerRight">
            <IconButton>
            <SearchOutlinedIcon/>
            </IconButton>
            <IconButton>
            <AttachFileIcon/>
            </IconButton>
            <IconButton>
            <MoreVertIcon/>
            </IconButton>
            </div>
          </div>

        <div className="chat_body">
        {
            messages.map((message)=>
            {
                console.log(message)
                return <>
                <p className={`chat_message ${message.receiver && "chat_receiver"}`}>
                <span className="chat_name">{message.name}
                </span>
                {message.message}
            <span className="chat_timestamp">{message.timestamp}
            </span>
            </p>
            </>
            })
            
        }
        </div>
        <div className="chat_footer">
            <EmojiEmotionsOutlined/>
            <form>
                <input
                    placeholder="enter text here"
                    type="text"
                    value={messageInput}
                    onChange={(e)=>
                    {
                        setmessageInput(e.target.value)
                    }
                    }
                />
                <button type="submit" onClick={send_Message}>Send a message</button>
            </form>
            <MicIcon/>
        </div>
    
        </div>
    )
}

export default Chat
