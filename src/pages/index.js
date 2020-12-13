import GreenButton from '../components/button/GreenButton'
import Image from 'next/image'
import { connectToDatabase } from '../drivers/mongo/connectToDatabase'

export default function Index({ isConnected }) {
    return (
        <>
            <title>NextJS Simple Boiler Template</title>
            <header>
                <div className="header-c3budiman">
                    <div className="inside header">
                        <h3>Welcome!</h3>
                        <div className="my-pictures">
                            <Image src="https://avatars1.githubusercontent.com/u/1578830" width="400" height="400" alt="Profile Picture" />
                        </div>
                        <GreenButton text="Learn More?" type="button" onClick={() => alert('wow you clicked it!')} />
                    </div>
                    {isConnected ? (
                        <h2 className="subtitle">You are connected to MongoDB</h2>
                    ) : null}
                </div>

            </header>
        </>
    )
}

export async function getServerSideProps() {
    const { client } = await connectToDatabase()

    const isConnected = await client.isConnected() // Returns true or false

    return {
        props: { isConnected },
    }
}