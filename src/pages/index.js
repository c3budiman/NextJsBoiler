import GreenButton from '../components/button/GreenButton'

export default function Index() {
    return (
        <>
            <title>NextJS Simple Boiler Template</title>
            <header>
                <div className="header-c3budiman">
                    <div className="inside header">
                        <h3>Welcome!</h3>
                        <GreenButton text="Learn More?" type="button" onClick={() => alert('wow you clicked it!')} />
                    </div>
                </div>
            </header>
        </>
    )
}