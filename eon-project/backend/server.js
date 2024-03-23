const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');
const GridFSBucket = require('mongodb').GridFSBucket;
const Video = require('./models/videoSchema'); 

const app = express();
app.use(fileUpload());
app.use(cors());

const mongoURI = 'mongodb://localhost:27017/EonMedia';

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB via Mongoose");
    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db, {
      bucketName: 'uploads'
    });

    app.post('/upload', (req, res) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      const videoUpload = req.files.video;
      const uploadStream = bucket.openUploadStream(videoUpload.name, {
        metadata: {
          contentType: videoUpload.mimetype
        },
      });

      uploadStream.on('error', (err) => res.status(500).send(err));
      uploadStream.on('finish', () => {
        const newVideo = new Video({
          title: req.body.title, // Assuming the title is sent in the request body
          filename: videoUpload.name,
          description: req.body.description,
          contentType: videoUpload.mimetype,
        });

        newVideo.save()
          .then(() => res.json({
            message: 'Upload successful',
            video: newVideo
          }))
          .catch(err => {
            console.error("Error saving video metadata:", err);
            res.status(500).send('Error saving video metadata');
          });
      });

      uploadStream.end(videoUpload.data);
    });

    app.get('/video/search/:title', async (req, res) => {
      try {
        const title = req.params.title;
        const videos = await Video.find({
          title: { $regex: title, $options: 'i' }
        });

        if (!videos.length) {
          console.log('Video not found:', title);
          return res.status(404).json({ message: 'Video not found' });
        }

        res.json({ videos: videos });
      } catch (err) {
        console.error("Error searching for videos:", err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.get('/video/:filename', (req, res) => {
      const filename = req.params.filename;
      const bucket = new GridFSBucket(db, {
        bucketName: 'uploads'
      });
      console.log("About to query GridFS for filename:", filename);
      console.log("Bucket initialized with db:", db !== undefined);

      bucket.find({ filename: filename }).toArray().then(files => {
          console.log("hi"); // Should print if files or an empty array is returned

          if (!files || files.length === 0) {
          console.log('File not found:', filename);
          return res.status(404).send('File not found');
          }

          // File found, stream it to the response
          console.log('Streaming file:', filename);
          const stream = bucket.openDownloadStreamByName(filename);

          // Ensure proper content type setting
          if (files[0].contentType) {
          res.type(files[0].contentType);
          } else {
          console.log('Content type not found for file:', filename);
          }
          
          stream.pipe(res);
      }).catch(err => {
          console.error("Error querying GridFS:", err);
          res.status(500).send('Internal server error');
      });
    });
  })
  .catch(err => console.error("Failed to connect to MongoDB via Mongoose", err));

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server running on port ${port}`));