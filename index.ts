import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

exports.sendAreaNotification = functions.firestore
  .document("Report/{report_id}")
  .onCreate((event) => {
    const newValue_1 = event.data();
    if (newValue_1) {
      const disease1: string = newValue_1.Disease;
      const location: string = newValue_1.locationString;
      const address: string = newValue_1.address;
      const num: number = address.indexOf(",");
      const str3: string = address.substring(0, num);
      const str2: string = disease1 + " registered at " + str3;
      const payload_1 = {
        //here we create payload as a const
        notification: {
          title: "DISEASE ALERT!!", //assign title in payload title
          body: str2, //assign body in payload title
        },
      };
      // const topics = location;
      return admin
        .messaging()
        .sendToTopic(location, payload_1)
        .then((res) => {
          console.log("notification sent "); //if notification is deliverd then "notification sent is displayed in the log files"
        })
        .catch((err) => {
          //catch error here
          console.log("notification sent " + err); //if notification is failed then "notification err is displayed in the log files"
        });
    } else {
      return null;
    }

    //create payload regarding notification details
  });

exports.sendAddressNotification = functions.firestore
  .document("Notification/{notification_id}")
  .onCreate((event) => {
    const newValue = event.data();
    if (newValue) {
      const Alert_ward: string = newValue.Alert_ward; //retrive the title
      const disease: string = newValue.disease; //retrive body
      const str1: string = disease + " is spreading in " + Alert_ward;
      const payload = {
        //here we create payload as a const
        notification: {
          title: "DISEASE ALERT!!", //assign title in payload title
          body: str1, //assign body in payload title
        },
      };
      const topics = "notification";

      return admin
        .messaging()
        .sendToTopic(topics, payload)
        .then((res) => {
          console.log("notification sent "); //if notification is deliverd then "notification sent is displayed in the log files"
        })
        .catch((err) => {
          //catch error here
          console.log("notification sent " + err); //if notification is failed then "notification err is displayed in the log files"
        });
    } else {
      return null;
    }
    //create payload regarding notification details
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
