var React = require('react/addons'),
    material = require('./material.js'),
    mui = require('material-ui'),
    Router = require('react-router'),

    AppBar = mui.AppBar,
    IconMenu = mui.IconMenu,
    MenuItem = require('material-ui/lib/menus/menu-item'),
    IconButton = mui.IconButton,
    Card = mui.Card,
    CardMedia = mui.CardMedia,
    CardTitle = mui.CardTitle,
    CardText = mui.CardText

var courses = [
    {
        title: "Staging Course",
        loginMain: "http://staging.mookit.co",
        main: "http://node.mookit.co"
    },
    {
        title: "MOOC on MOOCs",
        loginMain: "http://mooconmooc.org",
        main: "http://node.mooconmooc.org"
    },
    {
        title: "Mobiles for Development",
        loginMain: "http://m4d-mooc.org",
        main: "http://node.m4d-mooc.org"
    },
    {
        title: "ICT Basics",
        loginMain: "http://mooconmooc.org",
        main: "http://node.mooconmooc.org"
    },
    {
        title: "Local Server",
        loginMain: "http://202.3.77.96:3000",
        main: "http://node.staging.mookit.co"
    }
]

module.exports = React.createClass({
    mixins:[material, Router.Navigation],

    goToCourse: function(index){
        localStorage.setItem('courseTitle', courses[index].title)
        localStorage.setItem('mainUrl', courses[index].main)
        localStorage.setItem('loginUrl', courses[index].loginMain)
        this.transitionTo("/login")
    },

    render: function(){
        var self = this,
            TitleStyle = {
                backgroundColor: '#378E43',
                color: 'white',
                height: '10vh',
                paddingLeft: '20vw',
                fontSize: '1.5em'
            }
        return (
            <div>
               <AppBar style={{backgroundColor: '#378E43'}} zDepth={0} iconElementRight={
                   <IconMenu iconButtonElement={<IconButton iconStyle={{color: 'white'}} iconClassName="mdi mdi-dots-vertical"/>}>
                          <MenuItem primaryText="Settings" />
                          <MenuItem primaryText="About" />
                    </IconMenu>}
                   iconElementLeft={<IconButton iconStyle={{color: 'white'}} iconClassName="mdi mdi-arrow-left"/>}/>
                <div style= {TitleStyle}>
                    Available Courses
                </div>
                <div style={{overflowY: 'scroll', height: '80vh'}}>
                    {
                        courses.map(function(element, index){
                            return (
                                <Card style={{
                                    animation: 'flyInFromBottom 0.3s ease ' + (index+1)*0.1 + 's',
                                    WebkitAnimation: 'flyInFromBottom 0.3s ease ' + (index+1)*0.1 + 's',
                                    float: 'left',
                                    width: 'calc(50% - 4px)',
                                    margin: '2px',
                                    opacity: '0',
                                    animationFillMode: 'forwards'
                                }}
                                    key={index} onTouchTap={self.goToCourse.bind(this,index)}>
                                    <CardMedia>
                                        <img src={"img/courses/" + index + ".png"} />
                                    </CardMedia>
                                    <CardText>
                                    {
                                        (element.title.length > 15)
                                            ? element.title.slice(0,15) + "..."
                                            : element.title
                                    }
                                    </CardText>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
})