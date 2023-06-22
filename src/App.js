import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppConfig from './AppConfig';
import AppRightPanel from './AppRightPanel';
import Dashboard from './components/Dashboard';
import FormLayoutDemo from './components/FormLayoutDemo';
import InputDemo from './components/InputDemo';
import FloatLabelDemo from './components/FloatLabelDemo';
import InvalidStateDemo from './components/InvalidStateDemo';
import ButtonDemo from './components/ButtonDemo';
import TableDemo from './components/TableDemo';
import ListDemo from './components/ListDemo';
import TreeDemo from './components/TreeDemo';
import PanelDemo from './components/PanelDemo';
import OverlayDemo from './components/OverlayDemo';
import MediaDemo from './components/MediaDemo';
import MenuDemo from './components/MenuDemo';
import MessagesDemo from './components/MessagesDemo';
import FileDemo from './components/FileDemo';
import ChartDemo from './components/ChartDemo';
import MiscDemo from './components/MiscDemo';
import Documentation from './components/Documentation';
import IconsDemo from './utilities/IconsDemo';
import CrudDemo from './pages/CrudDemo';
import CalendarDemo from './pages/CalendarDemo';
import TimelineDemo from './pages/TimelineDemo';
import Invoice from './pages/Invoice';
import Help from './pages/Help';
import EmptyPage from './pages/EmptyPage';
import BlocksDemo from './components/BlocksDemo';
import Country from './pages/Countries';

