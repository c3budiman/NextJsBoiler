const weatherIcons = {
  '01d': '/weather/day.svg',
  '02d': '/weather/cloudy-day-1.svg',
  '03d': '/weather/cloudy-day-2.svg',
  '04d': '/weather/cloudy-day-3.svg',
  '09d': '/weather/rainy-4.svg',
  '10d': '/weather/rainy-1.svg',
  '11d': '/weather/thunder.svg',
  '13d': '/weather/snowy-3.svg',
  '50d': '/weather/cloudy-day-3.svg',
  '01n': '/weather/night.svg',
  '02n': '/weather/cloudy-night-1.svg',
  '03n': '/weather/cloudy-night-2.svg',
  '04n': '/weather/cloudy-night-3.svg',
  '09n': '/weather/rainy-4.svg',
  '10n': '/weather/rainy-5.svg',
  '11n': '/weather/thunder.svg',
  '13n': '/weather/snowy-5.svg',
  '50n': '/weather/cloudy-day-3.svg'
};

// Capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowercase(string) {
  return string.toLowerCase();
}

// Format price
export function formatPrice(number) {
  const fnumber = parseFloat(number);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(fnumber);
}

// Get wind direction
export function windDirection(degree) {
  const sectors = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];

  degree += 22.5;

  if (degree < 0) {
    degree = 360 - (Math.abs(degree) % 360);
  } else {
    degree = degree % 360;
  }

  const which = parseInt(degree / 45, 10);
  return sectors[which];
}

// Get weather icon class
export function getWeatherIcon(code, size) {
  const icon = weatherIcons[code];
  return (
    <span
      style={{
        background: `none, url(${icon}) no-repeat`,
        backgroundSize: `contain`,
        width: `${size}px`,
        height: `${size}px`,
        display: `inline-block`
      }}
    />
  );
}

// Get weather data
export async function getWeather(city, country, days) {
  let forecast = undefined;
  try {
    const forecast_call = await fetch(
      `//api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${
        process.env.weatherApi
      }&cnt=${days}&units=metric`
    )
      .then(res => {
        if (res.ok) {
          return res;
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .catch(console.error);

    if (forecast_call !== undefined) {
      forecast = await forecast_call.json();
    }

    return forecast;
  } catch (e) {
    return '';
  }
}

function toCamelCase(str) {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, function($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, '');
}

export function objectToCamelCase(origObj) {
  return Object.keys(origObj).reduce(function(newObj, key) {
    let val = origObj[key];
    let newVal = typeof val === 'object' ? objectToCamelCase(val) : val;
    newObj[toCamelCase(key)] = newVal;
    return newObj;
  }, {});
}
