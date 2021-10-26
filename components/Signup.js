import { Button, Form, Input, Message, Row, Tooltip } from 'antd';
import { EyeTwoTone, MailTwoTone, PlaySquareTwoTone, QuestionCircleTwoTone, SkinTwoTone } from '@ant-design/icons';

import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';
import { PushNavigateTo } from '../utils/helpersBrowser';

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
`;

const Signup = ({ form }) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="px-3 bg-white"
    style={{ minHeight: '100vh' }}
  >
    <Content>
      <div className="text-center mb-5">
        <Link href="/signup">
          <a className="brand mr-0">
            <PlaySquareTwoTone style={{ fontSize: '32px' }} />
          </a>
        </Link>
        <h5 className="mb-0 mt-3">Sign up</h5>

        <p className="text-muted">create a new account</p>
      </div>

      <Form
        layout="vertical"
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              Message.success('Account created. Please check your inbox!').then(
                () => PushNavigateTo('/signin')
              );
            }
          });
        }}
      >
        <FormItem
          label={
            <span>
              Nickname&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleTwoTone style={{ fontSize: '16px' }} />
              </Tooltip>
            </span>
          }
          name="nickname"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
              whitespace: true
            }
          ]}
        >
          <Input
            prefix={
              <SkinTwoTone style={{ fontSize: '16px' }} />
            }
            placeholder="Nickname"
          />
        </FormItem>

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

        <FormItem label="Confirm password" name="confirm" rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          {
            validator: (rule, value, callback) => {
              if (value && value !== form.getFieldValue('password')) {
                callback("Passwords don't match!");
              } else {
                callback();
              }
            }
          }
        ]}>
          <Input
            prefix={
              <EyeTwoTone style={{ fontSize: '16px' }} />
            }
            type="password"
            placeholder="Confirm password"
          />
        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" block>
            Sign up
          </Button>
        </FormItem>

        <div className="text-center">
          <small className="text-muted">
            <span>Already have an account?</span>{' '}
            <Link href="/signin">
              <a>&nbsp;Login Now!</a>
            </Link>
          </small>
        </div>
      </Form>
    </Content>
  </Row>
);

export default Signup;
