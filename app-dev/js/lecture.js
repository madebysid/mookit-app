var React = require('react'),
    mui = require('material-ui'),
    superagent = require('superagent'),
    Router = require('react-router'),
    Video = require('react-youtube'),
    Loader = require('./loader.js'),

    TopicNormal = require('./topicNormal.js'),

    Card = mui.Card,
    CardText = mui.CardText,
    CardMedia = mui.CardMedia,
    List = mui.List,
    IconButton = mui.IconButton

var Lecture = React.createClass({
    mixins: [Router.State, Router.Navigation],

    handleTouch: function(topic){
        localStorage.setItem('lectureTopicTitle', topic.lectureTitle)
        localStorage.setItem('lectureTopicDesc', topic.description)
        this.transitionTo('lectureTopic', {lectureId: this.getParams().lectureId, topicId: topic.tid})
        // console.log(topic)
    },
    newForum: function(){
        localStorage.setItem('topicId', this.getParams().lectureId)
        this.transitionTo('newTopicForum', {lectureId: this.getParams().lectureId})
    },


    getInitialState: function() {
        return {
            topics: [],
            vurl: localStorage.getItem('vurl')
        };
    },
    componentDidMount: function() {
        var self = this,
            lectureId = this.getParams().lectureId
        self.refs.loader.showLoader()
        superagent
            .get(localStorage.getItem('mainUrl') + '/forums/' + lectureId)
            .set('token', localStorage.getItem('token'))
            .set('uid', localStorage.getItem('uid'))
            .end(function(err, res){
                self.refs.loader.hideLoader()
                if(err){
                    if(err.timeout==10000)
                        console.log('Timeout')
                }
                else {
                    if(res.body[0].data != "null")
                        self.setState({
                            topics: res.body
                        })
                    else
                        self.setState({
                            topics: ['Nothing to show']
                        })
                }
            })
    },
    render: function(){
        var self = this
        var VidOpts = {
            height: '100%',
            width: '100%'
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
            <div style={{height: 'calc(100vh - 40px)', overflowY: 'scroll'}}>
                <Card>
                    <CardMedia>
                        <Video opts={VidOpts} url={self.state.vurl} />
                    </CardMedia>
                    <CardText subtitle="Instructor" style={CardTitleStyle}>
                        <p style={{lineHeight: '1em'}}>Title</p>
                        <p style={{lineHeight: '0em', fontSize: '0.75em', color: '#B6B6B6'}}>Instructor</p>
                    </CardText>
                </Card>

                <div style={DisTitleStyle}>Discussions</div>
                <List style={{paddingLeft: '20px', paddingBottom: '100px'}}>
                    {
                        self.state.topics.map(function(element, index){
                            return (
                                <div>
                                    <TopicNormal text={element.topic} onTouchTap={self.handleTouch.bind(this, element)} replies={element.numPosts}/>
                                </div>
                            )
                        })

                    }
                <Loader ref="loader" />
                </List>

                <IconButton
                    onTouchTap={this.newForum}
                    iconStyle={{color: 'white'}}
                    style={FABStyle}
                    iconClassName="mdi mdi-plus" />
            </div>
        )
    }
})

module.exports = Lecture
