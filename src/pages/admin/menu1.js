import md5 from "md5";
import { handleSessions } from "../../utils/helpers";

export default function AdminIndex(props) {
    console.log(props)
    return <>
        <div className="mx-4 my-4">
            <h1>Admin Pages 2</h1>
            <br />
            <p>
                Here Is Your Flag : CTF_{"{" + md5("Kocak juga lo") + "}"}
            </p>
        </div>
    </>
}

export async function getServerSideProps(context) {
    let checkSessions = await handleSessions(context);
    return checkSessions;
}