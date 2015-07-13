var React = require('react'),
    Router = require('react-router'),
    RouteHandler = Router.RouteHandler,
    Link = Router.Link,
    mui = require('material-ui'),
    material = require('./material.js'),
    Lecture = require('./lecture.js'),

    AppBar = mui.AppBar,
    Card = mui.Card,
    CardText = mui.CardText,
    Tabs = mui.Tabs,
    Tab = mui.Tab,
    Icon = mui.FontIcon,
    List = mui.List,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Menu = mui.Menu

React.initializeTouchEvents(true)

var expanded = []

var NormalText = React.createClass({
    handleClick: function(){
        this.props.onTouchEnd()
    },

    render: function(){
        var ImgStyle = {
                float: 'left',
                width: '15vw',
                paddingTop: '0vh',
                paddingLeft: '0vw',
                paddingRight: '5vw',
                marginBottom: '5vh'
            },
            WeekTitleStyle = {
                fontFamily: 'RobotoRegular',
                fontSize: '1.3em',
                lineHeight: '0.5em'
            },
            WeekNumberStyle = {
                fontFamily: 'RobotoLight',
                fontSize: '1em',
                lineHeight: '0.5em'
            },
            WeekLengthStyle = {
                fontFamily: 'RobotoLight',
                fontSize: '1em',
                lineHeight: '0.5em'
            }
        return (
            <div onTouchEnd={this.handleClick} style={{width: '100%'}}>
                <img style={ImgStyle} src={'img/' + this.props.data[0].week.slice(5) + '.png'}/>
                <p style={WeekTitleStyle}>{this.props.data[0].topic}</p>
                <p style={WeekNumberStyle}>{this.props.data[0].week}</p>
                <p style={WeekLengthStyle}>({this.props.data.length} Lectures)</p>
            </div>
        )
    }
})

var CardList = React.createClass({
    handleClick: function(){
        this.props.onTouchEnd()
    },
    goToLecture: function(lecture){
        if(lecture.lid != undefined)
            this.props.goToLecture(lecture)
    },

    render: function() {
        var self = this,
            ListItemStyle = {
                marginLeft: '20vw'
            },
            ImgStyle = {
                float: 'left',
                width: '15vw',
                paddingTop: '0vh',
                paddingLeft: '0vw',
                paddingRight: '5vw'
            },
            WeekTitleStyle = {
                paddingLeft: '20vw',
                fontFamily: 'RobotoRegular',
                fontSize: '1.3em',
                lineHeight: '0.5em'
            },
            WeekNumberStyle = {
                paddingLeft: '20vw',
                fontFamily: 'RobotoLight',
                fontSize: '1em',
                lineHeight: '0.5em'
            }
        return (
            <div>
                <img style={ImgStyle} src={'img/' + this.props.data[0].week.slice(5) + '.png'}/>
                <p style={WeekTitleStyle} onTouchEnd={self.handleClick}>
                    {this.props.data[0].topic}
                </p>
                <p style={WeekNumberStyle}>{this.props.data[0].week}</p>
                <List onTouchEnd={this.goToLecture}>
                    {
                        this.props.data.map(function(element, index){
                            return (
                                <div>
                                    <ListItem onTouchEnd={self.goToLecture.bind(this, element)} style={ListItemStyle} rightIcon={<Icon className="mdi mdi-play"/>}>
                                        {self.props.data[index].title}
                                    </ListItem>
                                    <ListDivider style = {ListItemStyle}/>
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
    goToLecture: function(lecture){
        this.props.goToLecture(lecture)
    },

    render: function(){
        var Styles = {
            backgroundColor: 'white',
            margin: (this.props.isExpanded) ? '2vh 3vw' : '1vh 5vw',
            transitionDuration: '0.3s'
        }
        var ToRender = expanded[this.props.id] ? CardList : NormalText
        return (
            <div>
                <Card zDepth={(this.props.isExpanded) ? 2 : 1} rounded={false} style={Styles}>
                    <CardText style={{padding: '0vh 3vw'}}>
                        <ToRender data={this.props.data} goToLecture={this.goToLecture} onTouchEnd={this.toggle}/>
                    </CardText>
                </Card>
            </div>
        )
    }
})

module.exports = React.createClass({
    mixins: [Router.Navigation],

    toggleCard: function(cardId){
        this.state.expanded.forEach(function(element, index){
            expanded[index] = (index == cardId) ? !expanded[index] : false
        })
        this.setState({
            expanded: expanded
        })
    },
    goToLecture: function(lecture){
        this.setState({
            lectureData: lecture,
            lecture: true
        })
        this.props.goToLecture()
    },

    getInitialState: function(){
        return {
            expanded: this.props.expanded,
            lecture: this.props.lecture,
            lectureData: []
        }
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({
            lecture: nextProps.lecture,
            data: nextProps.repeatEntity
        })
    },
    render: function(){
        var self = this
        return (
            <div style={{height: '70vh', overflowY: 'scroll'}}>
                {this.state.lecture
                    ? <Lecture data={self.state.lectureData}/>
                    : this.props.repeatEntity.map(function(element, index) {
                        return (
                            <ExpandableListItem data={element} goToLecture={self.goToLecture} isExpanded={self.state.expanded[index]} handleToggle={self.toggleCard} key={index} id={index}/>
                        )}
                )}
            </div>
        )
    }
})