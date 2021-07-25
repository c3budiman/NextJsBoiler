// import styles from './Sidebar.module.css'

import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { getProfile } from "../../redux/action/users/getProfile";
import { initializeStore } from "../../redux/store";

export default function AdminSidebarDesktop({ activeSidebar }) {
    const reduxStore = initializeStore()
    const { dispatch } = reduxStore

    useEffect(() => {
        getProfileUseEffect()

        async function getProfileUseEffect() {
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

    if (!Users.isPending) {
        console.log(Users)
        if (Users?.data?.data?.role !== 1) {
            window.location.href = `/`
        }
    }

    return <>
        <div className="colSidebarDesktop">
            <div className="sidebar">
                <div className="px-3 py-3">
                    <a href="/" className="sidebar-brand">
                        <div className="row">
                            <div className="col-3">
                                <img src="/favicon/favicon-32x32.png" />
                            </div>
                            <div className="col-9 mt-1">
                                <p>Next.JS</p>
                            </div>
                        </div>
                    </a>
                </div>
                <ul className="sidebar-menu list-group list-group">
                    <li className={"list-group-item d-none d-md-block list-group-item " + (activeSidebar == 1 ? "active" : "")}>
                        <a href="/admin">
                            <span className="align-self-center">Home</span>
                        </a>
                    </li>
                    <li className={"list-group-item d-none d-md-block list-group-item " + (activeSidebar == 2 ? "active" : "")}>
                        <a href="/admin/menu1">
                            <span className="align-self-center">Menu 1</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </>
}