const express = require('express');
const { MongoClient, GridFSBucket } = require('mongodb');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

app.use(fileUpload());
app.use(cors()); 

const mongoURI = 'mongodb://localhost:27017/EonMedia';
const dbName = 'EonMedia';

MongoClient.connect(mongoURI)
  .then(client => {
    console.log("Connected to MongoDB");
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, {
      bucketName: 'uploads'
    });

    // POST /upload : Upload a single video file
    app.post('/upload', (req, res) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
    
      console.log(req.files.video.name)

      const videoUpload = req.files.video;
      const uploadStream = bucket.openUploadStream(videoUpload.name, {
        metadata: {
          contentType: videoUpload.mimetype,
        },
      });

      uploadStream.on('error', (err) => res.status(500).send(err));
      uploadStream.on('finish', () => {
        res.json({ message: 'Upload successful' });
      });

      // Use the memory storage buffer to upload the file directly to GridFS
      uploadStream.end(videoUpload.data);
    });

    app.get('/video/:filename', (req, res) => {
        const filename = req.params.filename;
        const bucket = new GridFSBucket(db, {
          bucketName: 'uploads' 
        });
        console.log("About to query GridFS for filename:", filename);
        console.log("Bucket initialized with db:", db !== undefined);

        bucket.find({ filename: filename }).toArray().then(files => {

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

const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => console.error("Failed to connect to MongoDB", err));
