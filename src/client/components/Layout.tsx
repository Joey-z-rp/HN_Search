import 'react-datepicker/dist/react-datepicker.css';

import * as moment from 'moment';
import * as React from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Icon,
    Image,
    Menu,
    Segment,
    Select,
    Sidebar,
} from 'semantic-ui-react';

import { toggleSidebar } from '../actions/navigation';
import { IState } from '../../types/stateAndAction';
import logo from '../../../public/favicon.png';
import * as s from './layout/Layout.css';
import Footer from './Footer';

const mapStateToProps = (state: IState): IStateProps => ({
    showSidebar: state.navigation.showSidebar,
});

const mapDispatchToProps = (dispatch): IDispatchProps => ({
    toggle: () => dispatch(toggleSidebar()),
});

export class Layout extends React.Component<IProps, IComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            from: '2000-1-1',
            to: '2000-1-1',
        };
    }

    render() {
        const { children, showSidebar, toggle } = this.props;

        return (
            <Sidebar.Pushable
                as={Segment}
                className={`${s.fullHeight} ${s.flex} ${s.inheritBg}`}
            >
                <Sidebar
                    animation="overlay"
                    as={Menu}
                    direction="right"
                    icon="labeled"
                    inverted
                    vertical
                    visible={showSidebar}
                >
                    <Menu.Item>
                        <p>Search type</p>
                        <Select options={[{ text: 'se', value: 123 }]} />
                    </Menu.Item>
                    <Menu.Item>
                        <p>Sort order</p>
                        <Select options={[{ text: 'se', value: 123 }]} />
                    </Menu.Item>
                    <Menu.Item fitted="horizontally">
                        <p>Date range</p>
                        <Select options={[{ text: 'se', value: 123 }]} />
                        <p>From</p>
                        <DatePicker
                            className={s.minWidth}
                            dateFormat="YYYY-MM-DD"
                            onChange={date => this.setState({ from: date.format('YYYY-MM-DD') })}
                            selected={moment(this.state.from)}
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
                        <Select options={[{ text: 'se', value: 123 }]} />
                    </Menu.Item>
                    <Menu.Item>
                        <Button size="mini"><Icon name="backward" /></Button>
                    </Menu.Item>
                </Sidebar>
                    <Menu
                        borderless
                        className={s.noMarginTop}
                        color="teal"
                        inverted
                        size="huge"
                    >
                        <Menu.Menu widths={2}>
                            <Menu.Item header>
                                <Image size="mini" spaced="right" src={logo} />
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
                                <Icon name="setting" size="large" />
                            </Button>
                        </Menu.Menu>
                    </Menu>
                <Sidebar.Pusher
                    className={`${s.flex} ${s.flexGrow}`}
                    onClick={() => { if (showSidebar) toggle(); }}
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

interface IStateProps {
    showSidebar: boolean;
}

interface IDispatchProps {
    toggle: () => void;
}

interface IComponentState {
    from: string;
    to: string;
}

type IProps = IStateProps & IDispatchProps;
