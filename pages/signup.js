import { Button, Menu, Form, Input, Row, notification, Spin, Col, Dropdown } from 'antd';

import styled from 'styled-components';
// import { useAppState } from './shared/AppProvider';
import { useAppState } from "../components/shared/AppProvider";
import { useState, useEffect } from "react";
import Head from "next/head";
import { PushNavigateTo } from '../utils/helpersBrowser';
import { handleSessions } from '../utils/helpers';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 200px;
  z-index: 2;
  min-width: 300px;
`;

const SignUp = ({ form, session }) => {
    const [state] = useAppState();
    const [loading, setLoading] = useState(false);
    const [passVisible, setPassVisible] = useState(false);
    const [confirmPassVisible, setConfirmPassVisible] = useState(false);

    const [formSignup] = Form.useForm();

    const [OptionFilter, setOptionFilter] = useState([
        'BAKTI',
        'PMU',
        'NMS',
        'Penyedia OM'
    ]);

    const [DrodpwnValue, setDrodpwnValue] = useState("");

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

    const handleSignUp = async (values) => {
        try {
            console.log(values)
            showSukses(JSON.stringify(values))
        } catch (error) {
            console.log(error)
        }
    }

    const menuDropdown = (
        <Menu>
            {
                OptionFilter.map((item, i) => {
                    return (
                        <Menu.Item key={i}>
                            <div onClick={
                                async () => {
                                    setDrodpwnValue(item)
                                    formSignup.setFieldsValue({
                                        organisasi: item,
                                    });
                                }
                            } className="dropdown-list">
                                {item}
                            </div>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    );

    return (
        <>
            <Head>
                <title>SignUp NMS</title>
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
                            <img height="100px" src="/images/logo/c4budiman.png" alt="Bakti Logo" />
                        </div>


                        <Form
                            layout="vertical"
                            form={formSignup}
                            onFinish={handleSignUp}
                        >
                            <FormItem
                                name="nama"
                                style={{ marginBottom: '12px' }}
                                rules={[{ required: true, message: 'Harap Lengkapi nama!' }]}>
                                <Input
                                    type="text"
                                    placeholder="Nama"
                                />

                            </FormItem>

                            <FormItem name="email"
                                style={{ marginBottom: '12px' }}
                                rules={[
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
                                    type="email"
                                    placeholder="Email"
                                />
                            </FormItem>

                            <FormItem
                                name="phone"
                                style={{ marginBottom: '12px' }}
                                rules={[
                                    {
                                        pattern: /^(\+62|62|0)8[1-9][0-9]{6,9}$/gm,
                                        message: 'Format nomor telepon salah!'
                                    },
                                    { required: true, message: 'Harap Lengkapi telepon!' }
                                ]}>
                                <Input
                                    type="tel"
                                    placeholder="Nomor Telpon"
                                />

                            </FormItem>

                            {/* dropdown here */}
                            <FormItem
                                name="organisasi"
                                initialValue={DrodpwnValue}
                                rules={[
                                    { required: true, message: 'harap pilih organisasi!' },
                                ]}
                                style={{ marginBottom: "12px" }}>
                                <Dropdown overlay={menuDropdown}>
                                    <div className="dropdownFilterWhite">
                                        <p style={{ margin: '0' }}>{DrodpwnValue ? DrodpwnValue : "Organisasi"}</p>
                                        <img src="/images/icon/arrow-down-blue.svg" alt="ardown" />
                                    </div>
                                </Dropdown>
                            </FormItem>

                            <FormItem
                                style={{ marginBottom: "12px" }}
                                name="password"
                                rules={[
                                    {
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/gm,
                                        message: 'password harus terdapat 1 huruf besar, 1 huruf kecil, 1 special character dan minimal 8 karakter!'
                                    },
                                    { required: true, message: 'Please input your Password!' }
                                ]}>
                                <Input
                                    type={passVisible ? "text" : "password"}
                                    placeholder="Password"
                                    suffix={<img onClick={() => { setPassVisible(!passVisible) }} className="pointer" src="/images/icon/login/eye.svg" alt="eye" />}
                                />
                            </FormItem>

                            <FormItem
                                style={{ marginBottom: "12px" }}
                                name="passwordConfirmation"
                                dependencies={['password']}
                                rules={[
                                    { required: true, message: 'Please input your Password!' },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('password tidak sama!');
                                        },
                                    }),
                                ]}>
                                <Input
                                    type={confirmPassVisible ? "text" : "password"}
                                    placeholder="Ulangi Password"
                                    suffix={<img onClick={() => { setConfirmPassVisible(!confirmPassVisible) }} className="pointer" src="/images/icon/login/eye.svg" alt="eye" />}
                                />
                            </FormItem>

                            <FormItem name="remember" valuePropName="checked" initialValue={true}>
                                <Row gutter={[20, 20]}>
                                    <Col xs={12} sm={12} md={12} lg={12} >
                                        <Button onClick={() => { PushNavigateTo('/login') }} type="primary" htmlType="button" block style={{ color: "#33539E", background: "transparent", border: "none", boxShadow: "none", fontSize: "12px", fontWeight: "bold" }}>
                                            Login
                                        </Button>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} >
                                        <Button style={{ background: "#33539E", borderColor: "#33539E", borderRadius: "20px" }} type="primary" htmlType="submit" block className="colorWhite">
                                            Register
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

export default SignUp;
