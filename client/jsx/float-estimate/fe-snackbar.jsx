'use strict';

import React from 'react';
import {Snackbar} from 'material-ui';
import {FE_TripDialog} from './fe-trip-dialog';

export const FE_Snackbar = React.createClass({

  contextTypes: {
    UserAuthentication: React.PropTypes.object
  },

  propTypes: {
    selectedAccesses: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    river: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      dialogOpen: false
    }
  },

  handleDialogClose: function() {
    this.setState({
      dialogOpen: false
    });
  },

  handleDialogOpen() {
    this.setState({
      dialogOpen: true
    });
  },

  render: function () {
    const selectedCount = this.props.selectedAccesses.length;
    const {servicesReady, loggedIn, loginWithFacebook} = this.context.UserAuthentication;

    let message = '';
    if (selectedCount === 0) {
      message = 'Please select a waypoint.';
    } else if (selectedCount === 1) {
      message = "Please select another waypoint."
    } else if (selectedCount === 2) {
      message = 'Estimated trip time: Top secret';
    }

    let action = null;
    let actionTouchTap = null;
    if (servicesReady) {
      if (!loggedIn) {
        action = 'Login to Record Trip';
        actionTouchTap = loginWithFacebook
      } else if (selectedCount === 2 && loggedIn) {
        action = 'Record Trip';
        actionTouchTap = this.handleDialogOpen
      }
    }

    return (
      <div>
        <Snackbar
          open={true}
          message={ <span style={{fontSize: '18px'}}>{message}</span> }
          action={action}
          onActionTouchTap={actionTouchTap}
          onRequestClose={ () => {} }
          bodyStyle={{'textAlign': 'center', fontFamily: "'Roboto', sans-serif"}}
        />
        <FE_TripDialog 
          dialogOpen={this.state.dialogOpen} 
          handleDialogClose={this.handleDialogClose} 
          selectedAccesses={this.props.selectedAccesses}
          river={this.props.river}
        />
      </div>
    );
  }
});


