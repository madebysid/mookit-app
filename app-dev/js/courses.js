var React = require('react/addons'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),

    AppBar = mui.AppBar,
    IconMenu = mui.IconMenu,
    MenuItem = mui.MenuItem,
    IconButton = mui.IconButton,
    Card = mui.Card,
    CardMedia = mui.CardMedia,
    CardTitle = mui.CardTitle,
    CardText = mui.CardText

var courses = [
    {
        title: "Staging Course",
        login: "http://staging.mookit.co",
        main: "http://node.mookit.co"
    },
    {
        title: "MOOC on MOOCs",
        login: "http://mooconmooc.org",
        main: "http://node.mooconmooc.org"
    },
    {
        title: "Mobiles for Development",
        login: "http://m4d-mooc.org",
        main: "http://node.m4d-mooc.org"
    },
    {
        title: "ICT Basics",
        login: "http://mooconmooc.org",
        main: "http://node.mooconmooc.org"
    },
    {
        title: "Local Server",
        login: "http://202.3.77.96:3000",
        main: "http://node.staging.mookit.co"
    }
]

module.exports = React.createClass({
    mixins:[material, Router.Navigation],

    componentWillMount: function(){
        var self = this;
        localStorage.setItem('courseTitle', courses[0].title)
        localStorage.setItem('mainUrl', courses[0].main)
        localStorage.setItem('loginUrl', courses[0].login)
        setTimeout(function(){
            self.transitionTo("/login")
        }, 2000)
    },

    render: function(){
        return (
            <div>

            </div>
        )
    }
})