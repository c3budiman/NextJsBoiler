import dynamic from 'next/dynamic'
const NavbarPrimary = dynamic(() => import('../../components/Navbar/NavbarPrimary'))

export default function Examples() {
    return (
        <>
            <title>Examples | NextJS Simple Boiler Template</title>
            <NavbarPrimary activeMenu="examples" noTransparent={true} />
            <div style={{ height: "100px" }}></div>
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
        </>
    )
}