import { Avatar, Button, Card, Carousel, Col, Row } from 'antd';
import { MessageOutlined, PhoneOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cover = styled.div`
  position: relative;
  width: 100%;
  .ant-carousel {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .slick-slider {
    width: 100%;
    height: 100%;
  }
  .slick-slide > div {
    display: flex;
  }
  .image {
    position: relative;
    background-size: cover;
    background-position: top center;
    width: 100%;
  }
  .weakColor & .image {
    -webkit-filter: invert(100%);
    filter: invert(100%);
  }
  .content {
    position: relative;
    z-index: 9;
  }
`;

const Picture = styled.div`
  position: relative;
  .message,
  .phone {
    position: absolute;
    top: 60%;
    margin-top: -8px;
    z-index: 1;
  }
  .message {
    left: -8px;
  }
  .phone {
    right: -8px;
  }
`;

const ProfileCard = ({
  name,
  avatar,
  imageHeight,
  location,
  stats,
  images,
  callHandler,
  messageHandler
}) => {
  return (
    <Card
      className="mb-4"
      cover={
        <Cover style={{ height: imageHeight }}>
          <Carousel
            autoplay
            autoplaySpeed={6000}
            className="rounded-top overflow-hidden"
          >
            {images.map((image, index) => (
              <div key={index}>
                <div
                  className="image"
                  css={`
                    background-image: url(${image});
                    height: ${imageHeight}px;
                  `}
                />
              </div>
            ))}
          </Carousel>
          <div className="content text-center p-4">
            <Row
              type="flex"
              align="middle"
              justify="space-around"
              className="mb-4"
            >
              <Picture>
                <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  onClick={messageHandler}
                  className="message"
                >
                  <MessageOutlined style={{fontSize: '16px'}} />
                </Button>

                <Avatar alt={name} src={avatar} size={128} className="shadow" />

                <Button
                  shape="circle"
                  type="primary"
                  size="large"
                  onClick={callHandler}
                  className="phone"
                >
                  <PhoneOutlined style={{fontSize: '16px'}} />
                </Button>
              </Picture>
            </Row>
            <h5 className="mb-0 text-white">{name}</h5>
            <small className="text-white">{location}</small>
          </div>
        </Cover>
      }
    >
      <Row type="flex" align="middle" justify="space-around">
        {stats.map((stat, index) => (
          <Col className="text-center" key={index}>
            <h5 className="mb-0">{stat.value}</h5>
            <small>{stat.title}</small>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

ProfileCard.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  imageHeight: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.number
    })
  ).isRequired
};

export default ProfileCard;
