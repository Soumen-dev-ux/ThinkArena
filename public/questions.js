// Questions Database
const QUESTIONS = {
  science: {
    easy: [
      {
        question: "What is the chemical symbol for water?",
        options: ["H2O", "CO2", "O2", "NaCl"],
        correct: 0,
        explanation: "Water is composed of two hydrogen atoms and one oxygen atom, hence H2O."
      },
      {
        question: "How many bones are there in an adult human body?",
        options: ["196", "206", "216", "186"],
        correct: 1,
        explanation: "An adult human typically has 206 bones in their body."
      },
      {
        question: "What planet is known as the Red Planet?",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        correct: 2,
        explanation: "Mars appears red due to iron oxide (rust) on its surface."
      },
      {
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correct: 1,
        explanation: "Plants absorb carbon dioxide during photosynthesis to produce glucose and oxygen."
      },
      {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Silver"],
        correct: 2,
        explanation: "Diamond is the hardest naturally occurring substance, ranking 10 on the Mohs scale."
      }
    ],
    medium: [
      {
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correct: 1,
        explanation: "Mitochondria produce ATP, the energy currency of cells, earning them the title 'powerhouse of the cell'."
      },
      {
        question: "What is the speed of light in vacuum?",
        options: ["300,000 km/s", "299,792,458 m/s", "150,000 km/s", "299,792,458 km/s"],
        correct: 1,
        explanation: "The speed of light in vacuum is exactly 299,792,458 meters per second."
      },
      {
        question: "Which element has the atomic number 6?",
        options: ["Oxygen", "Carbon", "Nitrogen", "Boron"],
        correct: 1,
        explanation: "Carbon has 6 protons in its nucleus, giving it atomic number 6."
      },
      {
        question: "What type of bond holds water molecules together?",
        options: ["Ionic", "Covalent", "Hydrogen", "Metallic"],
        correct: 2,
        explanation: "Hydrogen bonds form between water molecules due to the polarity of the H2O molecule."
      },
      {
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correct: 2,
        explanation: "Nitrogen makes up about 78% of Earth's atmosphere."
      }
    ],
    hard: [
      {
        question: "What is the name of the theoretical boundary around a black hole?",
        options: ["Photon Sphere", "Event Horizon", "Ergosphere", "Singularity"],
        correct: 1,
        explanation: "The event horizon is the boundary beyond which nothing, not even light, can escape a black hole."
      },
      {
        question: "Which particle is responsible for the Higgs mechanism?",
        options: ["Photon", "Electron", "Higgs Boson", "Muon"],
        correct: 2,
        explanation: "The Higgs boson is associated with the Higgs field that gives mass to other particles."
      },
      {
        question: "What is the second law of thermodynamics?",
        options: ["Energy cannot be created or destroyed", "Entropy of an isolated system always increases", "Force equals mass times acceleration", "For every action there is an equal and opposite reaction"],
        correct: 1,
        explanation: "The second law states that the entropy of an isolated system never decreases over time."
      },
      {
        question: "What is the name of the process by which DNA is copied?",
        options: ["Transcription", "Translation", "Replication", "Mitosis"],
        correct: 2,
        explanation: "DNA replication is the process by which DNA makes an exact copy of itself."
      },
      {
        question: "What is the uncertainty principle in quantum mechanics?",
        options: ["Energy and time cannot be measured simultaneously", "Position and momentum cannot be precisely determined simultaneously", "Mass and energy are equivalent", "Wave and particle properties are complementary"],
        correct: 1,
        explanation: "Heisenberg's uncertainty principle states that the more precisely you know a particle's position, the less precisely you can know its momentum."
      }
    ]
  },
  
  history: {
    easy: [
      {
        question: "In which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correct: 1,
        explanation: "World War II ended in 1945 with the surrender of Japan in September."
      },
      {
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correct: 2,
        explanation: "George Washington served as the first President from 1789 to 1797."
      },
      {
        question: "Which ancient wonder of the world was located in Egypt?",
        options: ["Hanging Gardens", "Great Pyramid of Giza", "Colossus of Rhodes", "Temple of Artemis"],
        correct: 1,
        explanation: "The Great Pyramid of Giza is the only surviving ancient wonder of the world."
      },
      {
        question: "The Berlin Wall fell in which year?",
        options: ["1987", "1989", "1991", "1993"],
        correct: 1,
        explanation: "The Berlin Wall fell on November 9, 1989, marking the end of the Cold War era."
      },
      {
        question: "Which empire was ruled by Julius Caesar?",
        options: ["Greek Empire", "Roman Empire", "Persian Empire", "Ottoman Empire"],
        correct: 1,
        explanation: "Julius Caesar was a Roman general and statesman who played a critical role in the Roman Republic."
      }
    ],
    medium: [
      {
        question: "The Renaissance period began in which country?",
        options: ["France", "England", "Italy", "Germany"],
        correct: 2,
        explanation: "The Renaissance began in Italy in the 14th century, particularly in Florence."
      },
      {
        question: "Who wrote the Communist Manifesto?",
        options: ["Vladimir Lenin", "Karl Marx and Friedrich Engels", "Joseph Stalin", "Leon Trotsky"],
        correct: 1,
        explanation: "The Communist Manifesto was written by Karl Marx and Friedrich Engels in 1848."
      },
      {
        question: "The Battle of Hastings took place in which year?",
        options: ["1066", "1067", "1065", "1068"],
        correct: 0,
        explanation: "The Battle of Hastings was fought on October 14, 1066, resulting in Norman conquest of England."
      },
      {
        question: "Which civilization built Machu Picchu?",
        options: ["Aztecs", "Mayans", "Incas", "Olmecs"],
        correct: 2,
        explanation: "Machu Picchu was built by the Inca civilization in the 15th century."
      },
      {
        question: "The French Revolution began in which year?",
        options: ["1789", "1799", "1779", "1769"],
        correct: 0,
        explanation: "The French Revolution began in 1789 with the storming of the Bastille."
      }
    ],
    hard: [
      {
        question: "Which treaty ended the Thirty Years' War?",
        options: ["Treaty of Versailles", "Peace of Westphalia", "Treaty of Utrecht", "Congress of Vienna"],
        correct: 1,
        explanation: "The Peace of Westphalia in 1648 ended the Thirty Years' War and established the modern state system."
      },
      {
        question: "Who was the last Byzantine Emperor?",
        options: ["Justinian I", "Constantine XI", "Basil II", "Alexios I"],
        correct: 1,
        explanation: "Constantine XI Palaiologos was the last Byzantine Emperor, dying in the fall of Constantinople in 1453."
      },
      {
        question: "The Boxer Rebellion occurred in which country?",
        options: ["Japan", "Korea", "China", "Vietnam"],
        correct: 2,
        explanation: "The Boxer Rebellion was an anti-foreign uprising in China from 1899 to 1901."
      },
      {
        question: "Which battle is considered the turning point of the American Civil War?",
        options: ["Battle of Bull Run", "Battle of Gettysburg", "Battle of Antietam", "Battle of Shiloh"],
        correct: 1,
        explanation: "The Battle of Gettysburg (July 1-3, 1863) is widely considered the turning point of the Civil War."
      },
      {
        question: "The Magna Carta was signed in which year?",
        options: ["1215", "1225", "1205", "1235"],
        correct: 0,
        explanation: "The Magna Carta was signed by King John of England in 1215, limiting royal power."
      }
    ]
  },
  
  sports: {
    easy: [
      {
        question: "How many players are on a basketball team on the court at one time?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "Each basketball team has 5 players on the court at any given time."
      },
      {
        question: "Which sport is known as 'America's Pastime'?",
        options: ["Football", "Basketball", "Baseball", "Hockey"],
        correct: 2,
        explanation: "Baseball has been traditionally known as 'America's Pastime' since the late 19th century."
      },
      {
        question: "How often are the Summer Olympics held?",
        options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
        correct: 2,
        explanation: "The Summer Olympics are held every four years, with some exceptions during wartime."
      },
      {
        question: "In which sport would you perform a slam dunk?",
        options: ["Tennis", "Basketball", "Volleyball", "Badminton"],
        correct: 1,
        explanation: "A slam dunk is a basketball shot where a player jumps and scores by putting the ball through the hoop with force."
      },
      {
        question: "What is the maximum score possible in ten-pin bowling?",
        options: ["200", "250", "300", "350"],
        correct: 2,
        explanation: "A perfect game in ten-pin bowling consists of 12 consecutive strikes, resulting in a score of 300."
      }
    ],
    medium: [
      {
        question: "Which country has won the most FIFA World Cup titles?",
        options: ["Germany", "Brazil", "Argentina", "Italy"],
        correct: 1,
        explanation: "Brazil has won the FIFA World Cup 5 times (1958, 1962, 1970, 1994, 2002)."
      },
      {
        question: "In tennis, what is the term for a score of 40-40?",
        options: ["Match point", "Set point", "Deuce", "Advantage"],
        correct: 2,
        explanation: "Deuce is the term used when both players have a score of 40-40 in tennis."
      },
      {
        question: "Which golfer has won the most Masters Tournaments?",
        options: ["Tiger Woods", "Jack Nicklaus", "Arnold Palmer", "Gary Player"],
        correct: 1,
        explanation: "Jack Nicklaus has won the Masters Tournament 6 times (1963, 1965, 1966, 1972, 1975, 1986)."
      },
      {
        question: "What is the length of a marathon race?",
        options: ["25.2 miles", "26.2 miles", "27.2 miles", "24.2 miles"],
        correct: 1,
        explanation: "A marathon is 26.2 miles (42.195 kilometers) long."
      },
      {
        question: "In American football, how many points is a touchdown worth?",
        options: ["5", "6", "7", "8"],
        correct: 1,
        explanation: "A touchdown is worth 6 points, with an additional 1 or 2 points possible on the conversion attempt."
      }
    ],
    hard: [
      {
        question: "Which driver holds the record for most Formula 1 World Championships?",
        options: ["Ayrton Senna", "Michael Schumacher", "Lewis Hamilton", "Sebastian Vettel"],
        correct: 2,
        explanation: "Lewis Hamilton holds the record with 7 Formula 1 World Championships, tied with Michael Schumacher."
      },
      {
        question: "In cricket, what is the maximum number of runs that can be scored off a single ball?",
        options: ["4", "6", "8", "Unlimited"],
        correct: 3,
        explanation: "Theoretically unlimited runs can be scored if the ball keeps being run and never reaches the boundary."
      },
      {
        question: "Which team holds the record for the longest winning streak in NBA history?",
        options: ["Boston Celtics", "Los Angeles Lakers", "Chicago Bulls", "Golden State Warriors"],
        correct: 1,
        explanation: "The Los Angeles Lakers won 33 consecutive games during the 1971-72 season."
      },
      {
        question: "What is the term for scoring three goals in a single hockey game?",
        options: ["Triple", "Hat trick", "Three-peat", "Trio"],
        correct: 1,
        explanation: "A hat trick in hockey is when a player scores three goals in a single game."
      },
      {
        question: "Which swimmer holds the record for most Olympic gold medals?",
        options: ["Mark Spitz", "Michael Phelps", "Ryan Lochte", "Katie Ledecky"],
        correct: 1,
        explanation: "Michael Phelps holds the record with 23 Olympic gold medals."
      }
    ]
  },
  
  technology: {
    easy: [
      {
        question: "What does 'WWW' stand for?",
        options: ["World Wide Web", "World Wide Window", "World Web Wide", "Wide World Web"],
        correct: 0,
        explanation: "WWW stands for World Wide Web, the information system that uses the internet."
      },
      {
        question: "Which company created the iPhone?",
        options: ["Google", "Microsoft", "Apple", "Samsung"],
        correct: 2,
        explanation: "Apple Inc. created and launched the first iPhone in 2007."
      },
      {
        question: "What does 'CPU' stand for?",
        options: ["Computer Processing Unit", "Central Processing Unit", "Central Program Unit", "Computer Program Unit"],
        correct: 1,
        explanation: "CPU stands for Central Processing Unit, the main processor of a computer."
      },
      {
        question: "Which social media platform is known for its 280-character limit?",
        options: ["Facebook", "Instagram", "Twitter", "LinkedIn"],
        correct: 2,
        explanation: "Twitter (now X) is famous for its character limit, originally 140 characters, now 280."
      },
      {
        question: "What does 'USB' stand for?",
        options: ["Universal Serial Bus", "United Serial Bus", "Universal System Bus", "United System Bus"],
        correct: 0,
        explanation: "USB stands for Universal Serial Bus, a standard for connecting devices to computers."
      }
    ],
    medium: [
      {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: ["C", "FORTRAN", "Assembly", "COBOL"],
        correct: 0,
        explanation: "C is often called the 'mother of all languages' due to its influence on many modern programming languages."
      },
      {
        question: "What does 'AI' stand for in technology?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Intelligence", "Applied Intelligence"],
        correct: 1,
        explanation: "AI stands for Artificial Intelligence, the simulation of human intelligence in machines."
      },
      {
        question: "Which company developed the Android operating system?",
        options: ["Apple", "Microsoft", "Google", "Samsung"],
        correct: 2,
        explanation: "Google acquired and developed the Android operating system for mobile devices."
      },
      {
        question: "What is the most popular web browser as of 2023?",
        options: ["Firefox", "Safari", "Chrome", "Edge"],
        correct: 2,
        explanation: "Google Chrome is the most widely used web browser globally as of 2023."
      },
      {
        question: "What does 'VPN' stand for?",
        options: ["Virtual Private Network", "Very Private Network", "Virtual Public Network", "Very Public Network"],
        correct: 0,
        explanation: "VPN stands for Virtual Private Network, used to create secure connections over the internet."
      }
    ],
    hard: [
      {
        question: "What is the time complexity of QuickSort in the average case?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
        correct: 1,
        explanation: "QuickSort has an average time complexity of O(n log n), though worst case is O(n²)."
      },
      {
        question: "Which consensus algorithm does Bitcoin use?",
        options: ["Proof of Stake", "Proof of Work", "Delegated Proof of Stake", "Practical Byzantine Fault Tolerance"],
        correct: 1,
        explanation: "Bitcoin uses Proof of Work (PoW) as its consensus algorithm for validating transactions."
      },
      {
        question: "What does 'REST' stand for in web APIs?",
        options: ["Representational State Transfer", "Remote State Transfer", "Representational System Transfer", "Remote System Transfer"],
        correct: 0,
        explanation: "REST stands for Representational State Transfer, an architectural style for web services."
      },
      {
        question: "Which data structure is typically used to implement a LIFO (Last In, First Out) system?",
        options: ["Queue", "Stack", "Array", "Linked List"],
        correct: 1,
        explanation: "A Stack data structure implements LIFO (Last In, First Out) behavior."
      },
      {
        question: "What is the name of the first computer virus?",
        options: ["Creeper", "Elk Cloner", "Brain", "Morris Worm"],
        correct: 0,
        explanation: "Creeper, created in 1971, is considered the first computer virus or worm."
      }
    ]
  }
};

// Achievement system
const ACHIEVEMENTS = [
  { id: 'perfect_score', name: 'Perfect Score', description: 'Score 100%', icon: '🏆' },
  { id: 'speed_demon', name: 'Speed Demon', description: 'Complete quiz under 2 minutes', icon: '⚡' },
  { id: 'streak_master', name: 'Streak Master', description: 'Get 5+ correct in a row', icon: '🔥' },
  { id: 'category_expert', name: 'Category Expert', description: 'Score 80%+ in any category', icon: '🎯' },
  { id: 'hard_mode', name: 'Challenge Accepted', description: 'Complete hard difficulty', icon: '💪' },
  { id: 'first_try', name: 'First Steps', description: 'Complete your first quiz', icon: '🌟' },
  { id: 'improvement', name: 'Getting Better', description: 'Improve your score', icon: '📈' },
  { id: 'consistent', name: 'Consistency', description: 'Take 5 quizzes', icon: '🎯' }
];