
import React, { 
	useEffect,
    useState
} from 'react';
import Skeleton from 'react-loading-skeleton'
import styles from './chat.module.css'


export default function SSR() {
	useEffect(() => {

	}, []);



	return <>
		<title>Realtime Example</title>
		<center>
            <div className={styles.chatBorder}>
                <h1 className={styles.titleChat}>
                    RealTime Chat
                </h1>
            </div>

            <div className={styles.chatScreen}>
                
            </div>
            <div className={styles.chatInput}>
                <div className="form-group">
                    {/* <input type="text" class="form-control" placeholder="name@example.com" /> */}
                    <textarea className="form-control">

                    </textarea>
                </div>
            </div>

            <div className={styles.button}>
                <div className="form-group">
                    <button className="btn btn-block btn-info">
                        Kirim
                    </button>
                </div>
            </div>
			

		</center>
	</>
}
