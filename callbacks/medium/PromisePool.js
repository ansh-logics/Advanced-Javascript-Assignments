// Problem Description – Asynchronous Worker Pool

// You are required to create a worker pool that manages the execution of asynchronous tasks. 
// The pool should ensure that no more than N tasks are running concurrently, while any additional tasks are queued. 
// As tasks complete, queued tasks should start automatically.
// Each task must resolve with its own result.

class PromisePool {
  constructor(limit) {
    this.N = limit;
    this.queue = [];
    this.running = 0;
  }
  run(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject});
      this._process();
    });
  }


  _process() {
    while (this.running < this.N && this.queue.length > 0) {
      let item = this.queue.shift();
      this.running++;

      Promise.resolve()
        .then(item.task)
        .then(result => item.resolve(result))
        .catch(err => item.reject(err))
        .finally(() => {
          this.running--;
          this._process();
        });
    }
  }
}

module.exports = PromisePool;
