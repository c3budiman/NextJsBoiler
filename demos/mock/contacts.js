import { Avatar } from 'antd';

export default [
  {
    name: 'Bobby Sullivan',
    status: 'Mollis Nullam',
    avatar: (
      <Avatar
        size={48}
        style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
      >
        B
      </Avatar>
    )
  },
  {
    name: 'Bryan Morgan',
    status: 'Risus Justo',
    avatar: <Avatar size={48} src="/images/face4.jpg" />
  },
  {
    name: 'Phillip Caroll',
    status: 'Mollis Nibh',
    avatar: (
      <Avatar
        size={48}
        style={{
          color: 'rgb(34, 245, 0)',
          backgroundColor: 'rgb(207, 253, 219)'
        }}
      >
        P
      </Avatar>
    )
  },
  {
    name: 'Brandon Boyd',
    status: 'Dolor Mattis',
    avatar: <Avatar size={48} src="/images/face1.jpg" />
  },
  {
    name: 'Laura Mason',
    status: 'Commodo Amet',
    avatar: <Avatar size={48} src="/images/face3.jpg" />
  },
  {
    name: 'Barbara Chapman',
    status: 'Tellus Sollicitudin',
    avatar: <Avatar size={48} src="/images/face2.jpg" />
  },
  {
    name: 'Doris Baker',
    status: 'Nibh Adipiscing',
    avatar: <Avatar size={48} src="/images/face1.jpg" />
  },
  {
    name: 'Doris Marshall',
    status: 'Tellus Sollicitudin',
    avatar: (
      <Avatar
        size={48}
        style={{
          color: 'rgb(143, 0, 245)',
          backgroundColor: 'rgb(214, 207, 253)'
        }}
      >
        D
      </Avatar>
    )
  },
  {
    name: 'Andrew Weber',
    status: 'Nibh Adipiscing',
    avatar: <Avatar size={48} src="/images/face4.jpg" />
  },
  {
    name: 'John Doe',
    status: 'Nibh Adipiscing',
    avatar: <Avatar size={48} src="/images/face5.jpg" />
  }
];
