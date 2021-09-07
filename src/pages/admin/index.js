import md5 from "md5";
import { handleSessions } from "../../utils/helpers";

export default function AdminIndex(props) {
    console.log(props)
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

export async function getServerSideProps(context) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}