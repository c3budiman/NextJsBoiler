import dynamic from 'next/dynamic'
const NavbarPrimary = dynamic(() => import('../../components/Navbar/NavbarPrimary'))
import Head from 'next/head'


export default function Examples() {
    return (
        <>
            <Head>
                <title>Examples | NextJS Simple Boiler Template</title>
            </Head>
            <NavbarPrimary activeMenu="examples" noTransparent={true} />
            <div style={{ height: "100px" }}></div>
            <div className='max1444'>
                <ul>
                    <li>
                        <a href="/examples/login">Login</a>
                    </li>
                    <li>
                        <a href="/examples/s3">S3 Upload Image</a>
                    </li>
                    <li>
                        <a href="/examples/spa">SPA Fetch</a>
                    </li>
                    <li>
                        <a href="/examples/ssg">SSG Fetch</a>
                    </li>
                    <li>
                        <a href="/examples/ssr">SSR Fetch</a>
                    </li>
                </ul>
            </div>
        </>
    )
}