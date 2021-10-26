import { AlertTwoTone, BookTwoTone, BugTwoTone, CrownTwoTone } from '@ant-design/icons';

export default [
  {
    icon: <AlertTwoTone style={{fontSize: '64px'}} />,
    title: 'Standard Licence',
    subtitle: 'Test account',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 0,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '1 user'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <BugTwoTone style={{fontSize: '64px'}} />,
    title: 'Basic License',
    subtitle: 'Freelancer',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 2,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '2 users'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <BookTwoTone style={{fontSize: '64px'}} />,
    title: 'Managed License',
    subtitle: 'Small business',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 5,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '3 users'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <CrownTwoTone style={{fontSize: '64px'}} />,
    title: 'Extended License',
    subtitle: 'Corporate',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 10,
    features: [
      {
        title: 'Secure'
      },
      {
        title: 'Unlimited'
      },
      {
        title: 'Analytics'
      }
    ]
  }
];
