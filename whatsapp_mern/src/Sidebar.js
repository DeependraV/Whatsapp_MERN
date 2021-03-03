import React from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar,IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
const Sidebar = () => {
    return (
    <div className="sidebar">
            <div className="sidebar_header">
            <Avatar src="https://www.google.com/search?q=avatar+icon+image&sxsrf=ALeKk00Aikxdw1U27eGrFtmauSee2rwjXQ:1614662425838&tbm=isch&source=iu&ictx=1&fir=GhyWgR-Ep3o1YM%252Cy-Gc6kT7EeIDEM%252C_&vet=1&usg=AI4_-kRMdr--E7U-sRLLbOHGgHmFyEunQA&sa=X&ved=2ahUKEwie2cui7pDvAhVhmuYKHTn-AqMQ9QF6BAgNEAE#imgrc=GhyWgR-Ep3o1YM"/>
            <div className="sidbar_headerRight">
            <IconButton>
            <DonutLargeIcon/>
            </IconButton>
            <IconButton>
            <ChatIcon/>
            </IconButton>
            <IconButton>
            <MoreVertIcon/>
            </IconButton>
            </div>
            </div>
        <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon/>
          <input placeholder="Search or start new Chat" type="text"/>
        </div>

        </div>
        <div className="sidebar_chats">
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
            <SidebarChat/>
        </div>
    </div>
    )
}

export default Sidebar
