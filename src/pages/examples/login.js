import { initializeStore } from '../../redux/store'
import { postLogin } from '../../redux/action/postLogin'
import { useSelector, shallowEqual } from 'react-redux'
import React, {
    useState
} from 'react';
// import Skeleton from 'react-loading-skeleton'
import ExampleLayout from '../../components/Layout/ExampleLayout'
import HashLoader from "react-spinners/HashLoader";
import md5 from 'md5'



export default function Login() {
    const stateLogin = ['noauth', 'auth'];
    const [stateUser, setStateUser] = useState(stateLogin[0]);
    const [username, setusername] = useState()
    const [password, setpassword] = useState()

    let Users = useSelector(
        (state) => ({
            data: state.userReducer.data,
            isPending: state.userReducer.isPending
        }),
        shallowEqual
    )

    async function doLogin() {
        setStateUser(stateLogin[1])
        const reduxStore = initializeStore()
        const { dispatch } = reduxStore
        await dispatch(postLogin(username, md5(password)))
    }

    return <>
        <ExampleLayout title="Login">
            {
                (stateUser == stateLogin[0]) || (!Users.isPending && Users.data.code != 0) ?
                    <div className="container">
                        <form>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Username</label>
                                <input
                                    onChange={(e) => {
                                        setusername(e.target.value)
                                    }}
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    onChange={(e) => {
                                        setpassword(e.target.value)
                                    }}
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password" />
                            </div>

                            {!Users.isPending ? <p>{Users.data.info}</p> : null}

                            <button
                                onClick={doLogin}
                                type="submit"
                                className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    : stateUser == stateLogin[1] && Users.isPending ?
                        <div style={{ marginTop: "100px" }}>
                            <center>
                                <HashLoader color={"#000"} loading={true} size={150} />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <h5>Loading..</h5>
                            </center>
                        </div>
                        :
                        <>
                            <p>Nothing to show yet..</p>
                        </>
            }
        </ExampleLayout>
    </>
}
