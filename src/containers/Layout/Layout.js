import React, { Component, Fragment } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSidedrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    toggleSidedrawerHandler = () => {
        // this.setState({ showSideDrawer: !this.state.showSideDrawer }); Can lead to side effects because of the async nature of setState...
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    }

    render() {
        return (
            <Fragment>
                <Toolbar toggleClicked={this.toggleSidedrawerHandler} />
                <SideDrawer open={this.state.showSideDrawer} closeDrawer={this.closeSidedrawerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }

};

export default Layout;


// functional component version:
// const layout = (props) => (
//     <Fragment>
//         <Toolbar />
//         <SideDrawer />
//         <main className={classes.Content}>
//             {props.children}
//         </main>
//     </Fragment>
// );

// export default layout;