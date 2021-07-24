import { initializeStore } from '../../redux/store'
import { getDog } from '../../redux/action/getDog'
import { useSelector, shallowEqual } from 'react-redux'
import React, {
	useEffect
} from 'react';
import Skeleton from 'react-loading-skeleton'
import dynamic from 'next/dynamic'
const ExampleLayout = dynamic(() => import('../../components/Layout/ExampleLayout'))

export default function SPA() {
	useEffect(() => {
		getDogUseEffect()

		async function getDogUseEffect() {
			const reduxStore = initializeStore()
			const { dispatch } = reduxStore
			await dispatch(getDog())
		}

	}, []);

	let dogImage = useSelector(
		(state) => ({
			image: state.dogReducer.image,
			isPending: state.dogReducer.isPending
		}),
		shallowEqual
	)

	function returnDogImage(dogImage) {
		return dogImage.isPending ?
			<Skeleton height={400} width={400} />
			:
			<img height='400px' width='400px' alt="Dog Images" src={dogImage.image} />
	}

	return <>
		<ExampleLayout title="SPA">
			<div>
				<center>
					<h5>Dog Image, Refresh to get another random dog image</h5>
					<br />
					{returnDogImage(dogImage)}
				</center>
			</div>
		</ExampleLayout>
	</>
}
