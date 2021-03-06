'use strict';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

export const MarkerLabel = React.createClass({

  contextTypes: {
    marker: React.PropTypes.object.isRequired
  },

  propTypes: {
    noHide: React.PropTypes.bool,
    direction: React.PropTypes.string,
    offset: React.PropTypes.arrayOf(React.PropTypes.number),
    className: React.PropTypes.string,
    children: React.PropTypes.node
  },

  getDefaultProps() {
    return {
      noHide: false,
      direction: 'right',
      offset: [0, 0],
      className: ''
    }
  },

  componentWillMount() {
    this._create();
  },

  componentWillUnmount() {
    this._destroy();
  },

  _create() {
    const {children, direction, offset, className, noHide} = this.props;
    const {marker} = this.context;

    marker.bindLabel(ReactDOMServer.renderToString(children), {direction, offset: offset.reverse(), className, noHide}); // bug fix in label lib

    if (noHide) {
      marker.showLabel();
    }
  },

  _destroy() {
    this.context.marker.unbindLabel();
  },

  render() {
    const {children} = this.props;
    const {marker} = this.context;

    marker.updateLabelContent(ReactDOMServer.renderToString(children));
    return null;
  }
});
