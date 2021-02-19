import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar-edit';
import base64Img from 'base64-img';
import axios from 'axios';

const convertImage = rawImage => {
  const byteCharacters = atob(rawImage);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: 'image/jpg' });
  return URL.createObjectURL(blob);
};

const AvatarCropper = ({ photoUrl }) => {
  const [image, setImage] = useState(photoUrl);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = preview => {
    setPreview(preview);
  };

  const onBeforeFileLoad = elem => {
    if (elem.target.files[0].size > 71680) {
      alert('File is too big!');
      elem.target.value = '';
    }
  };
  return (
    <div>
      <Avatar
        width={390}
        height={295}
        src={image}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
      />
      <img src={preview} alt='preview' />
    </div>
  );
};
export default AvatarCropper;
