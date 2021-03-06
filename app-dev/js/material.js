var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    injectTapEventPlugin = require("react-tap-event-plugin");

injectTapEventPlugin();
React.initializeTouchEvents(true)

module.exports = {
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
}