import "antd/dist/antd.css";
import App from "next/app";
import AppProvider from "../components/shared/AppProvider";

import { GlobalStyles } from "../components/styles/GlobalStyles";
import "../public/app.css";
import "../public/nprogress.css";

import Head from "next/head";
import NProgress from "nprogress";
import Page from "../components/Page";
import Router from "next/router";
import moment from "moment";
moment.locale("id");

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
	static async getInitialProps({ Component, ctx, req }) {
		let pageProps = {};
		const userAgent = ctx.req
			? ctx.req.headers["user-agent"]
			: navigator.userAgent;

		let ie = false;
		if (userAgent.match(/Edge/i) || userAgent.match(/Trident.*rv[ :]*11\./i)) {
			ie = true;
		}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		pageProps.query = ctx.query;
		pageProps.ieBrowser = ie;
		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<GlobalStyles />
				<Head>
					<meta
						name="viewport"
						content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
					/>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<link rel="shortcut icon" href="/images/triangle.png" />
					<title>Boiler Plate</title>
					<link rel="preconnect" href="https://fonts.gstatic.com" />
					<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito&display=optional" />
				</Head>
				<AppProvider>
					<Page>
						<Component {...pageProps} />
					</Page>
				</AppProvider>
			</>
		);
	}
}

export default MyApp;
