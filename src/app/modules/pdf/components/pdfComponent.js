import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

export default class Pdf extends Component {

    state = {
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    componentDidMount() {
        this.props.fetchPdf('1234567');
    }

    componentWillUnmount() {
        this.props.clearPdf();
    }

    fetchPdf() {
        const { pageNumber, numPages } = this.state;

        return (
            <div>
                <Document
                    file="somefile.pdf"
                    onLoadSuccess={this.onDocumentLoad}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
            </div>
        );
    }

    loadingPage() {
        const { isLoading } = this.props;
        // console.log(this.props);
        if (isLoading) {
            return (
                <div className='App'>
                    <div className='ReactRoot'>
                        <div>
                            <div>
                                <div className={`PageLoaderView show`}>
                                    <div className='spinner'>
                                        <div className='rect1'></div>
                                        <div className='rect2'></div>
                                        <div className='rect3'></div>
                                        <div className='rect4'></div>
                                        <div className='rect5'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="container">
                        {this.fetchPdf()}
                    </div>
                </div>
            );
        }
    }

    render() {
        document.getElementsByTagName("META")[4].content = "A tu ciach opis pojedynczego kodu.";
        return (
            <div id="pdf">
                <div className='pdf-header'><div className='container'><h1>PDF:</h1></div></div>
                <div className='container pdf-container'>
                    {this.loadingPage()}
                </div>
            </div>
        );
    }

}