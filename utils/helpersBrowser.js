// ini helpers khusus untuk browser jgn pake fungsi server disini
import Router from 'next/router';

export const PushNavigateTo = async (routes) => {
    console.log('%c Navigating To : ' + routes, 'background: #222; color: #bada55');
    Router.push(routes);
}

export const ReplaceNavigateTo = async (routes) => {
    console.log('%c Navigating To : ' + routes, 'background: #222; color: #bada55');
    Router.replace(routes);
}