import Image from 'next/image'
import { connectToDatabase } from '../drivers/mongo/connectToDatabase'
import { mysqlQuery } from '../drivers/mysql/mysqlQuery'
import dynamic from 'next/dynamic'
// const GreenButton = dynamic(() => import('../components/button/GreenButton'))
const NavbarPrimary = dynamic(() => import('../components/Navbar/NavbarPrimary'))
import Head from 'next/head'


export default function Index({ isConnected, mysqlCon, hostMongo, hostMysql }) {
    return (
        <>
            <Head>
                <title>NextJS Simple Boiler Template</title>
            </Head>

            <NavbarPrimary activeMenu="home" />

            <div className='max1444'>
                <div className="my-pictures">
                    <Image src="/images/next.jpeg" width="1440" height="800" alt="Profile Picture" />
                </div>
                <div className="intro-section">
                    <div className="inside header">
                        <div className="row">
                            <div className="col-3 col-lg-1">
                                <Image className='ppgw' src="/images/cecep.jpg" width="100" height="100" alt="Profile Picture" />
                            </div>
                            <div className="col-9 col-lg-6 my-auto">
                                <h5>Welcome to next.js boiler example!</h5>
                            </div>
                            <div className="col-12 col-lg-5">
                                <h5>
                                    Service Available :
                                </h5>

                                <ul>
                                    {isConnected ? (
                                        <li>MongoDB is Up at : {hostMongo}</li>
                                    ) : null}

                                    {mysqlCon ? (
                                        <li>Mysql is Up at : {hostMysql}</li>
                                    ) : null}
                                </ul>
                            </div>
                        </div>
                        <br />
                    </div>
                    <br />
                </div>
            </div>

        </>
    )
}

export async function getServerSideProps() {
    //checking mysql connection :
    var mysqlCon = false;
    let cached = global.mysql
    if (!cached) cached = global.mysql = {}
    if (cached.conmysql && cached.conmysql.state == "authenticated") {
        mysqlCon = true;
    } else {
        var sql = `select id from users limit 1`;
        var users = await mysqlQuery(sql);
        if (users.code == 0) {
            mysqlCon = true;
        }
    }

    //checking mongo connection :
    const { client } = await connectToDatabase()
    const isConnected = await client.isConnected()
    const hostMysql = "XXXX" + process.env.DB_HOST.substring(37)
    const hostMongo = "XXXX" + process.env.MONGODB_URI.substring(31)

    return {
        props: { isConnected, mysqlCon, hostMysql, hostMongo },
    }
}