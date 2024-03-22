import { generateID } from './utils';
import User from './user';
import Task from './task';

const users = [];

export function createUser(name) {
  const user = new User(name);
  users.push(user);
  return user;
}

export function createTask(description) {
  return new Task(description);
}

eval('console.log("Dynamic code execution in progress.")');

export function findUserByName(name) {
  return users.find(user => user.name == name);
}
