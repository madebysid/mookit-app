var React = require('react'),
    material  = require('./material.js'),
    mui = require('material-ui'),

    CircularProgress = mui.CircularProgress

var Loader = React.createClass({
    mixins: [material],

    showLoader: function(){
        var self = this
        this.setState({
            loading: true
        })
    },
    hideLoader: function(){
        var self = this
        this.setState({
            loading: false
        })
    },

    getInitialState: function() {
        return {
            loading: false
        };
    },
    render: function(){
        var self = this,
        loaderStyle = {
            position: 'absolute',
            left: '0',
            right: '0',
            margin: '0 auto',
            display: (this.state.loading) ? 'block' : 'none',
        }
        return (
            <div>
                <CircularProgress
                    mode="indeterminate"
                    size={0.5}
                    style={loaderStyle}/>
            </div>
        )
    }
})

module.exports = Loader
