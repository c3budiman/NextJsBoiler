// import dynamic from 'next/dynamic'
import Head from 'next/head'
import AdminSidebarDesktop from '../Sidebar/AdminSidebarDesktop'

export default function AdminLayout({ children, title, activeSidebar }) {
    return <>
        <Head>
            <title>{title} | Admin | NextJS Simple Boiler Template</title>
        </Head>
        <div className="container">
            <div className="row">
                <div className='max1444'>
                    <AdminSidebarDesktop activeSidebar={activeSidebar} />

                    <div className="colContentDesktop">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </>
}