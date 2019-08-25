const functions = require('firebase-functions');
const {Storage} = require('@google-cloud/storage');
const spawn = require('child-process-promise').spawn;
const admin = require('firebase-admin');


admin.initializeApp(functions.config().firebase);

const projectId = "iot-project-249706";
const gcs = new Storage({
  projectId: projectId,
});

exports.generateThumbnail = functions.storage.object().onFinalize((object, context) => {
        const filePath = object.name;
        const fileName = filePath.split('/').pop();
        const fileBucket = object.bucket;
        const bucket = gcs.bucket(fileBucket);
        const tempFilePath = '/tmp/${fileName}';


        const title = "SmartDoorBell";
        const body = "Someone is at the door!";

        //var registrationToken = "fQkS9dSSRnk:APA91bETzKW0-4xQ8X2ywB16YhQVr7XbnHeL_dhNRBazOs_PO6Eqzgh5zGs5OSdqOd3-d3rwe6WTqEA7-nIf_vgln4aPbJ0evZpeH9M_Fko-D-Bf7N6Hc_Ow6WwZRyvqFVHr9aLAsSik";
        //mobitel
        var registrationToken = "cRlyP5Bkyb8:APA91bHNbMaNTLliDl1-BUCmpFw5iPFVhswO0O1jBJ0Gtlb-PvGhsUIeFJ2XVQu9CAdin_QuxLmVskitCIe0q-yw1S9G6CdKX9JBaPydYxICDAClrt96hBPbVKTxIoo_bxFJJQ2odk3Z";
        //emulator var registrationToken = "eEl68sEPeRI:APA91bF1udq3utMacOnAVn6rtqJUNgAI3DkpNqghms9a1w3U6oHkq5itMZFn3j5iDhJ9oaoGcO6yAAHmq7DUUD_IIokgwGhFdn3k-9HQP4WNDQXy8tKrpbJNs1ilKvNadz0oVtUgP8HZ";

        var message = {
          notification : {
            body: body,
            title: title
          },
          data: {
            title: title,
            body: body
          },
          token: registrationToken
        };

        // Send a message to the device corresponding to the provided
        // registration token.
        admin.messaging().send(message)
          .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
          })
          .catch((error) => {
            console.log('Error sending message:', error);
          });






        // if(fileName.startsWith('thumb_')){
        //   console.log("Already a thumbnail.");
        //   return;
        // }
        //
        // if(!object.contentType.startsWith('image/')){
        //   console.log("This is not an image!");
        //   return;
        // }
        //
        // if(object.resourceState === 'not_exists'){
        //   console.log("Picture was deleted.");
        //   return;
        // }
        //
        // return bucket.file(filePath).download({
        //   destination: tempFilePath
        // })
        // .then(() => {
        //   console.log("Image downloaded localy to", tempFilePath);
        //   return spawn('convert', [tempFilePath, '-thumbnail', '200x200', tempFilePath]);
        // })
        // .then(() => {
        //   console.log("Thumbnail created.");
        //   const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2');
        //
        //   return bucket.upload(tempFilePath, {
        //     destination: thumbFilePath
        //   })
        // })

      })
