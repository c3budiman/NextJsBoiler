import { Avatar, Badge, Layout, List, Menu, Dropdown } from "antd";
import { BellTwoTone } from '@ant-design/icons';
import DashHeader, { Notification } from "./styles/Header";

import Link from "next/link";
import MockNotifications from "../demos/mock/notifications.js";
import { useAppState } from "./shared/AppProvider";
import { useState } from "react";

const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = () => {
    const [state, dispatch] = useAppState();
    const [notifications] = useState(MockNotifications);

    const menuDesktop = (
        <>
            <Menu>
                <Link href="/">
                    <a style={{ color: "#000" }}>
                        <Menu.Item>Settings</Menu.Item>
                    </a>
                </Link>
            </Menu>
            <Menu>
                <Link href="/">
                    <a style={{ color: "#000" }}>
                        <Menu.Item>Profile</Menu.Item>
                    </a>
                </Link>
            </Menu>
            <Menu>
                <Link href="/">
                    <a style={{ color: "#000" }}>
                        <Menu.Item>Notification</Menu.Item>
                    </a>
                </Link>
            </Menu>
            <Menu.Divider />
            {/* <Menu>
                <Menu.Item>
                    <Link href="//one-readme.fusepx.com">
                        <a>Help?</a>
                    </Link>
                </Menu.Item>
            </Menu> */}
            <Menu>
                <Link href="/">
                    <a style={{ color: "#000" }}>
                        <Menu.Item>Signout</Menu.Item>
                    </a>
                </Link>
            </Menu>
        </>
    )
    return (
        <DashHeader>
            <Header>
                <Menu mode="horizontal">
                    {state.mobile && (
                        <Menu.Item>
                            <a
                                onClick={() => dispatch({ type: "mobileDrawer" })}
                                className="trigger"
                            >
                                <svg width="1em" height="1em" fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    viewBox="0 0 384.97 384.97" style={{ enableBackground: 'new 0 0 384.97 384.97' }} xmlSpace="preserve">
                                    <g id="Menu_1_">
                                        <path d="M12.03,120.303h360.909c6.641,0,12.03-5.39,12.03-12.03c0-6.641-5.39-12.03-12.03-12.03H12.03
                      c-6.641,0-12.03,5.39-12.03,12.03C0,114.913,5.39,120.303,12.03,120.303z"/>
                                        <path d="M372.939,180.455H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03
                      S379.58,180.455,372.939,180.455z"/>
                                        <path d="M372.939,264.667H132.333c-6.641,0-12.03,5.39-12.03,12.03c0,6.641,5.39,12.03,12.03,12.03h240.606
                      c6.641,0,12.03-5.39,12.03-12.03C384.97,270.056,379.58,264.667,372.939,264.667z"/>
                                    </g>
                                </svg>
                            </a>
                        </Menu.Item>
                    )}

                    {
                        !state.mobile && (
                            <div onClick={() => { dispatch({ type: 'collapse' }) }} className="pointer mx-4">
                                <img src="/images/icon/bars.svg" />
                            </div>
                        )
                    }

                    <span className="mr-auto" />

                    <Dropdown overlay={(menuDesktop)}>
                        <Avatar className="mx-4 my-auto" src="/images/cecep.jpg" />
                    </Dropdown>
                    {/* <SubMenu title={}>
                    </SubMenu> */}

                    <SubMenu
                        title={
                            <Badge count={5}>
                                <span className="submenu-title-wrapper">
                                    <BellTwoTone style={{ fontSize: '20px' }} />
                                </span>
                            </Badge>
                        }
                    >
                        <Menu.Item
                            className="p-0 bg-transparent"
                            style={{ height: "auto" }}
                        >
                            <List
                                className="header-notifications"
                                itemLayout="horizontal"
                                dataSource={notifications}
                                footer={<div>5 Notifications</div>}
                                renderItem={item => (
                                    <Notification>
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={item.avatar}
                                                title={<a href="/">{item.title}</a>}
                                                description={<small>{item.description}</small>}
                                            />
                                        </List.Item>
                                    </Notification>
                                )}
                            />
                        </Menu.Item>
                    </SubMenu>


                </Menu>
            </Header>
        </DashHeader>
    );
};

export default MainHeader;
