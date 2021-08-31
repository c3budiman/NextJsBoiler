import md5 from "md5";

export default function AdminIndex() {
    return <>
        <div className="mx-4 my-4">
            <h1>Admin Pages</h1>
            <br />
            <p>
                Here Is Your Flag : CTF_{"{" + md5("Kocak wkwkwk") + "}"}
            </p>
        </div>
    </>
}