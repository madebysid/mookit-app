var React = require('react'),
    Router = require('react-router'),
    mui = require('material-ui'),
    material = require('./Material.js'),
    Video = require('react-youtube'),

    request = require('superagent'),
    links = require('./Links.js'),

    AppBar = mui.AppBar,
    IconButton = mui.IconButton,
    Menu = mui.Menu,
    List = mui.List,
    ListItem = mui.ListItem,
    ListDivider = mui.ListDivider,
    Avatar = mui.Avatar,
    Card = mui.Card,
    CardText = mui.CardText

React.initializeTouchEvents(true)

var expanded = []

var CommentNormal = React.createClass({
    handleTouch: function(){
        this.props.onTouchStart(this.props.id)
    },
    render: function(){
        return (
            <ListItem onTouchStart={this.handleTouch} leftAvatar={<Avatar />}
                      secondaryText={
                        <p><span style={{color: 'red'}}>{this.props.data.author}</span><br/>
                          {this.props.data.text}
                        </p>
                      } secondaryTextLines={2}>
                {this.props.data.title}
            </ListItem>
        )
    }
})

var CommentExpanded = React.createClass({
    render: function(){
        var self = this
        var AuthorStyle = {
            lineHeight: '0.5em',
            fontSize: '0.9em',
            color: 'red'
        },
        TextStyle = {
            fontSize: '0.8em',
            paddingRight: '1vw'
        }

        return (
            <div>
                <ListItem onTouchStart={this.props.onTouchStart} leftAvatar={<Avatar />} >
                    {this.props.data.title}
                    <p style={AuthorStyle}>{this.props.data.author}</p>
                    <p style={TextStyle}>{this.props.data.text}</p>
                </ListItem>
                {
                    this.props.data.replies.map(function (element, index) {
                        return (
                            <ListItem rightAvatar={<Avatar />} secondaryText={self.props.data.replies[index].author}>
                                <p style={TextStyle}>{self.props.data.replies[index].text}</p>
                            </ListItem>
                        )
                    })
                }
            </div>
        )
    }
})

var ExpandableComment = React.createClass({
    handleTouch: function(id){
        this.props.handleToggle(id)
    },

    getInitialState: function(){
        return {
            expanded: this.props.isExpanded
        }
    },
    render: function(){
        var ToRender = this.state.expanded[this.props.id] ? CommentExpanded : CommentNormal
        return (
            <div>
                <ToRender id={this.props.id} data={this.props.comment} onTouchStart={this.handleTouch}/>
            </div>
        )
    }
})

var CommentsList = React.createClass({
    mixis: [material],

    handleTouch: function(id){
        expanded.forEach(function(element, index){
            expanded[index] = (index == id) ? !expanded[index] : false
        })
        this.setState({
            expanded : expanded
        })
    },

    getInitialState: function(){
        return {
            expanded: expanded,
            comments: []
        }
    },

    componentWillMount: function(){
        var self = this
        request
            .get(links.commentsJSON)
            .set('token', links.token)
            .set('uid', '4088')
            .end(function(err, res){
                self.setState({
                    comments: res.body
                })
                res.body.forEach(function(element, index){
                    expanded[index] = false
                })
                //self.props.loader(false)
            })
    },

    render: function(){
        var self = this,
        TextStyle = {
            fontFamily: 'RobotoRegular',
            color: '#838384',
            padding: '0vh 3vw'
        }
        return (
            <div>
                <List style={TextStyle} subheader="Forums">
                    {
                        this.state.comments.map(function(element, index){
                            return (
                                <div>
                                    <ExpandableComment isExpanded={self.state.expanded} key={index} id={index} handleToggle={self.handleTouch} comment={self.state.comments[index]}></ExpandableComment>
                                    <ListDivider />
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
})


var Lecture = React.createClass({
    mixins: [material, Router.Navigation],

    leftTouch: function(){
        this.transitionTo("course", { courseId: '001' });
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
            isMenuVisible: false,
            lecture: {},
            comments: []
        }
    },

    render: function(){
        var AppBarStyle = {
                backgroundColor: "#238743",
                fontSize: '0.5em',
                position: 'fixed'
            },
            MenuStyle = {
                position: 'absolute',
                right: '0',
                fontSize: '1em'
            },
            videoOpts = {
                width: '100%',
                height: '40%'
            }

        var numberMenuItems = [
            { payload: '1', text: 'About'},
            { payload: '2', text: 'Settings'}
        ]

        var CardStyle = {
                margin: '3vh 3vw'
            }
        return (
            <div>
                <AppBar style={AppBarStyle} onLeftIconButtonTouchTap={this.leftTouch} zDepth={0} iconClassNameLeft="mdi mdi-arrow-left" iconClassNameRight="mdi mdi-dots-vertical" onRightIconButtonTouchTap={this.menuTapHandler}>
                    <Menu style={MenuStyle} hideable={true} visible={this.state.isMenuVisible} menuItems={numberMenuItems} onItemTap={this.menuItemTapHandler}/>
                </AppBar>
                <div style={{paddingTop: '8vh'}}>
                    <Video from='youtube' opts={videoOpts} url={'https://www.youtube.com/watch?v=SHf3HrdP_Js'} />
                </div>
                <Card style={CardStyle}>
                    <CardText>
                        Phantom Power Music - Never Surrender
                    </CardText>
                </Card>
                <CommentsList></CommentsList>
            </div>
        )
    }
})

module.exports = Lecture