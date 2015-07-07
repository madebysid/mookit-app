var React = require('react'),
    material= require('./Material.js'),
    mui = require('material-ui'),
    CircularProgress = mui.CircularProgress

var ProgressBar = React.createClass({
    mixins: [material],

    toggle: function(){
        var self = this
        this.setState({
            show: !self.state.show
        })
    },

    getInitialState: function(){
        return {
            show: this.props.show
        }
    },

    componentWillReceiveProps: function(nextProps){
        this.setState({
            show: nextProps.show
        })
    },

    render: function(){
        var overlayStyle = {
                display: (this.state.show) ? 'block' : 'none',
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'white',
                top: '0',
                left: '0',
                opacity: '0.8',
                zIndex: '1000',
                transition: '0.5s'
            },
            progressStyle = {
                display: (this.state.show) ? 'block' : 'none',
                position: 'absolute',
                left: '40vw',
                top: '45vh',
                zIndex: '1002',
                margin: 'auto',
                transition: '0.5s'
            }
        return (
            <div>
                <div style={overlayStyle}></div>
                <CircularProgress style={progressStyle} size={0.6} mode="indeterminate" />
            </div>
        )
    }
})

module.exports = ProgressBar