var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,

    App = require('./app.js'),
    Login = require('./login.js'),
    Course = require('./course.js'),
    Forums = require('./forums.js'),
    Lectures = require('./lectures.js'),
    Lecture = require('./lecture.js'),
    ExpandedTopic = require('./topicExpanded.js'),
    newForum = require('./newForum.js'),
    Resources = require('./resources.js'),
    Offline = require('./offline.js')

var routes = (
    <Route>

        <Route name="login" path="/" handler={Login}></Route>
        <Route name="offline" path="/offline" handler={Offline}></Route>

        <Route handler={App}>
            <Route name="home" path="course" handler={Course}>
                <Route name="forums" path="forums" handler={Forums}></Route>
                <Route name="lectures" path="lectures" handler={Lectures}></Route>
                <Route name="resources" path="resources" handler={Resources}></Route>
            </Route>

            <Route name="lecture" path="course/lectures/:lectureId" handler={Lecture}></Route>
            <Route name="lectureTopic" path="course/lectures/:lectureId/topics/:topicId" handler={ExpandedTopic}></Route>
            <Route name="newTopicForum" path="course/lectures/:lectureId/newForum" handler={newForum}></Route>

            <Route name="newForum" path="course/forums/newForum" handler={newForum}></Route>
            <Route name="generalTopic" path="course/forums/topics/:topicId" handler={ExpandedTopic}></Route>
            <Route name="newGeneralForum" path="course/forums/newForum" handler={newForum}></Route>

        </Route>
    </Route>
)

Router.run(routes, Router.HashLocation, function(Root){
    React.render(
        <Root />,
        document.body
    )
})