import TopDestinations from './gassiholidays/tours/topDestinations';
import TourDestinations from './gassiholidays/tours/destinations';
import TourTransports from './gassiholidays/tours/transports';
import TourHolidays from './gassiholidays/tours/holidays';
import TourAttributes from './gassiholidays/tours/attributes';
import TourFacilities from './gassiholidays/tours/facilities';
import Tours from './gassiholidays/tours/tours';
import Articles from './gassiholidays/tours/articles';
import MainSlideTours from './gassiholidays/tours/MainSlideTours';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = (props) => {
    const [resetActiveIndex, setResetActiveIndex] = useState(null);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [sidebarStatic, setSidebarStatic] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('sidebar');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('filled');
    const [ripple, setRipple] = useState(false);
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [colorScheme, setColorScheme] = useState('light');
    const [topbarScheme, setTopbarScheme] = useState('light');
    const [menuScheme, setMenuScheme] = useState('light');
    const [themeScheme, setThemeScheme] = useState('light');
    const [theme, setTheme] = useState('purple');
    const [searchActive, setSearchActive] = useState(false);
    const [topbarUserMenuActive, setTopbarUserMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    const menu = [
        {
            label: 'GassiHolidays',
            icon: 'pi pi-home',
            to: '/gassiholidays',
            items: [
                {
                    label: 'Dictionaries',
                    icon: 'pi pi-book',
                    items: [
                        {
                            label: 'Destinations (Top)',
                            icon: 'pi pi-globe',
                            to: '/topdestinations'
                        },
                        {
                            label: 'Destinations',
                            icon: 'pi pi-map-marker',
                            to: '/destinations'
                        },
                        {
                            label: 'Attributes',
                            icon: 'pi pi-link',
                            to: '/attributes'
                        },
                        {
                            label: 'Holidays',
                            icon: 'pi pi-calendar',
                            to: '/holidays'
                        },
                        {
                            label: 'Transports',
                            icon: 'pi pi-car',
                            to: '/transports'
                        },
                        {
                            label: 'Facilities',
                            icon: 'pi pi-sort-alt',
                            to: '/facilities'
                        }
                    ]
                },
                {
                    label: 'Tours',
                    icon: 'pi pi-th-large',
                    to: '/tours',
                    items: [
                        {
                            label: 'Tours',
                            icon: 'pi pi-th-large',
                            to: '/tours'
                        },
                        {
                            label: 'Main page slide',
                            icon: 'pi pi-code',
                            to: '/mainpageslide'
                        }
                    ]
                },
                {
                    label: 'Articles',
                    icon: 'pi pi-clone',
                    to: '/articles'
                }
            ]
        }
    ];

    let menuClick;
    let rightPanelClick;
    let configClick;
    let searchClick;
    let topbarUserMenuClick;

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    useEffect(() => {
        if (staticMenuMobileActive) {
            blockBodyScroll();
        } else {
            unblockBodyScroll();
        }
    }, [staticMenuMobileActive]);

    useEffect(() => {
        setResetActiveIndex(true);
        setMenuActive(false);
    }, [menuMode]);

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setResetActiveIndex(true);
            hideOverlayMenu();
        }
        if (!event.item.items && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }
    };

    const onMenuClick = (event) => {
        if (menuActive && event.target.className === 'layout-menu-container') {
            setResetActiveIndex(true);
            setMenuActive(false);
        }
        menuClick = true;
    };

    const onMenuModeChange = (menuMode) => {
        setMenuMode(menuMode);
        if (menuMode === 'sidebar') {
            if (sidebarStatic) {
                setSidebarActive(true);
            }
        } else {
            setSidebarActive(false);
            if (topbarScheme !== menuScheme) {
                setMenuScheme(topbarScheme);
            }
        }
        if (topbarScheme === 'dark') {
            setThemeScheme('dark');
        }
    };

    const onColorSchemeChange = (scheme) => {
        setColorScheme(scheme);
        props.setColorScheme(scheme);
    };

    const onThemeSchemeChange = (scheme) => {
        setThemeScheme(scheme);
        setMenuScheme(scheme);
        setTopbarScheme(scheme);
    };

    const onTopbarSchemeChange = (scheme) => {
        setTopbarScheme(scheme);
    };

    const onMenuSchemeChange = (scheme) => {
        setMenuScheme(scheme);
    };

    const onThemeChange = (themeColor) => {
        setTheme(themeColor);
    };

    const blockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    };

    const unblockBodyScroll = () => {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarUserMenuActive(false);
        setRightPanelActive(false);

        if (isMobile()) {
            setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
            if (staticMenuMobileActive) {
                blockBodyScroll();
            } else {
                unblockBodyScroll();
            }
        }
        event.preventDefault();
    };

    const isMobile = () => {
        return window.innerWidth <= 991;
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const hideOverlayMenu = () => {
        setStaticMenuMobileActive(false);
        unblockBodyScroll();
    };

    const onRightPanelClick = () => {
        rightPanelClick = true;
    };

    const onRightPanelButtonClick = () => {
        setRightPanelActive((prevState) => !prevState);
        rightPanelClick = true;
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const onTopbarSearchToggle = () => {
        setSearchActive((prevState) => !prevState);
        searchClick = true;
    };

    const onTopbarSearchClick = () => {
        searchClick = true;
    };

    const onTopbarUserMenuClick = () => {
        setTopbarUserMenuActive((prevState) => !prevState);
        topbarUserMenuClick = true;
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onDocumentClick = () => {
        if (!searchClick && searchActive) {
            setSearchActive(false);
            searchClick = false;
        }

        if (!topbarUserMenuClick && topbarUserMenuActive) {
            setTopbarUserMenuActive(false);
            topbarUserMenuClick = false;
        }

        if (!rightPanelClick && rightPanelActive) {
            setRightPanelActive(false);
        }

        if (!configClick && configActive) {
            setConfigActive(false);
        }

        if (!menuClick) {
            if (isSlim() || isHorizontal()) {
                setResetActiveIndex(true);
                setMenuActive(false);
            }

            if (staticMenuMobileActive) {
                hideOverlayMenu();
            }

            unblockBodyScroll();
        }

        searchClick = false;
        topbarUserMenuClick = false;
        rightPanelClick = false;
        configClick = false;
        menuClick = false;
    };

    const onSidebarMouseOver = () => {
        setSidebarActive(!isMobile());
    };

    const onSidebarMouseLeave = () => {
        setSidebarActive(false);
    };

    const onToggleMenu = (event) => {
        menuClick = true;
        setSidebarStatic((prevState) => !prevState);

        event.preventDefault();
    };

    const onRootMenuItemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const layoutClassName = classNames(
        'layout-wrapper',
        {
            'layout-sidebar': menuMode === 'sidebar',
            'layout-static': menuMode === 'sidebar' && sidebarStatic,
            'layout-horizontal': menuMode === 'horizontal',
            'layout-rightpanel-active': rightPanelActive,
            'layout-slim': menuMode === 'slim',
            'layout-mobile-active': staticMenuMobileActive,
            'p-input-filled': inputStyle === 'filled',
            'p-ripple-disabled': !ripple
        },
        'layout-menu-' + menuScheme + ' layout-topbar-' + topbarScheme
    );

    return (
        <div className={layoutClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar
                topbarScheme={topbarScheme}
                onRightPanelButtonClick={onRightPanelButtonClick}
                searchActive={searchActive}
                onTopbarSearchToggle={onTopbarSearchToggle}
                onTopbarSearchClick={onTopbarSearchClick}
                topbarUserMenuActive={topbarUserMenuActive}
                onTopbarUserMenuClick={onTopbarUserMenuClick}
                menu={menu}
                menuActive={menuActive}
                onRootMenuItemClick={onRootMenuItemClick}
                mobileMenuActive={staticMenuMobileActive}
                onMenuItemClick={onMenuItemClick}
                menuMode={menuMode}
                sidebarStatic={sidebarStatic}
                sidebarActive={sidebarActive}
                onSidebarMouseOver={onSidebarMouseOver}
                onSidebarMouseLeave={onSidebarMouseLeave}
                onToggleMenu={onToggleMenu}
                onMenuButtonClick={onMenuButtonClick}
                resetActiveIndex={resetActiveIndex}
                onMenuClick={onMenuClick}
            />

            <AppRightPanel onRightPanelClick={onRightPanelClick} />

            <AppConfig
                configActive={configActive}
                onConfigButtonClick={onConfigButtonClick}
                onConfigClick={onConfigClick}
                menuMode={menuMode}
                onMenuModeChange={onMenuModeChange}
                ripple={ripple}
                onRippleChange={onRippleChange}
                inputStyle={inputStyle}
                onInputStyleChange={onInputStyleChange}
                colorScheme={colorScheme}
                onColorSchemeChange={onColorSchemeChange}
                topbarScheme={topbarScheme}
                onTopbarSchemeChange={onTopbarSchemeChange}
                menuScheme={menuScheme}
                onMenuSchemeChange={onMenuSchemeChange}
                themeScheme={themeScheme}
                onThemeSchemeChange={onThemeSchemeChange}
                theme={theme}
                onThemeChange={onThemeChange}
            />

            <div className="layout-main">
                <div className="layout-content">
                    <Routes>
                        <Route path="/" exact="true" element={<Dashboard />} />
                        <Route path="/topdestinations" element={<TopDestinations />} />
                        <Route path="/destinations" element={<TourDestinations />} />
                        <Route path="/transports" element={<TourTransports />} />
                        <Route path="/holidays" element={<TourHolidays />} />
                        <Route path="/attributes" element={<TourAttributes />} />
                        <Route path="/facilities" element={<TourFacilities />} />
                        <Route path="/tours" element={<Tours />} />
                        <Route path="/mainpageslide" element={<MainSlideTours />} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/dictionaries/countries" element={<Country />} />
                        <Route path="/start/documentation" element={<Documentation />} />
                        <Route path="/uikit/formlayout" element={<FormLayoutDemo />} />
                        <Route path="/uikit/floatlabel" element={<FloatLabelDemo />} />
                        <Route path="/uikit/input" element={<InputDemo />} />
                        <Route path="/uikit/invalidstate" element={<InvalidStateDemo />} />
                        <Route path="/uikit/button" element={<ButtonDemo />} />
                        <Route path="/uikit/table" element={<TableDemo />} />
                        <Route path="/uikit/list" element={<ListDemo />} />
                        <Route path="/uikit/tree" element={<TreeDemo />} />
                        <Route path="/uikit/panel" element={<PanelDemo />} />
                        <Route path="/uikit/overlay" element={<OverlayDemo />} />
                        <Route path="/uikit/menu/*" element={<MenuDemo />} />
                        <Route path="/uikit/message" element={<MessagesDemo />} />
                        <Route path="/uikit/media" element={<MediaDemo />} />
                        <Route path="/uikit/file" element={<FileDemo />} />
                        <Route path="/uikit/chart" element={<ChartDemo colorMode={colorScheme} location={location} />} />
                        <Route path="/uikit/misc" element={<MiscDemo />} />
                        <Route path="/utilities/icons" element={<IconsDemo />} />
                        <Route path="/pages/crud" element={<CrudDemo />} />
                        <Route path="/pages/calendar" element={<CalendarDemo />} />
                        <Route path="/pages/help" element={<Help colorScheme={colorScheme} />} location={location} />
                        <Route path="/pages/invoice" element={<Invoice />} />
                        <Route path="/pages/empty" element={<EmptyPage />} />
                        <Route path="/pages/timeline" element={<TimelineDemo />} />
                        <Route path="/uiblocks/blocks" element={<BlocksDemo />} />
                    </Routes>
                </div>

                {/* <AppFooter /> */}
            </div>

            <div className="layout-mask modal-in"></div>
        </div>
    );
};

export default App;
