const TUTORIALS = [
  {
    id: '1',
    title: 'React Native Basics',
    difficulty: 'Beginner',
    averageTime: '20 mins',
    description: 'Learn how to build your first mobile screens with React Native components and styling.',
  },
  {
    id: '2',
    title: 'State and Effects',
    difficulty: 'Intermediate',
    averageTime: '30 mins',
    description: 'Understand useState and useEffect to manage state changes and side effects in your app.',
  },
  {
    id: '3',
    title: 'Navigation Patterns',
    difficulty: 'Intermediate',
    averageTime: '25 mins',
    description: 'Explore common navigation flows used in small mobile apps and how to structure them clearly.',
  },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTutorials() {
  await wait(100);
  return TUTORIALS;
}

export async function getTutorialById(id) {
  await wait(100);
  const tutorial = TUTORIALS.find((item) => item.id === id);

  if (!tutorial) {
    throw new Error('Tutorial not found.');
  }

  return tutorial;
}
