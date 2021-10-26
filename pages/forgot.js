import { Button, Form, Input, Row, notification, Spin, Col } from 'antd';

import styled from 'styled-components';
// import { useAppState } from './shared/AppProvider';
import { useAppState } from "../components/shared/AppProvider";
import { useState, useEffect } from "react";
import Head from "next/head";
import { PushNavigateTo } from '../utils/helpersBrowser';
import { handleSessions } from '../utils/helpers';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Forgot = ({ form, session }) => {
    const [state] = useAppState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (session?.code == 0) {
            PushNavigateTo('/')
        }
    }, [])

    function showError(msg) {
        notification["error"]({
            message: "Error!",
            description: msg,
        });
    }
    function showSukses(msg) {
        notification["success"]({
            message: "Sukses!",
            description: msg,
        });
    }

    const handleLogin = async (values) => {
        setLoading(true)
        if (values.email == "") {
            showError("Email tidak boleh kosong!!")
        }
    }

    return (
        <>
            <Head>
                <title>Forgot Password Page</title>
                <link rel="stylesheet" href="/css/login.css" />
            </Head>

            <Spin tip="Memuat..." size="large" spinning={loading}>
                <Row
                    type="flex"
                    align="middle"
                    justify="center"
                    className={state.mobile ? "mh-page withbg-jon-mobile" : "mh-page withbg-jon"}
                    style={{ minHeight: '100vh' }}
                >
                    <Content>
                        <div className="text-center mb-5">
                            <img src="/images/logo/c4budiman.png" height="100px" alt="Dtn Logo" />
                        </div>


                        <Form
                            layout="vertical"
                            onFinish={handleLogin}
                        >
                            <FormItem name="email" rules={[
                                {
                                    type: 'email',
                                    message: 'Format email salah!'
                                },
                                {
                                    required: true,
                                    message: 'Email tidak boleh kosong!'
                                }
                            ]}>
                                <Input
                                    prefix={
                                        <img src="/images/icon/login/mail.svg" alt="mail" />
                                    }
                                    type="email"
                                    placeholder="Email"
                                />
                            </FormItem>

                            <FormItem name="remember" valuePropName="checked" initialValue={true}>
                                <Row gutter={[20, 20]}>
                                    <Col xs={12} sm={12} md={12} lg={12} >
                                        <Button onClick={() => { PushNavigateTo('/login') }} type="primary" htmlType="button" block style={{ color: "#33539E", background: "transparent", border: "none", boxShadow: "none", fontSize: "12px", fontWeight: "bold" }}>
                                            Log in
                                        </Button>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} >
                                        <Button style={{ background: "#33539E", borderColor: "#33539E", borderRadius: "20px" }} type="primary" htmlType="submit" block className="colorWhite">
                                            Reset Password
                                        </Button>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Form>
                    </Content>
                </Row>
            </Spin>
        </>
    );
}

export async function getServerSideProps(context) {
    let checkSessions = await handleSessions(context, false);
    return checkSessions;
}

export default Forgot;
