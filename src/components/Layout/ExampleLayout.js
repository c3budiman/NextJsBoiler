import dynamic from 'next/dynamic'
const NavbarPrimary = dynamic(() => import('../../components/Navbar/NavbarPrimary'))

export default function ExampleLayout({ children, title }) {
    return <>
        <title>{title} | Examples | NextJS Simple Boiler Template</title>
        <NavbarPrimary activeMenu="examples" noTransparent={true} />
        <div style={{ height: "100px" }}></div>
        <div className='max1444'>
            {children}
        </div>
    </>
}