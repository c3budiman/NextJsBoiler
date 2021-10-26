import { Button, Checkbox, Form, Input, Message, Row } from 'antd';
import { EyeTwoTone, MailTwoTone, PlaySquareTwoTone } from '@ant-design/icons';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { useAppState } from './shared/AppProvider';
import { ReplaceNavigateTo } from '../utils/helpers';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signin = ({ form }) => {
  const [state] = useAppState();
  return (<Row
    type="flex"
    align="middle"
    justify="center"
    className="px-3 bg-white mh-page"
    style={{ minHeight: '100vh' }}
  >
    <Content>
      <div className="text-center mb-5">
        <Link href="/signin">
          <a className="brand mr-0">
            <PlaySquareTwoTone style={{ fontSize: '32px' }} />
          </a>
        </Link>
        <h5 className="mb-0 mt-3">Sign in</h5>

        <p className="text-muted">get started with our service</p>
      </div>

      <Form
        layout="vertical"
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              Message.success(
                'Sign complete. Taking you to your dashboard!'
              ).then(() => ReplaceNavigateTo('/'));
            }
          });
        }}
      >
        <FormItem label="Email" name="email" rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}>
          <Input
            prefix={
              <MailTwoTone style={{ fontSize: '16px' }} />
            }
            type="email"
            placeholder="Email"
          />
        </FormItem>

        <FormItem label="Password" name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input
            prefix={
              <EyeTwoTone style={{ fontSize: '16px' }} />
            }
            type="password"
            placeholder="Password"
          />
        </FormItem>

        <FormItem name="remember" valuePropName="checked" initialValue={true}>
          <Checkbox>Remember me</Checkbox>
          <Link href="/forgot">
            <a className={`${state.direction === 'rtl' ? 'text-xs-left' : 'text-xs-right'}`}>
              <small>Forgot password</small>
            </a>
          </Link>
          <Button type="primary" htmlType="submit" block className="mt-3">
            Log in
          </Button>
        </FormItem>

        <div className="text-center">
          <small className="text-muted">
            <span>Don't have an account yet?</span>{' '}
            <Link href="/signup">
              <a>&nbsp;Create one now!</a>
            </Link>
          </small>
        </div>
      </Form>
    </Content>
  </Row>
  );
}

export default Signin;
