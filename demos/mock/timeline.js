const date = Date.now();

export default [
  {
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit. Maecenas faucibus mollis interdum.',
    date: date
  },
  {
    text:
      'Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    date: new Date(date - 1000 * 60 * 20)
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: new Date(date - 1000 * 60 * 43)
  },
  {
    text: '3 more people joined your campaign.',
    date: new Date(date - 1000 * 60 * 55)
  },
  {
    text: 'Six new friend requests',
    date: new Date(date - 1000 * 60 * 60)
  },

  {
    text: 'Curabitur blandit tempus porttitor.',
    date: new Date(date - 1000 * 60 * 60)
  },
  {
    text:
      'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh.',
    date: new Date(date - 1000 * 60 * 60 * 24)
  },
  {
    text:
      'Nulla vitae elit libero, a pharetra augue. Cum sociis natoque penatibus.',
    date: new Date(date - 1000 * 60 * 60 * 24 * 2)
  },
  {
    text: 'Vestibulum id ligula porta felis euismod semper.',
    date: new Date(date - 1000 * 60 * 60 * 24 * 31)
  }
];
