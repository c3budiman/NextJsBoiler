import { Avatar } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export default [
  {
    title: 'Vestibulum Fusce Purus',
    subtitle: 'A few seconds ago',
    avatar: (
      <Avatar
        size="small"
        style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        S
      </Avatar>
    ),
    body:
      'Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'
  },
  {
    title: 'Dapibus Parturient Lorem Etiam Quam',
    subtitle: '1 minute ago',
    avatar: <Avatar size="small" src="/images/face1.jpg" />,
    body:
      'Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit.'
  },
  {
    title: 'Ullamcorper Parturient Ridiculus',
    subtitle: '2 Hours ago',
    avatar: (
      <Avatar
        size="small"
        style={{
          color: 'rgb(34, 245, 0)',
          backgroundColor: 'rgb(207, 253, 219)'
        }}
      >
        S
      </Avatar>
    ),
    body:
      'Maecenas faucibus mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas faucibus mollis interdum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
  },
  {
    title: 'Fringilla Pellentesque Risus Tristique',
    subtitle: 'Yesterday',
    avatar: <Avatar size="small" src="/images/face2.jpg" />,
    body:
      'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'
  },
  {
    title: 'Inceptos Vulputate',
    subtitle: '4 Days ago',
    avatar: <Avatar size="small" src="/images/face3.jpg" />,
    body:
      'Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.'
  },
  {
    title: 'Inceptos Vulputate',
    subtitle: '4 Days ago',
    avatar: (
      <Avatar
        size="small"
        style={{
          color: 'rgb(143, 0, 245)',
          backgroundColor: 'rgb(214, 207, 253)'
        }}
      >
        S
      </Avatar>
    ),
    body: 'Sed posuere consectetur est at lobortis.'
  },
  {
    title: 'Create a services site'
  },
  {
    title: 'Solve initial network problems'
  },
  {
    title: 'Technical testing',
    avatar: <ClockCircleOutlined style={{ fontSize: '16px' }} />
  },
  {
    title: 'Network problems being solved'
  }
];
