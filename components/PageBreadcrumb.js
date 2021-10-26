import { Breadcrumb } from 'antd';
import { Home } from 'react-feather';
import { capitalize } from '../lib/helpers';

const PageBreadcrumb = ({ pathname } = props) => {
  const routes = pathname.split('/');

  return (
    <div className="mb-4 ">
      <h5
        className="mb-0 mr-3"
        css={`
          display: inline-block;
        `}
      >
        {capitalize(routes.slice(-1)[0])}
      </h5>
      <Breadcrumb
        separator="•"
        css={`
          display: inline-block;
        `}
      >
        <Breadcrumb.Item>
          <a href="">
            <Home size={20} strokeWidth={1} />
          </a>
        </Breadcrumb.Item>
        {routes.map(route =>
          route.length > 0 ? (
            <Breadcrumb.Item>
              <a href="">{capitalize(route)}</a>
            </Breadcrumb.Item>
          ) : null
        )}
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumb;
