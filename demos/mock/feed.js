import { Avatar } from 'antd';

export default [
  {
    from: 'Ali Connors',
    message: 'Dapibus Tellus',
    avatar: (
      <Avatar size={48} alt="Ali Connors" src="/images/face3.jpg" />
    ),
    subject: 'Quam Amet Vehicula'
  },
  {
    from: 'Trevor Hansen',
    message: 'Sit Malesuada',
    subject: 'Sem Adipiscing Tristique'
  },
  {
    from: 'Sandra Adams',
    message: 'Adipiscing Mattis',
    avatar: (
      <Avatar size={48} alt="Sandra Adams" src="/images/face4.jpg" />
    ),
    subject: 'Ullamcorper Bibendum Ligula'
  },
  {
    from: 'Jeff Jones',
    message: 'Consectetur Dolor',
    avatar: (
      <Avatar size={48} aria-label="Post">
        J
      </Avatar>
    ),
    subject: 'Ullamcorper Bibendum Ligula'
  }
];
