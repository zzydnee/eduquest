import { db } from './firebase'
import { collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore'
import questions from './data/questions'

export async function seedQuestionsToFirebase() {
  const questionsRef = collection(db, 'questions')
  
  // Check if questions already exist
  const existing = await getDocs(questionsRef)
  if (existing.size > 0) {
    console.log('Questions already exist, skipping seed')
    return
  }
  
  // Only runs if collection is empty
  for (const question of questions) {
    await addDoc(questionsRef, question)
    console.log('Added:', question.text)
  }
  
  console.log('All questions uploaded to Firebase!')
}