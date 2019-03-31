import React, { Component } from 'react';
import {
    View,
    ActivityIndicator,
    Text
} from 'react-native';

import { connect } from 'react-redux';

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 100,
                    backgroundColor: 'rgba(184,184,184,0.7)'
                }}>
                    <ActivityIndicator
                        animating={this.props.isLoading}
                        color={this.props.color ? this.props.color : 'black'}
                        size='large' />
                    <Text>{this.props.loadingText}</Text>
                </View>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state) => {
    const { common } = state;

    return {
        isLoading: common.isLoading,
        loadingText: common.loadingText
    };
};

export default connect(mapStateToProps)(Loading);