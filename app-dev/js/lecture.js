var React = require('react'),
    Animate = React.addons.CSSTransitionGroup,
    mui = require('material-ui'),
    material = require('./material.js'),
    YouTube = require('react-youtube'),
    superagent = require('superagent'),
    Offline = require('./offline.js'),

    Card = mui.Card,
    CardMedia = mui.CardMedia,
    CardText = mui.CardText,
    CardTitle = mui.CardTitle,
    List = mui.List,
    ListItem = mui.ListItem,
    FontIcon = mui.FontIcon,
    IconButton = mui.IconButton,
    CircularProgress = mui.CircularProgress,
    Dialog = mui.Dialog,
    Avatar = mui.Avatar

var TopicNormal = React.createClass({
    render: function(){
        var styles = {
            position: 'absolute',
            top: 'calc(50% - 1.25em)',
            right: '10px',
            color: '#378E43'
        }
        return (
            <Animate transitionName="topics" transitionAppear={true}>
                <ListItem onTouchTap={this.props.toggle} secondaryText={this.props.text} secondaryTextLines={1}>
                    <p style={styles}>{this.props.replies}</p>
                </ListItem>
            </Animate>
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
            .get(localStorage.getItem('mainUrl') + '/forums/comments/' + this.props.tid)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .unset('Content-Type')
            .timeout(10000)
            .end(function(err, res){
                if(err){
                    if(err.timeout==10000){
                        self.setState({
                            offline: true
                        })
                    }
                }
                else{
                    self.setState({
                        lectureTopicComments: res.body,
                        loading: false
                    })
                }
            })
    },
    getInitialState: function(){
        return {
            lectureTopicComments: [],
            loading: true,
            offline: false
        }
    },
    render: function(){
        var expandedStyle = {
            position: 'absolute',
            backgroundColor: 'white',
            width: '100vw',
            left: '0',
            bottom: '0',
            top: '0',
            paddingLeft: '10px',
            zIndex: '1000',
            transitionDuration: '3s',
            padding: '10px',
            overflowY: 'scroll',
            height: '70vh'
        },
        closeStyle = {
            position: 'fixed',
            top: '30vh',
            right: '10px',
            zIndex: '2000'
        },
        descStyle = {
            padding: '10px',
            paddingTop: '0px',
            color: '#727272'
        },
        FABStyle = {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#F0592A',
            borderRadius: '50%',
            boxShadow: '0px 0px 5px #727272'
        },
        loaderStyle = {
            position: 'absolute',
            left: '0',
            right: '0',
            margin: '0 auto',
            top: '30vh',
            zIndex: '5000',
            display: (this.state.loading) ? 'block' : 'none',
        }
        return (
            <div style={expandedStyle}>
                {
                    this.state.offline ? <Offline /> : null
                }
                <Animate transitionName="topicsOpen" transitionAppear={true}>
                    <p style={{color: '#378E43'}}>{this.props.text}</p>
                    <IconButton style={closeStyle} onTouchTap={this.close} iconClassName="mdi mdi-close"></IconButton>

                    <div style={descStyle} dangerouslySetInnerHTML={{__html: this.props.description}}></div>
                    {
                        this.state.lectureTopicComments.map(function(element){
                            return (
                                <div>
                                    <ListItem disabled={true} leftAvatar={<Avatar src={localStorage.getItem('loginUrl') + "/sites/default/files" + element.avatar.slice(8)}></Avatar>}>
                                        <div style={{color: '#F0592A', fontSize: '0.75em', lineHeight: '0em'}}>{element.username}</div>
                                        <div style={{color: '#727272'}} dangerouslySetInnerHTML={{__html: element.text}}></div>
                                    </ListItem>
                                </div>
                            )
                        })
                    }
                    <IconButton iconStyle={{color: 'white'}} style={FABStyle} iconClassName="mdi mdi-reply" />
                </Animate>
                <CircularProgress mode="indeterminate" size={0.5} style={loaderStyle}/>
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

    newForum: function(){
        console.log('Create new topic forum')
    },

    componentWillMount: function(){
        var self = this
        superagent
            .get(localStorage.getItem('mainUrl') + '/forums/' + self.props.data.forumsectionId)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .end(function(err, res){
                if(err){
                    if(err.timeout==10000)
                        this.setState({
                            offline: true
                        })
                    console.log('Some Error')
                    this.refs.lectureLoadError.show()
                }
                else if(res.body[0].data != "null")
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
            loading: true,
            offline: false
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
        },
        FABStyle = {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#F0592A',
            borderRadius: '50%',
            boxShadow: '0px 0px 5px #727272'
        }
        return (
            <div>
                {
                    this.state.offline ? <Offline /> : null
                }
                <Animate transitionName="cardOpen" transitionAppear={true}>
                <Card style={{zIndex: '1000'}}>
                    <CardMedia>
                        <YouTube opts={VidOpts} url={self.props.data.vurl}></YouTube>
                    </CardMedia>
                    <CardText subtitle="Instructor" style={CardTitleStyle}>
                        <p style={{lineHeight: '1em'}}>{self.props.data.title}</p>
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

                <IconButton onTouchTap={this.newForum} iconStyle={{color: 'white'}} style={FABStyle} iconClassName="mdi mdi-border-color" />
                </Animate>
            </div>
        )
    }
})