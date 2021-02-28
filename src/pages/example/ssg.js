import { initializeStore } from '../../redux/store'
import {getDog} from '../../redux/action/getDog'
import { useSelector, shallowEqual } from 'react-redux'

export default function SSR() {
    let dogImage = useSelector(
        (state) => ({
            image: state.dogReducer.image,
            isPending: state.dogReducer.isPending
        }),
        shallowEqual
    )

    return <div>
        <center>
            <h2>Dog Image, Refresh to get another random dog image</h2>
            <br />
            <img height='400px' width='auto' alt="Dog Images"  src={dogImage.image} />
        </center>
    </div>
}

export async function getStaticProps() {
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore
  
    await dispatch(getDog())
  
    return { props: { initialReduxState: reduxStore.getState() } }
}