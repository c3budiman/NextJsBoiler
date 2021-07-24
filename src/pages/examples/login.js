import dynamic from 'next/dynamic'
const GreenButton = dynamic(() => import('../../components/button/GreenButton'))
const ExampleLayout = dynamic(() => import('../../components/layout/ExampleLayout'))
import { getProfile } from '../../redux/action/users/getProfile';
import { postLogin } from '../../redux/action/postLogin';
import { useSelector, shallowEqual } from 'react-redux';
import { initializeStore } from '../../redux/store';
import HashLoader from "react-spinners/HashLoader";
import Image from 'next/image';
import React, {
    useState,
    useEffect
} from 'react';
import md5 from 'md5';

export default function Login() {
    const stateLogin = ['noauth', 'loading', 'auth', 'error'];
    const [username, setusername] = useState()
    const [password, setpassword] = useState()

    useEffect(() => {
        getProfileUseEffect()

        async function getProfileUseEffect() {
            const reduxStore = initializeStore()
            const { dispatch } = reduxStore
            await dispatch(getProfile())
        }
    }, []);

    let Users = useSelector(
        (state) => ({
            data: state.userReducer.data,
            isPending: state.userReducer.isPending,
            userState: state.userReducer.state,
        }),
        shallowEqual
    )

    async function doLogin() {
        const reduxStore = initializeStore()
        const { dispatch } = reduxStore
        await dispatch(postLogin(username, md5(password)))
    }

    async function doLogout() {
        const reduxStore = initializeStore()
        const { dispatch } = reduxStore
        await dispatch(postLogin(username, md5(password)))
    }

    return <>
        <ExampleLayout title="Login">
            {
                (Users.userState == stateLogin[0] || Users.userState == stateLogin[3]) ?
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
                    : Users.userState == stateLogin[1] ?
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
                        : Users.userState == stateLogin[2] ?
                            <>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <Image className='ppgw' src={Users.data.data.images} width="200" height="auto" alt="Profile Picture" />
                                        </div>
                                        <div className="col-lg-6 my-auto">
                                            <table>
                                                <tr>
                                                    <td>
                                                        Username
                                                    </td>
                                                    <td>
                                                        &nbsp;:&nbsp;
                                                    </td>
                                                    <td>
                                                        {Users.data.data.username}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Role
                                                    </td>
                                                    <td>
                                                        &nbsp;:&nbsp;
                                                    </td>
                                                    <td>
                                                        {Users.data.data.role == 1 ? "Admin" : "Users"}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Bio
                                                    </td>
                                                    <td>
                                                        &nbsp;:&nbsp;
                                                    </td>
                                                    <td>
                                                        {Users.data.data.bio}
                                                    </td>
                                                </tr>

                                            </table>
                                        </div>
                                        <div className="col-lg-3">
                                            <GreenButton text="Logout" type="button" onClick={doLogout} />
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <p>Unknown Error</p>
                            </>
            }
        </ExampleLayout>
    </>
}
