var React = require('react'),
    Link = require('react-router').Link,
    mui = require('material-ui'),
    material = require('./Material.js'),
    reqwest = require('reqwest'),
    AppBar = mui.AppBar,
    Card = mui.Card,
    CardText = mui.CardText,
    Tabs = mui.Tabs,
    Tab = mui.Tab,
    IconButton = mui.IconButton,
    List = mui.List,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider

React.initializeTouchEvents(true)

var expanded = []

var NormalText = React.createClass({
    handleClick: function(){
        this.props.onTouchStart()
    },
    render: function(){
        return (
            <div onTouchStart={this.handleClick} style={{width: '100%'}}>
                {this.props.text[0].week}
            </div>
        )
    }
})

var CardList = React.createClass({
    handleClick: function(){
        this.props.onTouchStart()
    },
    render: function() {
        var self = this
        return (
            <div>
                <h3 onTouchStart={self.handleClick}>
                    {self.props.text[0].week}
                </h3>
                <ListDivider />
                <List>
                    {
                        this.props.text.map(function(element, index){
                            return (
                                <div>
                                    <ListItem>{self.props.text[index].title}</ListItem>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
});


var ExpandableListItem = React.createClass({
    toggle: function(){
        this.props.handleToggle(this.props.id)
    },
    render: function(){
        var Styles = {
            backgroundColor: 'white',
            margin: (this.props.isExpanded) ? '5vh 0vw' : '0vh 5vw',
            transitionDuration: '0.3s'
        }

        var ToRender = expanded[this.props.id] ? CardList : NormalText
        return (
            <div>
                <Card zDepth={1} rounded={false} style={Styles}>
                    <CardText>
                        <ToRender onTouchStart={this.toggle} id={this.props.id} text={this.props.data}/>
                    </CardText>
                </Card>
            </div>
        )
    }
})

var ExpandableCourseList = React.createClass({
    toggleCard: function(cardId){
        this.state.expanded.forEach(function(element, index){
            expanded[index] = (index == cardId) ? !expanded[index] : false
        })
        this.setState({
            expanded: expanded
        })
    },

    getInitialState: function(){
        return {
            expanded: expanded
        }
    },
    render: function(){
        var self = this
        var spaceStyle = {
            width: '100%',
            height: '15px'
        }
        return (
            <div>
                <div style={spaceStyle}></div>
                {this.props.repeatEntity.map(function(element, index) {
                        return (
                            <ExpandableListItem isExpanded={self.state.expanded[index]} handleToggle={self.toggleCard} key={index} id={index} data={element} />
                        )}
                )}
            </div>
        )
    }
})

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

    getInitialState: function(){
        return {
            data: []
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
            paddingLeft: '2.5em',
            paddingTop: '0.5em',
            paddingBottom: '0.75em'
        },
        SpaceStyle = {
            backgroundColor: "#238743",
            height: '7px',
            width: '100%'
        }
        return (
            <div>
                <AppBar style={AppBarStyle} onLeftIconButtonTouchTap={this.leftTouch} zDepth={0} iconClassNameLeft="mdi mdi-arrow-left" iconClassNameRight="mdi mdi-bell">
                    <IconButton iconClassName="mdi mdi-dots-vertical" style={{marginTop: '7px', marginLeft: '13px', marginRight: '-3px'}} iconStyle={{color: 'white'}}/>
                </AppBar>
                <div style={TitleStyle}>
                    MOOC on MOOCs
                </div>
                <Tabs tabItemContainerStyle={TabStyle}>
                    <Tab label="CONTENT" style={{fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <ExpandableCourseList repeatEntity={self.state.data}></ExpandableCourseList>
                    </Tab>
                    <Tab label="FORUM" style={{fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <div>
                            Tab 2
                        </div>
                    </Tab>
                    <Tab label="RESOURCES" style={{fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <div>
                            Tab 3
                        </div>
                    </Tab>
                    <Tab label="CHAT" style={{fontFamily: 'RobotoLight'}}>
                        <div style={SpaceStyle} />
                        <div>
                            Tab 4
                        </div>
                    </Tab>
                </Tabs>

            </div>
        )
    }
})

module.exports = Course;