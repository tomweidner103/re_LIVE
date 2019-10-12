import React from 'react'
import ChatForm from './ChatForm'
import Users from './Users'
import {Switch, Route} from 'react-router-dom'

class Routes extends React.Component {
    render(){
        return (
            <Switch>
                <Route exact path="/" component={ChatForm} />
                <Route exact path='/users' component={Users} />
            </Switch>
        )
    }
}

export default Routes