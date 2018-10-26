import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPdf, clearPdf } from '../actions/pdfAction';
import Pdf from '../components/pdfComponent';

class PdfContener extends Component {
    render() {
        return (
            <Pdf {...this.props} />
        );
    }
}

const mapStateToProps = state => ({
    pdf: state.pdfReducer.pdf,
    isLoading: state.pdfReducer.isLoading
})

const mapDispatchToProps = dispatch => ({
    fetchPdf: uid => {
        dispatch(fetchPdf(uid));
    },
    clearPdf: () => {
        dispatch(clearPdf());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PdfContener);