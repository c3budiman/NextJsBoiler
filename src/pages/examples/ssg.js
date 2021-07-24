import { initializeStore } from '../../redux/store'
import { getDog } from '../../redux/action/getDog'
import { useSelector, shallowEqual } from 'react-redux'
import dynamic from 'next/dynamic'
const ExampleLayout = dynamic(() => import('../../components/layout/ExampleLayout'))

export default function SSG() {
    let dogImage = useSelector(
        (state) => ({
            image: state.dogReducer.image,
            isPending: state.dogReducer.isPending
        }),
        shallowEqual
    )

    return <>
        <ExampleLayout title="SSG">
            <center>
                <h5>Dog Image, SSG, are fetched when you build your application, 
                so when you refresh, you wont get another do images</h5>
                <br />
                <img height='400px' width='400px' alt="Dog Images" src={dogImage.image} />
            </center>
        </ExampleLayout>

    </>
}

export async function getStaticProps() {
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore

    await dispatch(getDog())

    return { props: { initialReduxState: reduxStore.getState() } }
}