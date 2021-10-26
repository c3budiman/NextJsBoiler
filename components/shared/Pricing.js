import { Amount, Features, PricingIcon } from '../styles/Pricing';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { formatPrice } from '../../lib/helpers';

const Pricing = ({ title, subtitle, description, price, features, icon }) => (
  <div
    className="bg-white text-center px-3 py-5"
    css={`
      margin: 1px;
    `}
  >
    <PricingIcon className="mb-5 text-primary">{icon}</PricingIcon>

    <div className="mb-5">
      <h5 className="mb-0">{title}</h5>
      <small className="mb-0 text-muted">{subtitle}</small>
    </div>

    <Features className="mb-5">
      {features.map((feature, index) => (
        <li key={index}>{feature.title}</li>
      ))}
    </Features>

    <p className="mb-5">{description}</p>

    <div className="mt-auto">
      <Amount className="text-monospace">
        <span className="symbol">{price === 0 ? '' : '$'}</span>
        <span>
          {price === 0 ? 'free' : formatPrice(price).replace('$', '')}
        </span>
      </Amount>

      <Button type="primary">Choose plan</Button>
    </div>
  </div>
);

Pricing.prototypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.element.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      available: PropTypes.bool
    })
  ).isRequired
};

export default Pricing;
