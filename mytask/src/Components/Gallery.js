import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import './Gallery.css';

const Gallery = () => {
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    // Function to validate file type
    const validateFile = (file) => {
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        return file && allowedTypes.includes(file.type); // include = boolean
    };

    // Handle files uploaded via file input
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (validateFile(selectedFile)) {
            setErrorMsg('');
            // const newFile = { preview: URL.createObjectURL(selectedFile) };
            const newFile = {
                id: Date.now(),
                preview: URL.createObjectURL(selectedFile)
            }
            setUploadedFiles((prevFiles) => [...prevFiles, newFile]);
        } else {
            setErrorMsg('Only png, jpg, and jpeg images are accepted');
        }
    };


    // Function to handle files dropped in the dropzone
    const onDrop = (acceptedFiles) => {
        const validFiles = acceptedFiles.filter(validateFile);

        if (validFiles.length !== acceptedFiles.length) {
            setErrorMsg('Only png, jpg, and jpeg files are accepted');
        } else {
            setErrorMsg('');
        }

        const newFiles = validFiles.map((file) => ({
            preview: URL.createObjectURL(file),
            name: file.name
        }));

        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
    });

    const navigateToProfile = () => {
        navigate('/');
    };

    const removeImage = (id) => {
        setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id))
    }

    return (
        <div className="gallery-page">
            <h2>Gallery Page</h2>
            <p>Upload Your photos here</p>

            {/* Dropzone area */}
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} onChange={handleFileChange} />
                <div className="dropzone-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drop files here or click to upload.</p>
                </div>
            </div>

            {/* Display uploaded files */}

            <div className="uploaded-gallery">
                {uploadedFiles.length > 0 ? (
                    uploadedFiles.map((file) => (
                        <div key={file.id} className="image-container">
                            <img src={file.preview} className="gallery-photo" alt="uploaded" />
                            <span className="delete-icon border" onClick={() => removeImage(file.id)}>
                                &times;
                            </span>
                        </div>

                    ))
                ) : (
                    <p>No images uploaded.</p>
                )}


                {/* react code for placeholder */}
                {/* upload more images placeholder */}
                {uploadedFiles.length > 0 && (
                    <label className="images-container-placeholder">
                        <input 
                        type="file"
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={handleFileChange}
                        style={{display:'none'}} />
                        <p>+</p>
                    </label>
                )}
            </div>


            <button onClick={navigateToProfile} className="btn btn-secondary mt-4">
                Back to Profile
            </button>
        </div>
    );
};

export default Gallery;
