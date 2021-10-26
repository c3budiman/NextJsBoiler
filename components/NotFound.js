import AnimatedBG from './styles/AnimatedBG';
import HTTPStatus from 'http-status';
import { Row } from 'antd';
import styled from 'styled-components';

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;
  h1 {
    font-size: 10rem;
  }
`;

const NotFound = ({ code }) => {
  const title =
    code === 404
      ? 'This page could not be found'
      : HTTPStatus[code] || 'An unexpected error has occurred';

  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="bg-white text-center"
      style={{ minHeight: '100vh' }}
    >
      <AnimatedBG>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
          <span key={item} />
        ))}
      </AnimatedBG>

      <Content>
        <h1
          className={`${code === 404 ? 'text-warning' : 'text-error'} mb-0`}
          css={`
            font-weight: 900;
          `}
        >
          {code}
        </h1>
        <h6 className="mb-1 mt-1 text-body">{title} </h6>
      </Content>
    </Row>
  );
};

export default NotFound;
