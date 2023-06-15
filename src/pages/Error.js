import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Error = (props) => {
    const navigate = useNavigate();

    return (
        <div className="exception-body error">
            <div className="exception-topbar">
                <button id="logolink" onClick={() => navigate('/')} className="layout-topbar-logo p-link">
                    <img src={`assets/layout/images/logo-${props.colorScheme === 'dark' ? 'freya-white' : 'freya'}.svg`} alt="freya-layout" />
                </button>
            </div>
            <div className="exception-wrapper">
                <div className="exception-content">
                    <img src="assets/layout/images/pages/asset-error.svg" alt="freya-layout" />
                    <span>Error</span>
                </div>
                <div className="exception-footer">
                    <h4>freya</h4>
                    <h6>Copyright Ⓒ PrimeTek Informatics</h6>
                </div>
            </div>
        </div>
    );
};
