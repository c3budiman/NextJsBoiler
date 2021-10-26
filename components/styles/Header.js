import styled from "styled-components";

const DashHeader = styled.div`
  .ant-layout-header {
    position: relative;
    flex-direction: row;
    flex-wrap: nowrap;
    display: flex;
    align-items: center;
    min-height: 60px;
    z-index: 11;
    padding: 0 .3rem;
    background: #fff;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.02), 0 1px 0 rgba(0, 0, 0, 0.02);
  }
  .trigger {
    transform: rotate(90deg);
  }
  .menu-divider {
    position: relative;
  }
  .menu-divider:before {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 1px;
    height: 100%;
    content: "";
    background-color: #f9f9f9;
  }
  .brand {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    white-space: nowrap;
    margin: 0;
  }
  .brand > svg {
    fill: ${props => props.theme.primaryColor};
  }
  .ant-menu {
    width: 100%;
    display: flex;
    font-family: inherit;
    line-height: 36px;
    box-shadow: none;
    border: 0;
    margin-bottom: 1px;
  }
  .ant-menu-horizontal {
    line-height: inherit;
  }
  .ant-menu-item,
  .ant-menu-item,
  .ant-menu-submenu-title {
    padding: 0 1rem;
  }
  .ant-menu-item,
  .ant-menu-submenu {
    top: 2px;
  }
  .nav-link {
    display: initial;
    color: inherit;
  }
  .ant-list-header,
  .ant-list-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Notification = styled.div`
  .ant-list-item {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

export default DashHeader;
export { Notification };
