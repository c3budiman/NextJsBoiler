import { initializeStore } from '../../redux/store'
import {getDog} from '../../redux/action/getDog'
import { useSelector, shallowEqual } from 'react-redux'
import React, { 
	useEffect
} from 'react';
import Skeleton from 'react-loading-skeleton'

export default function SSR() {
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
				<img height='400px' width='auto' alt="Dog Images" src={dogImage.image} />
	}

	return <div>
		<center>
			<h2>Dog Image, Refresh to get another random dog image</h2>
			<br />
			{returnDogImage(dogImage)}
		</center>
	</div>
}
