import { Button, Card } from 'antd';

import PropTypes from 'prop-types';
import TimelineStyled from '../styles/Timeline';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const Timeline = ({ title, timeline }) => (
  <TimelineStyled>
    {title && (
      <div
        className="text-center clearfix mb-4"
        css={`
          position: relative;
          clear: both;
        `}
      >
        <Button type="primary">{title}</Button>
      </div>
    )}
    {timeline.map((item, index) => (
      <section
        key={index}
        className="clearfix my-4"
        css={`
          position: relative;
          clear: both;
        `}
      >
        <span className={`icon ${index % 2 ? 'icon-odd' : 'icon-even'}`} />
        <small
          className={`date text-muted ${index % 2 ? 'date-odd' : 'date-even'}`}
        >
          {formatDistanceToNow(item.date)}
        </small>
        <section className={`content ${index % 2 ? 'right' : 'left'}`}>
          <Card
            bordered={false}
            className={`body shadow-sm ${index % 2 ? 'left' : 'right'}`}
          >
            {item.text}
          </Card>
        </section>
      </section>
    ))}
  </TimelineStyled>
);

Timeline.prototypes = {
  title: PropTypes.string,
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string
    })
  )
};

export default Timeline;
