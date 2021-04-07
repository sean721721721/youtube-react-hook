import React from 'react';
import './SideBarFooter.scss';

const SideBarFooter = () => {
    return (
        <React.Fragment>
            <div className="footer-block">
                <div>About Press Copyright</div>
                <div>Creators Advertise</div>
                <div>Developers +MyTube</div>
                <div>Legal</div>
            </div>
            <div className="footer-block">
                <div>Terms Privacy</div>
                <div>Policy & Safety</div>
                <div>Test new features</div>
            </div>
            
        </React.Fragment>
    )
}

export default SideBarFooter;