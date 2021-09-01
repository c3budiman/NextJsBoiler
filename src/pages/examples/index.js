import dynamic from 'next/dynamic'
const NavbarPrimary = dynamic(() => import('../../components/Navbar/NavbarPrimary'))
import Head from 'next/head'
import Link from 'next/link';

export default function Examples() {
    return (
        <>
            <Head>
                <title>Examples | NextJS Simple Boiler Template</title>
                <link rel="stylesheet" href="/bootstrap.css" />
            </Head>
            <NavbarPrimary activeMenu="examples" noTransparent={true} />
            <div style={{ height: "100px" }}></div>
            <div className='max1444'>
                <ul>
                    <li>
                        <Link href="/examples/login">
                            <a href="/examples/login">Login</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/examples/s3">
                            <a href="/examples/s3">S3 Upload Image</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/examples/spa">
                            <a href="/examples/spa">SPA Fetch</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/examples/ssg">
                            <a href="/examples/ssg">SSG Fetch</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/examples/ssr">
                            <a href="/examples/ssr">SSR Fetch</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}