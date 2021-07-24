import { initializeStore } from '../../redux/store'
import { getDog } from '../../redux/action/getDog'
import { useSelector, shallowEqual } from 'react-redux'
import dynamic from 'next/dynamic'
const ExampleLayout = dynamic(() => import('../../components/Layout/ExampleLayout'))

export default function SSR() {
    let dogImage = useSelector(
        (state) => ({
            image: state.dogReducer.image,
            isPending: state.dogReducer.isPending
        }),
        shallowEqual
    )

    return <>
        <ExampleLayout title="SSR">
            <center>
                <h5>Dog Image, Refresh to get another random dog image</h5>
                <br />
                <img height='400px' width='400px' alt="Dog Images" src={dogImage.image} />
            </center>
        </ExampleLayout>
    </>
}

export async function getServerSideProps() {
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore

    await dispatch(getDog())

    return { props: { initialReduxState: reduxStore.getState() } }
}