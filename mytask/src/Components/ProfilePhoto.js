import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePhoto.css';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


const ProfilePhoto = () => {
    const [image, setImage] = useState(null);
    const [cropped, setCropped] = useState(null); //for cropping 
    const [isCropped, setIsCropped] = useState(false); //to detect is image croped or not 
    const [showCropper, setShowCropper] = useState(false); // for cropper function visible or not
    const [aspectRatio, setAspectRatio] = useState();
    const cropperRef = useRef(null);
    const navigate = useNavigate();
    // Handle image upload and show cropper
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setIsCropped(false);
            setShowCropper(true);
        }
    };

    // Handle crop button click and update cropped image
    // this code is for cropper
    const handleCropped = () => {
        const cropper = cropperRef.current.cropper;
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
            setCropped(croppedCanvas.toDataURL());
            setIsCropped(true);
            setShowCropper(false);
        }
    };

    // Handle the "Upload Image" button click to upload and show the file input
    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };
    const navigateToGallery = () => {
        navigate('/gallery');
    };

    const handleAspectRatioChange = (ratio) => {
        setAspectRatio(ratio);
    };

    // Show cropper only when an image is uploaded and cropping is not finished
    return (
        <div className="profilePhoto">
            <h1>Profile Photo</h1>
            
            <div className="heading-line"></div>

            <div className="container-photo">
                {cropped ? (
                    <img src={cropped} alt="cropped profile" className="imageContainer" />
                ) : (
                    // <div className="defaultPic">Upload Image</div>
                    <div className="defaultPic">
                        <img src={`${process.env.PUBLIC_URL}/EmptyProfilePhot.jpg`} alt="Default Profile" />
                    </div>


                )}
            </div>

            <button onClick={handleUploadClick} className="edit-btn btn btn-success mt-4 mb-4">
                Set Profile Photo
            </button>
            <button onClick={navigateToGallery} className="edit-btn btn btn-success mt-4 mb-4">
                Go to Gallery
            </button>

            <input
                id="fileInput"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
                style={{ display: 'none' }} // Hide the file input
            />

            {/* Show Cropper only if an image is uploaded and cropping is not finished */}
            {image && showCropper && (
                <div className="cropper-container">
                    <Cropper
                        ref={cropperRef}
                        src={image}
                        style={{ height: 400, width: '100%' }}
                        aspectRatio={aspectRatio}
                        guides={false}
                    />
                    <button onClick={handleCropped} className="btn btn-primary">
                        Done
                    </button>
                    {/* buttons for different aspect ratios */}
                    <div className="aspect-ratio-buttons">
                        <button
                            // ratio = 1.1
                            onClick={() => handleAspectRatioChange(1)}
                            className="btn btn-success">
                            Square 
                        </button>
                        <button
                            // ratio = 16/9
                            onClick={() => handleAspectRatioChange(16 / 9)}
                            className="btn btn-success">
                            Landscape 
                        </button>
                        <button
                            // ratio = 3/4
                            onClick={() => handleAspectRatioChange(3 / 4)}
                            className="btn btn-success">
                            Portrait 
                        </button>
                        <button
                            // no size applied
                            onClick={() => handleAspectRatioChange(NaN)}
                            className="btn btn-success">
                            Free Size
                        </button>
                    </div>
                </div>
            )}

            {/* User's information */}
            <h3>User's Name Shows Here</h3>
            <p>Hey, User!</p>
        </div>
    );
};

export default ProfilePhoto;
