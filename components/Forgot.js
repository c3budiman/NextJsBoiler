import { Button, Form, Input, Message, Row } from 'antd';
import { MailTwoTone, PlaySquareTwoTone } from '@ant-design/icons';

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

const Forgot = ({ form }) => (
  <Row
    type="flex"
    align="middle"
    justify="center"
    className="px-3 bg-white"
    style={{ minHeight: '100vh' }}
  >
    <Content>
      <div className="text-center mb-5">
        <Link href="/forgot">
          <a className="brand mr-0">
            <PlaySquareTwoTone style={{ fontSize: '32px' }} />
          </a>
        </Link>
        <h5 className="mb-0 mt-3">Recover your password</h5>

        <p className="text-muted">receive password reset instructions.</p>
      </div>

      <Form
        layout="vertical"
        onSubmit={e => {
          e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              Message.success(
                'Reset email sent. Please check your inbox!'
              ).then(() => PushNavigateTo('/login'));
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

        <FormItem>
          <Button type="primary" htmlType="submit" block>
            Reset password
          </Button>
        </FormItem>

        <div className="text-center">
          <small className="text-muted text-center">
            <span>Don't have an account yet?</span>
            <Link href="/signup">
              <a>&nbsp;Create one now!</a>
            </Link>
          </small>
        </div>
      </Form>
    </Content>
  </Row>
);

export default Forgot;
