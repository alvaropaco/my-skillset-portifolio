import { createUser, createTask, findUserByName } from './app';

const user1 = createUser('Alice');
const task1 = createTask('Do the dishes');

user1.addTask(task1, (err, task) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Task added: ${task.description}`);
  }
});

const user2 = findUserByName('Alice');

if (user2) {
  console.log(`Found user: ${user2.name}`);
}
