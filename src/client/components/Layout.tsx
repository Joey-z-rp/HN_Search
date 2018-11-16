import * as React from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import {
    Button,
    Container,
    Icon,
    Menu,
    Sidebar,
    Segment,
    Image,
    Select,
} from 'semantic-ui-react';
import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import * as moment from 'moment';
import { toggleSidebar } from '../actions/navigation';
import * as s from './layout/Layout.css';
import Footer from './Footer';

const mapStateToProps = (state) => ({
    showSidebar: state.navigation.showSidebar,
});

function mapDispatchToProps(dispatch) {
    return {
        toggle: () => dispatch(toggleSidebar()),
    };
}

export class Layout extends React.Component<any> {
    state = { from: '2000-1-1'};

    render() {
        const { children, showSidebar, toggle } = this.props;

        return (
            <Sidebar.Pushable as={Segment} className={`${s.fullHeight} ${s.flex} ${s.inheritBg}`}>
                <Sidebar
                    direction="right"
                    as={Menu}
                    animation='overlay'
                    icon='labeled'
                    inverted
                    vertical
                    visible={showSidebar}
                >
                    <Menu.Item>
                        <p>Search type</p>
                        <Select options={[{text: 'se', value: 123}]} />
                    </Menu.Item>
                    <Menu.Item>
                        <p>Sort order</p>
                        <Select options={[{text: 'se', value: 123}]} />
                    </Menu.Item>
                    <Menu.Item fitted="horizontally">
                        <p>Date range</p>
                        <Select options={[{text: 'se', value: 123}]} />
                        <p>From</p>
                        <DatePicker
                            className={s.minWidth}
                            dateFormat="YYYY-MM-DD"
                            selected={moment(this.state.from)}
                            onChange={(date) => this.setState({ from: date.format('YYYY-MM-DD') })}
                        />
                        <p>To</p>
                        <DatePicker
                            className={s.minWidth}
                            dateFormat="YYYY-MM-DD"
                            selected={moment()}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <p>Hits per page</p>
                        <Select options={[{text: 'se', value: 123}]} />
                    </Menu.Item>
                    <Menu.Item>
                        <Button size="mini"><Icon name="backward" /></Button>
                    </Menu.Item>
                </Sidebar>
                    <Menu color="teal" inverted className={s.noMarginTop} size="huge" borderless>
                        <Menu.Menu widths={2}>
                            <Menu.Item header>
                                <Image size="mini" spaced="right" src="https://camo.githubusercontent.com/0445a09c5eeb90aca6a4975fffced9abfeb24d61/68747470733a2f2f72656163742e73656d616e7469632d75692e636f6d2f6c6f676f2e706e67" />
                                Hacker news search
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu  position="right">
                            <Button
                                color="teal"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    toggle();
                                }}
                            >
                                <Icon size="large" name="setting" />
                            </Button>
                        </Menu.Menu>
                    </Menu>
                <Sidebar.Pusher
                    className={`${s.flex} ${s.flexGrow}`}
                    onClick={() => { if (showSidebar) toggle() }}
                >
                    <Container>
                        {children}
                    </Container>
                    <Footer />
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
