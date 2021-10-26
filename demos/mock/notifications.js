import { Avatar } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

export default [
  {
    title: 'John Doe launched a new application',
    description: '1 hour ago',
    avatar: (
      <Avatar
        size="large"
        style={{
          color: 'rgb(34, 245, 0)',
          backgroundColor: 'rgb(207, 253, 219)'
        }}
        icon={<MessageOutlined style={{ fontSize: '24px' }} />}
      >

      </Avatar>
    )
  },
  {
    title: 'Removed calendar from application list',
    description: '1 hour ago',
    avatar: <Avatar size="large" src="/images/face1.jpg" />
  },
  {
    title: 'Jack Hunt has joined your mailing list',
    description: '1 hour ago',
    avatar: <Avatar size="large" src="/images/avatar.jpg" />
  },
  {
    title: 'John Doe created a new task list',
    description: '1 hour ago',
    avatar: (
      <Avatar
        size="large"
        style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        D
      </Avatar>
    )
  },
  {
    title: 'John Doe sent you a friend request',
    description: '2 hours ago',
    avatar: <Avatar size="large" src="/images/face5.jpg" />
  }
];
