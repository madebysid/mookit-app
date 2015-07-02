var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    Redirect = Router.Redirect,

    App = require('./App.js'),
    Dash = require('./Dash.js'),
    Login = require('./Login.js'),
    Available = require('./Available.js'),
    Subscribed = require('./Subscribed.js'),
    Favourites = require('./Favourites.js'),
    Downloads = require('./Downloads.js'),

    Course = require('./Course.js')

module.exports = (
    <Route name="app" path="/" handler={App}>
        <Route path="/login" name="login" handler={Login} />
        <Route path="/dash" name="dash" handler={Dash} />

        <Route path="/available" name="available" handler={Course} /> /*TODO: Change this later*/
        <Route path="/subscribed" name="subscribed" handler={Subscribed} />
        <Route path="/favourites" name="favourites" handler={Favourites} />
        <Route path="/downloads" name="downloads" handler={Downloads} />

        <Route path="/course/:courseId" name="course" handler={Course} />

        <Redirect from="/" to="/login" />
    </Route>
)