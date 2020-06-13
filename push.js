var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BP39q7zsWBBFGcxcUCAIuxsYhM5IdFSYOFX34_bvVxYEPAmaoLGQmfzFD8oetMItPajuOCrYOpesKcgJ5En9TgU",
   "privateKey": "qRE3cypYh_059M5_wUBi_uHJBd_IFepcEgL8EEypJF4"
};
 
 
webPush.setVapidDetails(
   'mailto:muhammad.syam17155@student.unsika.ac.id',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dpLMYEtz84g:APA91bEPHQnlOH8SjQeMEoLAxXCV6Wu6J25mgDdVR6Y64lmjlBsf-XwyE0AKLNgpgiTBzoSvEh7xI8XspY1dWiXwdAHIGD81HAVFex16OE8VRiacaKDyuHgmInQUP3aYAVrepw3jH_Z4",
   "keys": {
       "p256dh": "BP/EDINdnJEiij5Ggz39RwjEoIm0B6scluzS9SONDsS9X/WboLnvYNhwibQOv9zNHF1MyRDjGFied6tk034uzQg=",
       "auth": "/4lW/JK/MNdYcvoj7cuRfw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '633108641561',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);