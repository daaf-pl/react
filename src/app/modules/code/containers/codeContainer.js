import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { sendPageView } from '../../application/actions/viewAction';
import { fetchCode, clearCode } from '../actions/codeAction';
import Code from '../components/codeComponent';

class CodeContener extends Component {
    render() {
        return (
            <Code {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pageView: state.codeView.view,
    code: state.codeView.code,
    isLoading: state.codeView.isLoading
})

const mapDispatchToProps = dispatch => ({
    // sendPageView: pageView => {
    //     dispatch(sendPageView(pageView));
    // },
    fetchCode: codeView => {
        dispatch(fetchCode(codeView));
    },
    clearCode: () => {
        dispatch(clearCode());
    }
})

// export default CodeContener;
export default connect(mapStateToProps, mapDispatchToProps)(CodeContener);