// Problem Description – Retry Async Function Once

// You are given an asynchronous function fn. Your task is to return a new function that calls fn and retries it once if the first attempt fails. 
// If the second attempt also fails, the error should be properly propagated. 
// This problem tests error handling, retry logic, and correct use of async/await with Promises.

function retryOnce(fn) {
    return async function (...args) {
        try {
            await fn(...args);
            return "success"
        } catch (err) {
            try {
                await fn(...args);
                return "success"
            }
            catch (err) {
                throw err;
            }

        }
    }
}

module.exports = retryOnce;
