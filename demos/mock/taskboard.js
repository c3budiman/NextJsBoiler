import format from 'date-fns/format';

function randomDate(start, end) {
  return format(
    new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    ),
    'MMM Do'
  );
}

export default {
  backlog: [
    {
      title: 'Responsive bug',
      description:
        'Nulla vitae elit libero, a pharetra augue. Maecenas faucibus mollis interdum. Donec id elit non mi porta gravida at eget metus.',
      color: 'error',

      images: [
        '/images/unsplash/12.jpg',
        '/images/unsplash/9.jpg'
      ]
    },
    {
      title: 'Travel checklist',
      description:
        'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'
    },
    {
      title: 'Budget review',
      description:
        'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
      color: 'success'
    }
  ],
  todo: [
    {
      title: 'QA Testing',
      description: 'Etiam porta sem malesuada magna mollis euismod.'
    },
    {
      title: 'Layout design',
      description:
        'Sed posuere consectetur est at lobortis. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.',
      color: 'error'
    },
    {
      title: 'Fix navigation menu',
      description: 'Donec sed odio dui.',
      color: 'info',

      images: ['/images/unsplash/1.jpg']
    },
    {
      title: 'Update bootstrap 4',
      description: 'Aenean lacinia bibendum nulla sed consectetur.'
    },
    {
      title: 'Run build tools',
      description:
        'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
      title: 'List article ideas',
      description:
        'Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.',
      color: 'success',

      images: ['/images/unsplash/5.jpg', '/images/unsplash/6.jpg']
    },
    {
      title: 'Reactjs fixes',
      description:
        'Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Vestibulum id ligula porta felis euismod semper.'
    },
    {
      title: 'Implement SSL',
      description:
        'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
      color: 'warning'
    },
    {
      title: 'Cleanup code',
      description: 'Sollicitudin',
      color: 'error'
    }
  ],
  'In Process': [
    {
      title: 'QOS Assessment',
      description:
        'Maecenas sed diam eget risus varius blandit sit amet non magna.'
    },
    {
      title: 'Schedule new tasks',
      description: 'Sed posuere consectetur est at lobortis.',
      color: 'warning'
    },
    {
      title: 'Add dashboard variants',
      description: 'Nulla vitae elit libero, a pharetra augue.'
    },
    {
      title: 'Extended color scheme support',
      description:
        'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.'
    },
    {
      title: 'Merge unit tests',
      description:
        'Maecenas sed diam eget risus varius blandit sit amet non magna.',
      color: 'info',

      images: [
        '/images/unsplash/16.jpg',
        '/images/unsplash/9.jpg'
      ]
    },
    {
      title: 'Test final version',
      description:
        'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
    }
  ],
  'Currently in progress': [
    {
      title: 'Integrate Angular 4',
      description: 'Nulla vitae elit libero, a pharetra augue.'
    },
    {
      title: 'Additional fields',
      description: 'Donec id elit non mi porta gravida at eget metus.'
    },
    {
      title: 'Draggable task board',
      description:
        'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vestibulum id ligula porta felis euismod semper.',
      color: 'error'
    },
    {
      title: 'Setup CI server',
      description: 'Maecenas faucibus mollis interdum.',

      images: [
        '/images/unsplash/10.jpg',
        '/images/unsplash/11.jpg'
      ]
    },
    {
      title: 'Assign new tasks',
      description: 'Nullam quis risus eget urna mollis ornare vel eu leo.',
      color: 'success'
    },
    {
      title: 'Contact administrator',
      description:
        'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.'
    },
    {
      title: 'Commit changes',
      description: 'Aenean lacinia bibendum nulla sed consectetur.',

      images: [
        '/images/unsplash/13.jpg',
        '/images/unsplash/14.jpg'
      ]
    }
  ],
  Complete: [
    {
      title: 'Store new files',
      description: 'Sed posuere consectetur est at lobortis.'
    },
    {
      title: 'Build landing page',
      description:
        'Maecenas sed diam eget risus varius blandit sit amet non magna.'
    },
    {
      title: 'Setup basic layout',
      description: 'Vestibulum id ligula porta felis euismod semper.',
      color: 'info',

      images: [
        '/images/unsplash/15.jpg',
        '/images/unsplash/16.jpg'
      ]
    },
    {
      title: 'Graphical fixes',
      description:
        'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.'
    },
    {
      title: 'Email alerts',
      description: 'Donec sed odio dui.'
    }
  ]
};
