import React from 'react'
import {Link} from 'react-router-dom'

const Nav = (props) => {
    return (
    <div>
        <Link to="/">Chat</Link>
        <Link to="/users">Users</Link>
    </div>
    )
}

export default Nav