var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    mui = require('material-ui'),
    material = require('./Material.js'),
    Settings = require('./Settings.js'),
    Lecture = require('./Lecture.js'),

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
        this.props.onTouchStart()
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
            <div onTouchStart={this.handleClick} style={{width: '100%'}}>
                <img style={ImgStyle} src={'img/' + this.props.text[0].week.slice(5) + '.png'}/>
                <p style={WeekTitleStyle}>{this.props.text[0].topic}</p>
                <p style={WeekNumberStyle}>{this.props.text[0].week}</p>
                <p style={WeekLengthStyle}>({this.props.text.length} Lectures)</p>
            </div>
        )
    }
})

var CardList = React.createClass({
    handleClick: function(){
        this.props.onTouchStart()
    },
    goToLecture: function(lid){
        console.log(this.props.text[lid])
        //this.props.goToLecture(this.props.text[lid])
    },

    render: function() {
        var self = this,
            ListItemStyle = {
                marginLeft: '20vw'
            },
            ImgStyle = {
                position: 'absolute',
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
                <img style={ImgStyle} src={'img/' + this.props.text[0].week.slice(5) + '.png'}/>
                <p style={WeekTitleStyle} onTouchStart={self.handleClick}>
                    {this.props.text[0].topic}
                </p>
                <p style={WeekNumberStyle}>{this.props.text[0].week}</p>
                <List onTouchStart={this.goToLecture}>
                    {
                        this.props.text.map(function(element, index){
                            return (
                                <div>
                                    <ListItem style={ListItemStyle} key={index} onTouchStart={self.goToLecture.bind(this,index)}>
                                        {self.props.text[index].title}
                                        <Icon className="mdi mdi-play" style={{marginTop: '-1vh', color: '#838384', float: 'right'}} />
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
    mixins: [Router.Navigation],

    toggle: function(){
        this.props.handleToggle(this.props.id)
    },
    goToLecture: function(lectureObj){
        console.log(lectureObj)
        //Go to lecture page with id
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
                        <ToRender goToLecture={this.goToLecture} onTouchStart={this.toggle} id={this.props.id} text={this.props.data}/>
                    </CardText>
                </Card>
            </div>
        )
    }
})

var CourseContents = React.createClass({
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
            expanded: this.props.expanded
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

module.exports = CourseContents;