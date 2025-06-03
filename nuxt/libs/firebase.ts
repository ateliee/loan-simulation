import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Firebase Admin SDKの初期化
export const initFirebaseApp = () => {
  if (!getApps().length) {
    const isEmulator = process.env.NODE_ENV === 'development'
    const emulatorHost = process.env.FIREBASE_EMULATOR_HOST || 'localhost'

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      })
    })

    const db = getFirestore()

    // ローカル環境の場合はエミュレーターを使用
    if (isEmulator) {
      db.settings({
        host: `${emulatorHost}:8080`,
        ssl: false
      })
    }
  }
}

export const getDb = () => getFirestore()
