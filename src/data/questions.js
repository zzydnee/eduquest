const questions = [
  {
    id: 1,
    text: "What letter comes after A in the alphabet?",
    options: ["B", "C", "D", "E"],
    correctIndex: 0,
    subject: "English",
    gradeLevel: 1,
    gameLevel: 1,
    hints: [
      "Think of the alphabet song: A, B, C...",
      "A comes first, then comes...",
      "It sounds like the word 'bee'!"
    ]
  },
  {
    id: 2,
    text: "What is 1 + 1?",
    options: ["1", "2", "3", "4"],
    correctIndex: 1,
    subject: "Math",
    gradeLevel: 1,
    gameLevel: 1,
    hints: [
      "Use your fingers to count!",
      "Hold up one finger, then one more...",
      "One apple plus one apple = two apples!"
    ]
  },
  {
    id: 3,
    text: "What do plants need to grow?",
    options: ["Milk", "Water and sunlight", "Candy", "Juice"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 1,
    gameLevel: 1,
    hints: [
      "Think about what you do when watering plants.",
      "The sun gives energy, and something else they drink...",
      "Plants need sunlight and water to survive!"
    ]
  },
  {
    id: 4,
    text: "Who is a community helper who puts out fires?",
    options: ["Teacher", "Doctor", "Firefighter", "Cook"],
    correctIndex: 2,
    subject: "History",
    gradeLevel: 1,
    gameLevel: 1,
    hints: [
      "This person wears a big uniform and uses a water hose.",
      "They drive a big red truck.",
      "When there is fire, we call these brave people!"
    ]
  },
  {
    id: 5,
    text: "What do we say when someone gives us something?",
    options: ["Sorry", "Excuse me", "Thank you", "Goodbye"],
    correctIndex: 2,
    subject: "Values",
    gradeLevel: 1,
    gameLevel: 1,
    hints: [
      "This is a polite word to show we are grateful.",
      "We say this to show appreciation.",
      "Thank ___ ! Fill in the blank."
    ]
  },
  {
    id: 6,
    text: "Which of these is a vowel?",
    options: ["B", "C", "D", "A"],
    correctIndex: 3,
    subject: "English",
    gradeLevel: 1,
    gameLevel: 2,
    hints: [
      "There are 5 vowels in the alphabet.",
      "Vowels are A, E, I, O, U.",
      "Look for a letter from A, E, I, O, U."
    ]
  },
  {
    id: 7,
    text: "How many sides does a triangle have?",
    options: ["2", "3", "4", "5"],
    correctIndex: 1,
    subject: "Math",
    gradeLevel: 1,
    gameLevel: 2,
    hints: [
      "Look at the word 'tri' - it means three!",
      "Count the corners of a triangle.",
      "Tri means three sides!"
    ]
  },
  {
    id: 8,
    text: "What colors are in the Philippine flag?",
    options: ["Red and white only", "Yellow and green", "Blue, red, and white with sun and stars", "All red"],
    correctIndex: 2,
    subject: "History",
    gradeLevel: 1,
    gameLevel: 2,
    hints: [
      "The flag has three colors and a white triangle.",
      "It has a sun and three stars.",
      "Blue, red, white triangle, sun, and three stars!"
    ]
  },
  {
    id: 9,
    text: "What shape has 4 equal sides?",
    options: ["Rectangle", "Triangle", "Square", "Circle"],
    correctIndex: 2,
    subject: "Math",
    gradeLevel: 1,
    gameLevel: 2,
    hints: [
      "It is like a rectangle but all sides are equal.",
      "Count the sides: it has 4 equal ones.",
      "A square has 4 equal sides and 4 equal corners!"
    ]
  },
  {
    id: 10,
    text: "Which word rhymes with 'cat'?",
    options: ["Dog", "Fish", "Hat", "Sun"],
    correctIndex: 2,
    subject: "English",
    gradeLevel: 1,
    gameLevel: 3,
    hints: [
      "Rhyming words end with the same sound.",
      "'_at' - what other word ends in '-at'?",
      "Cat, Hat, Bat all rhyme!"
    ]
  },
  {
    id: 11,
    text: "What is 5 + 4?",
    options: ["8", "9", "10", "7"],
    correctIndex: 1,
    subject: "Math",
    gradeLevel: 1,
    gameLevel: 3,
    hints: [
      "Count from 5, then add 4 more.",
      "5... 6, 7, 8, 9...",
      "Five plus four equals nine!"
    ]
  },
  {
    id: 12,
    text: "What gives us light during the day?",
    options: ["Moon", "Stars", "The Sun", "A lamp"],
    correctIndex: 2,
    subject: "Science",
    gradeLevel: 1,
    gameLevel: 3,
    hints: [
      "It is a very big ball of fire in the sky.",
      "It rises in the morning and sets in the evening.",
      "The Sun is the star closest to Earth!"
    ]
  },
  {
    id: 13,
    text: "Jose Rizal is the national _____ of the Philippines.",
    options: ["President", "Hero", "King", "General"],
    correctIndex: 1,
    subject: "History",
    gradeLevel: 1,
    gameLevel: 3,
    hints: [
      "He wrote books to help the Filipino people.",
      "We celebrate his day on December 30.",
      "He sacrificed his life for the country."
    ]
  },
  {
    id: 14,
    text: "Which sentence is correct?",
    options: ["The dog run fast.", "The dog runs fast.", "The dog running fast.", "The dog runned fast."],
    correctIndex: 1,
    subject: "English",
    gradeLevel: 2,
    gameLevel: 4,
    hints: [
      "The subject is 'the dog' - just one dog.",
      "When we talk about one thing doing something now, we add 's' to the verb.",
      "The dog runs - 'runs' matches the singular subject."
    ]
  },
  {
    id: 15,
    text: "What is 12 + 15?",
    options: ["25", "26", "27", "28"],
    correctIndex: 2,
    subject: "Math",
    gradeLevel: 2,
    gameLevel: 4,
    hints: [
      "Add the ones first: 2 + 5 = ?",
      "2+5=7, then 10+10=20, add them together...",
      "12+15 = 10+10+2+5 = 27!"
    ]
  },
  {
    id: 16,
    text: "What is the capital city of the Philippines?",
    options: ["Cebu City", "Davao City", "Manila", "Makati"],
    correctIndex: 2,
    subject: "History",
    gradeLevel: 2,
    gameLevel: 4,
    hints: [
      "This city is where the national government is located.",
      "It is in the island of Luzon.",
      "Malacañang Palace, where the President lives, is here!"
    ]
  },
  {
    id: 17,
    text: "What is the function of the heart?",
    options: ["To digest food", "To pump blood throughout the body", "To help us breathe", "To control our thoughts"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 2,
    gameLevel: 4,
    hints: [
      "Listen to your chest - you can feel it beating.",
      "It works like a pump.",
      "The heart pumps blood to deliver oxygen everywhere!"
    ]
  },
  {
    id: 18,
    text: "What is a synonym for 'happy'?",
    options: ["Sad", "Angry", "Joyful", "Tired"],
    correctIndex: 2,
    subject: "English",
    gradeLevel: 2,
    gameLevel: 4,
    hints: [
      "A synonym is a word with the same or similar meaning.",
      "When you are happy, you are also...",
      "Happy, joyful, glad all mean the same thing!"
    ]
  },
  {
    id: 19,
    text: "What is the plural of 'child'?",
    options: ["Childs", "Children", "Childes", "Childrens"],
    correctIndex: 1,
    subject: "English",
    gradeLevel: 2,
    gameLevel: 5,
    hints: [
      "Not all plurals just add 's' at the end.",
      "This is an irregular plural word.",
      "Child becomes Children - just like Man becomes Men!"
    ]
  },
  {
    id: 20,
    text: "What is 24 divided by 4?",
    options: ["5", "6", "7", "8"],
    correctIndex: 1,
    subject: "Math",
    gradeLevel: 2,
    gameLevel: 5,
    hints: [
      "Think: what number times 4 equals 24?",
      "4 times 6 = ?",
      "4 x 6 = 24, so 24 / 4 = 6!"
    ]
  },
  {
    id: 21,
    text: "Who was the first President of the Philippines?",
    options: ["Ferdinand Marcos", "Manuel Quezon", "Emilio Aguinaldo", "Corazon Aquino"],
    correctIndex: 2,
    subject: "History",
    gradeLevel: 2,
    gameLevel: 5,
    hints: [
      "He was a general who fought for independence.",
      "He declared Philippine independence on June 12, 1898.",
      "Emilio Aguinaldo became the first president!"
    ]
  },
  {
    id: 22,
    text: "What does 'mano po' mean in Filipino culture?",
    options: ["Goodbye to friends", "A greeting to show respect to elders", "A way to ask for food", "A celebration dance"],
    correctIndex: 1,
    subject: "Values",
    gradeLevel: 2,
    gameLevel: 5,
    hints: [
      "It involves touching an elder's hand to your forehead.",
      "This is done to grandparents and older relatives.",
      "Mano po is a gesture of respect for elders!"
    ]
  },
  {
    id: 23,
    text: "What do we call animals that eat only plants?",
    options: ["Carnivores", "Omnivores", "Herbivores", "Predators"],
    correctIndex: 2,
    subject: "Science",
    gradeLevel: 2,
    gameLevel: 5,
    hints: [
      "Think about the word herb - plants!",
      "Herbi = plant. -vore = eater.",
      "Herbivores eat only plants. Examples: cows, horses, rabbits!"
    ]
  },
  {
    id: 24,
    text: "What is an adjective in: 'The happy child played.'?",
    options: ["child", "played", "The", "happy"],
    correctIndex: 3,
    subject: "English",
    gradeLevel: 2,
    gameLevel: 6,
    hints: [
      "Adjectives describe nouns - people, places, things.",
      "What word describes how the child is?",
      "Happy describes the child, so it is an adjective!"
    ]
  },
  {
    id: 25,
    text: "What is 7 times 8?",
    options: ["54", "56", "58", "63"],
    correctIndex: 1,
    subject: "Math",
    gradeLevel: 2,
    gameLevel: 6,
    hints: [
      "Try counting by 7s or 8s.",
      "7 x 7 = 49, then add 7 more...",
      "7 x 7 = 49. 49 + 7 = 56!"
    ]
  },
  {
    id: 26,
    text: "When is Philippine Independence Day?",
    options: ["January 1", "June 12", "September 21", "December 25"],
    correctIndex: 1,
    subject: "History",
    gradeLevel: 2,
    gameLevel: 6,
    hints: [
      "It is celebrated during the month of June.",
      "In 1898, the Philippines declared independence from Spain.",
      "June 12, 1898 - Philippine Independence Day!"
    ]
  },
  {
    id: 27,
    text: "What does 'bayanihan' mean?",
    options: ["Resting together", "Spirit of community cooperation", "Eating together", "Competing against each other"],
    correctIndex: 1,
    subject: "Values",
    gradeLevel: 2,
    gameLevel: 6,
    hints: [
      "This Filipino value shows unity and helping one another.",
      "Neighbors help each other - that is bayanihan!",
      "Bayanihan is the Filipino spirit of community and cooperation!"
    ]
  },
  {
    id: 28,
    text: "What is the main source of energy for Earth?",
    options: ["Wind", "Water", "The Sun", "The Moon"],
    correctIndex: 2,
    subject: "Science",
    gradeLevel: 2,
    gameLevel: 6,
    hints: [
      "Without this, plants cannot make food.",
      "It gives us heat and light.",
      "The Sun provides energy for almost all life on Earth!"
    ]
  },
  {
    id: 29,
    text: "What is photosynthesis?",
    options: ["How animals breathe", "How plants make food using sunlight", "How water flows in rivers", "How clouds form"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 3,
    gameLevel: 7,
    hints: [
      "This process happens in the leaves of plants.",
      "Plants use sunlight, water, and air to make food.",
      "Plants + sunlight + water + CO2 = food + oxygen!"
    ]
  },
  {
    id: 30,
    text: "What is 1/2 + 1/4?",
    options: ["2/6", "1/6", "3/4", "2/4"],
    correctIndex: 2,
    subject: "Math",
    gradeLevel: 3,
    gameLevel: 7,
    hints: [
      "Make the denominators the same before adding.",
      "Change 1/2 into fourths: 1/2 = 2/4.",
      "2/4 + 1/4 = 3/4!"
    ]
  },
  {
    id: 31,
    text: "What is the national language of the Philippines?",
    options: ["English", "Cebuano", "Filipino (Tagalog)", "Spanish"],
    correctIndex: 2,
    subject: "History",
    gradeLevel: 3,
    gameLevel: 7,
    hints: [
      "It is based on a language from the Manila region.",
      "It is one of the two official languages.",
      "Filipino, based on Tagalog, is the national language!"
    ]
  },
  {
    id: 32,
    text: "What is the past tense of 'write'?",
    options: ["Writed", "Written", "Wrote", "Writes"],
    correctIndex: 2,
    subject: "English",
    gradeLevel: 3,
    gameLevel: 7,
    hints: [
      "This is an irregular verb - it does not just add '-ed'.",
      "Yesterday, I _____ a letter.",
      "Write becomes Wrote in past tense!"
    ]
  },
  {
    id: 33,
    text: "What does being responsible mean?",
    options: ["Doing what others want all the time", "Taking care of your duties and accepting consequences", "Being very strict with others", "Always winning in games"],
    correctIndex: 1,
    subject: "Values",
    gradeLevel: 3,
    gameLevel: 7,
    hints: [
      "A responsible person does homework without being told.",
      "It means owning your actions.",
      "Responsibility = doing your duties and owning your actions!"
    ]
  },
  {
    id: 34,
    text: "Which word is a noun?",
    options: ["Run", "Beautiful", "School", "Quickly"],
    correctIndex: 2,
    subject: "English",
    gradeLevel: 3,
    gameLevel: 8,
    hints: [
      "A noun is a person, place, thing, or idea.",
      "Is School a place? Is Run an action?",
      "School is a place, which makes it a noun!"
    ]
  },
  {
    id: 35,
    text: "What is 25% of 80?",
    options: ["15", "20", "25", "30"],
    correctIndex: 1,
    subject: "Math",
    gradeLevel: 3,
    gameLevel: 8,
    hints: [
      "25% means 25 out of every 100.",
      "25% = 1/4. What is 1/4 of 80?",
      "Divide 80 by 4: 80 / 4 = 20!"
    ]
  },
  {
    id: 36,
    text: "What are the three states of matter?",
    options: ["Hot, warm, cold", "Solid, liquid, gas", "Heavy, light, medium", "Hard, soft, smooth"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 3,
    gameLevel: 8,
    hints: [
      "Think about water: ice, liquid water, or steam.",
      "Ice is one state, water is another, steam is the third.",
      "Solid (ice), Liquid (water), Gas (steam)!"
    ]
  },
  {
    id: 37,
    text: "What body of water surrounds the Philippines?",
    options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
    correctIndex: 2,
    subject: "History",
    gradeLevel: 3,
    gameLevel: 8,
    hints: [
      "The Philippines is an archipelago in Southeast Asia.",
      "The largest ocean in the world touches the Philippines.",
      "The Pacific Ocean surrounds the Philippines!"
    ]
  },
  {
    id: 38,
    text: "What causes earthquakes?",
    options: ["Strong winds underground", "Movement of tectonic plates", "Very heavy rain", "Volcanic ash"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 3,
    gameLevel: 8,
    hints: [
      "The Earth's crust is made of large pieces called plates.",
      "When these pieces move and collide, the ground shakes.",
      "Earthquakes are caused by moving tectonic plates!"
    ]
  },
  {
    id: 39,
    text: "What is the area of a rectangle with length 8 cm and width 5 cm?",
    options: ["26 sq cm", "40 sq cm", "13 sq cm", "45 sq cm"],
    correctIndex: 1,
    subject: "Math",
    gradeLevel: 4,
    gameLevel: 9,
    hints: [
      "Area = Length x Width",
      "Multiply 8 and 5.",
      "8 x 5 = 40 square centimeters!"
    ]
  },
  {
    id: 40,
    text: "What is the role of the ozone layer?",
    options: ["To make rain fall", "To protect Earth from harmful UV rays", "To keep the ocean warm", "To create oxygen"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 4,
    gameLevel: 9,
    hints: [
      "The ozone layer is high up in the atmosphere.",
      "Without it, the Sun's rays would be harmful.",
      "The ozone layer blocks harmful ultraviolet (UV) rays!"
    ]
  },
  {
    id: 41,
    text: "What event ended Spanish rule in the Philippines?",
    options: ["The Battle of Mactan", "The Spanish-American War", "World War II", "The People Power Revolution"],
    correctIndex: 1,
    subject: "History",
    gradeLevel: 4,
    gameLevel: 9,
    hints: [
      "Another country defeated Spain in a war.",
      "The United States fought Spain and took the Philippines.",
      "After the 1898 Spanish-American War, Spain gave Philippines to USA!"
    ]
  },
  {
    id: 42,
    text: "What is 'utang na loob' in Filipino culture?",
    options: ["Owing money", "A sense of gratitude for a favor received", "Being angry at someone", "Forgiving someone"],
    correctIndex: 1,
    subject: "Values",
    gradeLevel: 4,
    gameLevel: 9,
    hints: [
      "This Filipino value involves remembering help given.",
      "When someone does a great favor for you, you feel this.",
      "Utang na loob is a debt of gratitude - repaying kindness!"
    ]
  },
  {
    id: 43,
    text: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 4,
    gameLevel: 9,
    hints: [
      "This is the smallest planet in our solar system.",
      "It is the first planet in order from the Sun.",
      "Mercury is the closest planet to the Sun!"
    ]
  },
  {
    id: 44,
    text: "What is the difference between simile and metaphor?",
    options: ["They are the same", "Simile uses 'like' or 'as,' metaphor directly compares", "Metaphor uses 'like,' simile does not", "Only metaphors use comparisons"],
    correctIndex: 1,
    subject: "English",
    gradeLevel: 4,
    gameLevel: 10,
    hints: [
      "She is like a star vs She is a star - which uses like?",
      "Simile uses like/as. Metaphor is a direct comparison.",
      "Brave as a lion = simile. He is a lion = metaphor!"
    ]
  },
  {
    id: 45,
    text: "What is an ecosystem?",
    options: ["A single animal in its habitat", "All living and non-living things in an environment interacting together", "A type of plant community", "The study of animals only"],
    correctIndex: 1,
    subject: "Science",
    gradeLevel: 4,
    gameLevel: 10,
    hints: [
      "An ecosystem includes both living things and their environment.",
      "Think about a forest: trees, animals, water, and soil all interact.",
      "Ecosystem = all living + non-living things in one place!"
    ]
  },
  {
    id: 46,
    text: "What is the significance of the EDSA People Power Revolution?",
    options: ["It was a war against Japan", "It peacefully ended the Marcos dictatorship", "It declared independence from the USA", "It started the Philippine Republic"],
    correctIndex: 1,
    subject: "History",
    gradeLevel: 4,
    gameLevel: 10,
    hints: [
      "This happened in 1986 through peaceful protest.",
      "Millions gathered on EDSA in Metro Manila.",
      "In 1986, Filipinos peacefully ousted Marcos and restored democracy!"
    ]
  },
  {
    id: 47,
    text: "What is metamorphosis?",
    options: ["Hibernation", "Evolution", "The transformation of an insect like a caterpillar into a butterfly", "Photosynthesis"],
    correctIndex: 2,
    subject: "Science",
    gradeLevel: 4,
    gameLevel: 10,
    hints: [
      "This is a big change in body form.",
      "Meta means change. Morph means form.",
      "Caterpillar to cocoon to butterfly = metamorphosis!"
    ]
  },
  {
    id: 48,
    text: "If x + 5 = 12, what is x?",
    options: ["5", "6", "7", "8"],
    correctIndex: 2,
    subject: "Math",
    gradeLevel: 4,
    gameLevel: 10,
    hints: [
      "Think: what number + 5 equals 12?",
      "Subtract 5 from both sides.",
      "12 - 5 = 7, so x = 7!"
    ]
  }
]

export default questions