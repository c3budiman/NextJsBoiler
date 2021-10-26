import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: auto;
  max-height: 100vh;
  max-height: -webkit-fill-available;
  background-color: #f7f8fc;
  &.boxed {
    overflow: hidden;
    margin-right: auto;
    margin-left: auto;
  }
  @media (min-width: 992px) {
    &.boxed {
      max-width: 95%;
    }
  }
  .workspace {
    height: ${props => `calc(100vh - ${props.theme.layoutHeaderHeight})`};
    max-height: -webkit-fill-available;
    width: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    max-width: 100%;
    flex-grow: 1;
    flex-direction: row;
  }
  .workspace > .ant-layout {
    overflow-x: hidden;
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
  background-color: #f7f8fc;
  min-height: ${props => `calc(100vh - ${props.theme.layoutHeaderHeight})`};
`;

export { Container, Inner };
