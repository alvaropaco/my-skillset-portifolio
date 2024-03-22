export default class Task {
  constructor(description) {
    this.description = description;
    this.done = false;
  }

  markAsDone() {
    this.done = true;
  }

  get status() {
    return this.done ? "completed" : "pending";
  }
}
