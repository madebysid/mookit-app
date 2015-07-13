var React = require('react'),
    mui = require('material-ui'),
    material = require('./material.js'),
    YouTube = require('react-youtube'),
    superagent = require('superagent'),
    links = require('./links.js'),

    Card = mui.Card,
    CardMedia = mui.CardMedia,
    CardText = mui.CardText,
    CardTitle = mui.CardTitle,
    List = mui.List,
    ListItem = mui.ListItem,
    FontIcon = mui.FontIcon,
    IconButton = mui.IconButton,
    CircularProgress = mui.CircularProgress

var TopicNormal = React.createClass({
    render: function(){
        var styles = {
            position: 'absolute',
            top: 'calc(50% - 1.25em)',
            right: '10px',
            color: '#378E43'
        }
        return (
            <ListItem onTouchTap={this.props.toggle} secondaryText={this.props.text} secondaryTextLines={1}>
                <p style={styles}>{this.props.replies}</p>
            </ListItem>
        )
    }
})

var TopicExpanded = React.createClass({
    close: function(){
        var self = this
        setTimeout(function(){
            self.props.toggle()
        },300)

    },

    componentWillMount: function(){
        var self = this
        superagent
            .get(links.main + '/forums/comments/' + this.props.tid)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .unset('Content-Type')
            .end(function(err, res){
                self.setState({
                    lectureTopicComments: res.body
                })
            })
    },
    getInitialState: function(){
        return {
            lectureTopicComments: []
        }
    },
    render: function(){
        var expandedStyle = {
            position: 'absolute',
            backgroundColor: 'white',
            width: '100vw',
            top: '0',
            left: '0',
            bottom: '0',
            paddingLeft: '10px',
            zIndex: '1000',
            transitionDuration: '3s',
                padding: '10px'
        },
        closeStyle = {
            position: 'absolute',
            top: '0',
            right: '10px'
        },
        descStyle = {
            padding: '10px',
            paddingTop: '0px'
        }
        return (
            <div style={expandedStyle}>
                <p>{this.props.text}</p>
                <IconButton style={closeStyle} onTouchTap={this.close} iconClassName="mdi mdi-close"></IconButton>

                <div style={descStyle} dangerouslySetInnerHTML={{__html: this.props.description}}></div>
                {
                    this.state.lectureTopicComments.map(function(element){
                        return (
                            <div>
                                <FontIcon style={{float: 'left'}} className="mdi mdi-menu-right"></FontIcon>
                                <div>{element.username}</div>
                                <div style={descStyle} dangerouslySetInnerHTML={{__html: element.text}}></div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
})

var ExpandableListItem = React.createClass({
    toggle: function(){
        var self = this
        this.setState({
            opened: !self.state.opened
        })
    },
    getInitialState: function(){
        return {
            opened: false
        }
    },
    render: function(){
        var ListStyle = {
            position: this.state.opened ? 'absolute' : 'inherit',
            margin: this.state.opened ? '0' : '10px',
            transitionDuration: '3s'
        },
        ToRender = this.state.opened ? TopicExpanded : TopicNormal
        return (
            <div>
                <ToRender style={ListStyle} toggle={this.toggle} text={this.props.data.topic} replies={this.props.data.numPosts} description={this.props.data.description} tid={this.props.data.tid} />
            </div>
        )
}
})

module.exports = React.createClass({
    componentWillMount: function(){
        var self = this
        superagent
            .get(links.main + '/forums/' + self.props.data.forumsectionId)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .end(function(err, res){
                if(res.body[0].data != "null")
                    self.setState({
                        lectureTopics: res.body,
                        loading: false
                    })
                else
                    self.setState({
                        lectureTopics: 'Nothing to show',
                        loading: false
                    })
            })
    },

    getInitialState: function(){
        return {
            lectureTopics: [],
            loading: true
        }
    },
    render: function(){
        var self = this
        var VidOpts = {
            height: 'auto',
            width: '100%',
            playerVars: {
                autoplay: 1
            }
        },
        DisTitleStyle = {
            paddingLeft: '20px',
            paddingTop: '20px',
            fontFamily: 'RobotoRegular'
        },
        CardTitleStyle = {
            padding: '0 20px',
            fontSize: '1em',
            color: '#378E43'
        },
        loaderStyle = {
            position: 'absolute',
            left: '0',
            right: '0',
            margin: '0 auto',
            top: '50vh',
            display: (this.state.loading) ? 'block' : 'none',
        }
        return (
            <div>
                <Card style={{zIndex: '1000'}}>
                    <CardMedia>
                        <YouTube opts={VidOpts} url={self.props.data.vurl}></YouTube>
                    </CardMedia>
                    <CardText subtitle="Instructor" style={CardTitleStyle}>
                        <p style={{lineHeight: '0em'}}>{self.props.data.title}</p>
                        <p style={{lineHeight: '0em', fontSize: '0.75em', color: '#B6B6B6'}}>Instructor</p>
                    </CardText>
                </Card>

                <div style={DisTitleStyle}>Discussions</div>
                <CircularProgress mode="indeterminate" size={0.5} style={loaderStyle}/>
                <List style={{paddingLeft: '20px', paddingBottom: '0'}}>
                    {
                        this.state.lectureTopics.map(function(element, index){
                            return <ExpandableListItem key={index} data={element} />
                        })
                    }
                </List>
            </div>
        )
    }
})