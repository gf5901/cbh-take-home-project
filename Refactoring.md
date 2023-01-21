# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. I pulled out constants from the functions to declutter them. 
2. I pulled out the hashing logic into a function to reduce duplicate code and make it easier to test.
3. I pulled out the logic for getting the partition key out of the event for readability. Also makes it easier to test smaller chunks of functionality.
4. I added comments to each line to explain what is going on.
5. I renamed some of the variables to make it clearer to me what they were used for.
6. I moved the initialization of candidate to where the variable is created.