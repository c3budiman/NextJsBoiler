import md5 from "md5";
import AdminLayout from "../../components/Layout/AdminLayout";

export default function AdminIndex() {
    return <>
        <AdminLayout title="Index" activeSidebar={1}>
            <div className="mx-4 my-4">
                <h1 className="colorWhite">Admin Pages</h1>
                <br />
                <p className="colorWhite">
                    Here Is Your Flag : CTF_{"{" + md5("Kocak wkwkwk") + "}"}
                </p>
            </div>
        </AdminLayout>
    </>
}