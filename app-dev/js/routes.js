var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect,

    App = require('./app.js'),
    Login = require('./login.js'),
    Course = require('./course.js'),
    Lecture = require('./lecture.js')

var routes = (

    <Route handler={App}>

        <Route path="/course" handler={Course} />
        <Route path="/login" handler={Login}/>

        <Redirect from="/" to="/login" />
    </Route>
)

Router.run(routes, Router.HashLocation, function(Root){
    React.render(
        <Root />,
        document.body
    )
})