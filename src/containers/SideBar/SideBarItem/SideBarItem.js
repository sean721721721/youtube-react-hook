import React from 'react';
import {Icon, Menu} from 'semantic-ui-react';
import './SideBarItem.scss';
import {Link, withRouter} from 'react-router-dom';

const SideBarItem = (props) => {
    const highlight = shouldHighlighted() ? 'highlight-item' : null;

    function shouldHighlighted() {
        const {pathname} = props.location;
        if (props.path === '/') {
            return pathname === props.path;
        }
        return pathname.includes(props.path);
    }

    return (
        <Link to={{pathname: props.path}}>
            <Menu.Item className={['sidebar-item', highlight].join(' ')}>
                <div className='sidebar-item-alignment-container'>
                    <span><Icon size='large' name={props.icon}/></span>
                    <span>{props.label}</span>
                </div>
            </Menu.Item>
        </Link>
    )
}

export default withRouter(SideBarItem);