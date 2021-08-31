/* eslint-disable no-unused-vars */
import { Container, Inner } from "./styles/Page";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";

import Header from "./Header";
import SidebarMenu from "./SidebarMenu.js";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/GlobalStyles";
import { useAppState } from "./shared/AppProvider";
import { withRouter } from "next/router";
import axios from "axios";
const { Content } = Layout;

// klo lu ga pengen pake dashboard, tambahkan route yang diinginkan disini :
const NonDashboardRoutes = [
    "/",
    "/signup",
    "/forgot",
    "/lockscreen",
    "/_error",
    '/examples',
    '/examples/login',
    '/examples/s3',
    '/examples/spa',
    '/examples/ssr',
    '/examples/ssg',
];

const Page = ({ router, children }) => {
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useAppState();
    const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

    // useEffect(() => {
    //     // checkSession(router.pathname).then(data => setState(data));
    //     // axios.get(url, { params, headers });
    //     // checking session
    //     // setLoading(true)
    //     // dispatch({ type: "showLoading" });
    //     axios.get('/api/getSession')
    //         .then(function (response) {
    //             // handle success
    //             // console.log(response.data);
    //             if (router.pathname == "/login") {
    //                 if (response.data.code == 0) {
    //                     window.location.href = "/"
    //                 }
    //             } else {
    //                 if (response.data.code != 0) {
    //                     // router.push("/login?code=2")
    //                     window.location.href = "/login?code=2"
    //                 }
    //             }
    //             setLoading(false)
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             setLoading(false)
    //             console.log(error);
    //         });
    // }, []);

    return (
        <Spin tip="Memuat..." size="large" spinning={state.loading || loading}>
            <ThemeProvider theme={theme}>
                <Container
                    className={`${state.weakColor ? "weakColor" : ""} ${state.boxed ? "boxed shadow-sm" : ""
                        }`}
                >

                    <Layout className="workspace">
                        {!isNotDashboard && (
                            <SidebarMenu
                                sidebarTheme={state.darkSidebar ? "dark" : "light"}
                                sidebarMode={state.sidebarPopup ? "vertical" : "inline"}
                                sidebarIcons={state.sidebarIcons}
                                collapsed={state.collapsed}
                            />
                        )}

                        <Layout>
                            <Content>
                                {!isNotDashboard && <Header />}
                                {!isNotDashboard ? <Inner>{children}</Inner> : children}
                            </Content>
                        </Layout>
                    </Layout>

                </Container>
            </ThemeProvider>
        </Spin>
    );
};

export default withRouter(Page);