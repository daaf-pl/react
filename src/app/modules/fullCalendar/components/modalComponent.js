import React, { Component } from 'react';
// import { Modal, Popover, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class Example extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
        // console.log(this.state.show);
    }

    render() {
        // const { isLoading } = this.props;
        // console.log(isLoading);
        // const popover = (
        //     <Popover id="modal-popover" title="popover">
        //         very popover. such engagement
        // </Popover>
        // );
        // const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;

        return (
            <div>
                <p>Click to get the full Modal experience!</p>

                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={this.handleShow}>
                    Launch demo modal
                </button>
                <div className="modal fade" /*show={this.state.show} onHide={this.handleClose}*/ id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" onClick={this.handleClose} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                                </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </p>

                        <h4>Popover in a modal</h4>
                        <p>
                            there is a{' '}
                            <OverlayTrigger overlay={popover}>
                                <a href="#popover">popover</a>
                            </OverlayTrigger>{' '}
                            here
              </p>

                        <h4>Tooltips in a modal</h4>
                        <p>
                            there is a{' '}
                            <OverlayTrigger overlay={tooltip}>
                                <a href="#tooltip">tooltip</a>
                            </OverlayTrigger>{' '}
                            here
              </p>

                        <hr />

                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
              </p>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur
                            et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                            auctor.
              </p>
                        <p>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                            dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
              </p>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur
                            et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                            auctor.
              </p>
                        <p>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                            dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
                        <p>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                            ac consectetur ac, vestibulum at eros.
              </p>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur
                            et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                            auctor.
              </p>
                        <p>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
                            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
                            dui. Donec ullamcorper nulla non metus auctor fringilla.
              </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal> */}
            </div>
        );
    }
}

// render(<Example />);