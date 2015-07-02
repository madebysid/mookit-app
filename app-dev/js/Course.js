var React = require('react'),
    Link = require('react-router').Link,
    mui = require('material-ui'),
    material = require('./Material.js'),
    CourseContents = require('./Contents.js'),
    Lecture = require('./Lecture.js'),
    CourseForums = require('./Forums.js'),
    CourseResources = require('./Resources.js'),
    CourseChat = require('./Chat.js'),
    Settings = require('./Settings.js'),
    reqwest = require('reqwest'),

    AppBar = mui.AppBar,
    Tabs = mui.Tabs,
    Tab = mui.Tab,
    IconButton = mui.IconButton,
    Menu = mui.Menu

var expanded = []

var Course = React.createClass({

    mixins: [material],

    sortByWeeks: function(data){
        var newData = [],
            maxWeek = 0

        data.forEach(function(element){
            if(element.week.slice(5) > maxWeek)
                maxWeek = element.week.slice(5)
        })

        for(var i=0 ; i<= maxWeek ; i++) {
            newData[i] = new Array()
            expanded[i] = false
        }

        data.forEach(function(element, index){
            newData[parseInt(element.week.slice(5))].push(element)
        })

        return newData
    },
    menuTapHandler: function(){
        this.setState({
            isMenuVisible: true
        })
    },
    menuItemTapHandler: function(e, index, menuItem){
        this.setState({
            isMenuVisible: false
        })
    },

    getInitialState: function(){
        return {
            data: [],
            isMenuVisible: false
        }
    },

    componentWillMount: function(){
        var self = this;
        reqwest({
            url: 'courseContents.json',
            method: 'GET',
            success: function(data){
                self.setState({
                    data: self.sortByWeeks(data)
                })
            }
        })
    },

    render: function(){
        var self = this
        var id = this.props.params.courseId
        var AppBarStyle = {
            backgroundColor: "#238743",
            fontSize: '0.5em'
        },
        TabStyle = {
            backgroundColor: "#238743",
            fontFamily: 'RobotoThin'
        },
        TitleStyle = {
            backgroundColor: "#238743",
            fontSize: '1.3em',
            fontFamily: 'RobotoLight',
            color: 'white',
            paddingLeft: '2.8em',
            paddingTop: '0.5em',
            paddingBottom: '0.75em'
        },
        SpaceStyle = {
            backgroundColor: "#238743",
            height: '7px',
            width: '100%'
        },
        MenuStyle = {
            position: 'absolute',
            right: '0',
            fontSize: '1em'
        }

        var numberMenuItems = [
            { payload: '1', text: 'About'},
            { payload: '2', text: 'Settings'}
        ];

        return (
            <div>
                <AppBar style={AppBarStyle} onLeftIconButtonTouchTap={this.leftTouch} zDepth={0} iconClassNameLeft="mdi mdi-arrow-left" iconClassNameRight="mdi mdi-bell">
                    <IconButton iconClassName="mdi mdi-dots-vertical" style={{marginTop: '8px', marginLeft: '13px', marginRight: '-3px'}} iconStyle={{color: 'white'}} onTouchStart={self.menuTapHandler}>

                    </IconButton>
                    <Menu style={MenuStyle} hideable={true} visible={this.state.isMenuVisible} menuItems={numberMenuItems} onItemTap={this.menuItemTapHandler}/>
                </AppBar>

                <div style={TitleStyle}>
                    MOOC on MOOCs
                </div>
                <Tabs tabItemContainerStyle={TabStyle} initialSelectedIndex={0}>
                    <Tab label="CONTENT" style={{fontSize: '0.8em', fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <CourseContents expanded={expanded} repeatEntity={self.state.data}></CourseContents>
                    </Tab>
                    <Tab label="FORUMS" style={{fontSize: '0.8em', fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <div>
                            <CourseForums />
                        </div>
                    </Tab>
                    <Tab label="RESOURCES" style={{fontSize: '0.8em', fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <div>
                            <CourseResources />
                        </div>
                    </Tab>
                    <Tab label="CHAT" style={{fontSize: '0.8em', fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <div>
                            <CourseChat />
                        </div>
                    </Tab>
                </Tabs>

            </div>
        )
    }
})

module.exports = Course;