const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const exec = async () => {
  if (process.argv.length !== 3) {
    console.log(`Usage: node make_admin.js <uid>`)
    return
  }
  
  const uid = process.argv[2]

  const user = await admin.auth().getUser(uid);

  await admin.auth().setCustomUserClaims(uid, {
    ...(user.customClaims ?? {}),
    admin: true,
  })

  console.log('SUCCESS')
}

exec()