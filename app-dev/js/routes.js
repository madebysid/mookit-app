var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect,

    App = require('./app.js'),
    Courses = require('./courses.js'),
    Login = require('./login.js'),
    Course = require('./course.js'),
    Dash = require('./dash.js'),
    Lecture = require('./lecture.js'),
    Tutorial = require('./tutorial.js')

var routes = (

    <Route handler={App}>
        <Route path="/tutorial" handler={Tutorial}></Route>

        <Route path="/courses" handler={Courses}></Route>
        <Route path="/course" handler={Course} />
        <Route path="/login" handler={Login}/>
        <Route path="/dash" handler={Dash}/>

        <Redirect from="/" to="/courses" />
    </Route>
)

Router.run(routes, Router.HashLocation, function(Root){
    React.render(
        <Root />,
        document.body
    )
})