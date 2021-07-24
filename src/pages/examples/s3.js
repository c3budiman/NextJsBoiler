import React, {
    useState
} from 'react';
import dynamic from 'next/dynamic'
const ExampleLayout = dynamic(() => import('../../components/layout/ExampleLayout'))

export default function S3Upload() {
    const [imageupload, setImage] = useState('');
    const uploadPhoto = async (e) => {
        const file = e.target.files[0];
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`/api/s3/presignUpload?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (upload.ok) {
            console.log('Uploaded successfully!');
            // this one still harcoded because i cant use my env in view. need to use server get props and pass it here...
            //but this one is not so crucial so i pass hahaha
            setImage(`https://hellocdkstack-nextjsboilerb3735f9c-1hcfw1w0txr1g.s3.ap-southeast-1.amazonaws.com/${filename}`);
            console.log(`https://hellocdkstack-nextjsboilerb3735f9c-1hcfw1w0txr1g.s3.ap-southeast-1.amazonaws.com/${filename}`);
        } else {
            console.error('Upload failed.');
        }
    };

    return (
        <>
            <ExampleLayout title="S3 Upload">
                <div style={{ margin: "0px 20px" }}>
                    <p>Upload a .png or .jpg image (max 1MB).</p>
                    <input
                        onChange={uploadPhoto}
                        type="file"
                        accept="image/png, image/jpeg"
                    />
                    {
                        imageupload != '' ? <img height='400px' alt='upload img' src={imageupload} /> : null
                    }
                </div>
            </ExampleLayout>
        </>
    );
}
