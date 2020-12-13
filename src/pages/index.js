import GreenButton from '../components/button/GreenButton'
import Image from 'next/image'

export default function Index() {
    return (
        <>
            <title>NextJS Simple Boiler Template</title>
            <header>
                <div className="header-c3budiman">
                    <div className="inside header">
                        <h3>Welcome!</h3>
                        <div className="my-pictures">
                            <Image src="/images/cecep.jpg" width="400" height="400" alt="Profile Picture" />
                        </div>
                        <GreenButton text="Learn More?" type="button" onClick={() => alert('wow you clicked it!')} />
                    </div>
                </div>

            </header>
        </>
    )
}