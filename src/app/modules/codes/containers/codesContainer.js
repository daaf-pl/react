import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { sendPageView } from '../../application/actions/viewAction';
import { fetchCodes, clearCodes } from '../actions/codesAction';
import Codes from '../components/codesComponent';

class CodesContener extends Component {
    render() {
        return (
            <Codes {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pageView: state.codesView.view,
    codes: state.codesView.codes,
    isLoading: state.codesView.isLoading
})

const mapDispatchToProps = dispatch => ({
    // sendPageView: pageView => {
    //     dispatch(sendPageView(pageView));
    // },
    fetchCodes: codesView => {
        dispatch(fetchCodes(codesView));
    },
    clearCodes: () => {
        dispatch(clearCodes());
    }
})

// export default CodesContener;
export default connect(mapStateToProps, mapDispatchToProps)(CodesContener);