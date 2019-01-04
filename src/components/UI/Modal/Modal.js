import React, { Fragment, Component } from 'react';
import classes from './Modal.css';

import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    componentWillUpdate() {
        console.log('[MODAL] WillUpdate');
    }

    // Ultimately prevents the order summary from updating
    // I suppose implementing it here prevents any other component wrapped in a modal from updating when it's not shown!
    shouldComponentUpdate(nextProps, nextState) {
        console.log(nextProps.show);
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Fragment>

        );
    }
}

export default Modal;


// Functional version:
// const modal = (props) => (
//     <Fragment>
//         <Backdrop show={props.show} clicked={props.modalClosed} />
//         <div className={classes.Modal}
//             style={{
//                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                 opacity: props.show ? '1' : '0'
//             }}>
//             {props.children}
//         </div>
//     </Fragment>

// );

// export default modal;