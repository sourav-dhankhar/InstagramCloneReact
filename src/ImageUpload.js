import React, { useState } from 'react';
import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { db, storage, set , refStorage } from './firebases';
import { uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { serverTimestamp, push, ref } from 'firebase/database';

function ImageUpload(props) {
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState('');
    const [progressBar, setProgressBar] = useState(0);

    const handleInputCaption = (event) => {
        setCaption(event.target.value);
    }

    const handleFileChoose = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }

    const handleUpload = (event) => {
        const imageUploadRef = refStorage(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(imageUploadRef, file);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgressBar(progress);
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                alert(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    console.log('db ', db);
                    const postListRef = ref(db, '/post');
                    const newPostRef = push(postListRef);
                    set(newPostRef, {
                        timeStamp: serverTimestamp(),
                        comment: caption,
                        imageUrl: downloadURL,
                        userName: props.userName
                      });
                });
            }
        );

    }

    return (
        <div>
            <Input type='text' placeholder='Enter Caption' value={caption} onChange={handleInputCaption} />
            <Input type='file' onChange={handleFileChoose} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload