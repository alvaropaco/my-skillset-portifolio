import { isFunction } from './utils';

function User(name) {
  this.name = name;
  this.tasks = [];
}

User.prototype.addTask = function(task, callback) {
  if (task) {
    this.tasks.push(task);
    if (isFunction(callback)) {
      callback(null, task);
    }
  } else if (isFunction(callback)) {
    callback(new Error("Task is invalid"));
  }
};

export default User;
