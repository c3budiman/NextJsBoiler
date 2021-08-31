import dynamic from 'next/dynamic'
const NavbarPrimary = dynamic(() => import('../../components/Navbar/NavbarPrimary'))
import Head from 'next/head'

export default function ExampleLayout({ children, title }) {
    return <>
        <Head>
            <title>{title} | Examples | NextJS Simple Boiler Template</title>
            <link rel="stylesheet" href="/bootstrap.css" />
        </Head>
        <NavbarPrimary activeMenu="examples" noTransparent={true} />
        <div style={{ height: "100px" }}></div>
        <div className='max1444'>
            {children}
        </div>
    </>
}