import styled from 'styled-components';

const Sidebar = styled.div`
  height: 100%;
  display: flex;
  .ant-layout-sider {
    box-shadow: 0 0px 3px rgba(0, 0, 0, 0.02), 0 0 1px rgba(0, 0, 0, 0.05);
    z-index: 10;
  }
  .ant-menu-item > a {
    display: flex;
    align-items: center;
  }
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    margin-right: 0.5rem;
  }
  .ant-layout-sider-zero-width-trigger {
    z-index: 9;
  }
  .ant-menu-inline-collapsed .ant-badge {
    max-width: 0;
    display: inline-block;
    opacity: 0;
  }
  .ant-menu-inline .ant-menu-item,
  .ant-menu-inline .ant-menu-submenu-title {
    width: calc(100%);
  }
  .sidebar .ant-badge {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &.right {
      right: 16px;
    }
    &.left {
      left: 16px;
    }
  }
  // fill icon fix
  .bg-dark .sidebar li:not(.ant-menu-item-selected) svg > path:nth-child(1),
  .bg-dark .sidebar li:not(.ant-menu-item-selected) svg > path:nth-child(3) {
    fill: #A5A5A5;
  }
  .bg-dark .sidebar li:not(.ant-menu-item-selected) svg > path:nth-child(4) {
    fill: #A5A5A5;
  }
  .sidebar li:not(.ant-menu-item-selected) svg > path:nth-child(1) {
    fill: #A5A5A5;
  }
  .sidebar li:not(.ant-menu-item-selected) svg > path:nth-child(2) {
    fill: #A5A5A5;
  }

  .sidebar li svg > path:nth-child(1) {
    fill: #33539E;
  }
  .sidebar li svg > path:nth-child(2) {
    fill: #33539E;
  }
`;

export default Sidebar;
