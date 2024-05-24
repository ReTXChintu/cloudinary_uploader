# Cloudinary Uploader

This is a Node.js package that allows you to upload files to Cloudinary from both a React frontend and a Node.js backend.

## Installation

```bash
npm install cloudinary-uploader
```

## Usage

### Installation

```bash
npm install cloudinary-uploader
```

### Node Js Backend

```bash
const { configureCloudinary, uploadFileToCloudinary } = require('cloudinary-uploader');

// Configure Cloudinary
configureCloudinary({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

// Example usage in an Express route
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const result = await uploadFileToCloudinary(req.file.path, 'your_folder');
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
```

### React Js Frontend

```bash
import React, { useState } from 'react';
import { configureCloudinary, uploadFileToCloudinaryFrontend } from 'cloudinary-uploader';

// Configure Cloudinary
configureCloudinary({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
});

const App = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const result = await uploadFileToCloudinaryFrontend(file, 'your_folder', 'your_upload_preset');
      console.log('File uploaded successfully:', result);
    } catch (error) {
      console.error('Failed to upload file:', error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default App;
```

## Configuration

- You need to provide your Cloudinary credentials when configuring the package.

## ChangeLog

- All changelogs are available at [Changelog](./CHANGELOG.md)
