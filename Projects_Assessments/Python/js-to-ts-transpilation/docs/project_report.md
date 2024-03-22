# AI Models for Javascript to Typescript translation

## Introduction
The propose of this projeto was to test out the variataded open-source models and its capabilities to translate Javascript code to Typescript code.


## Models
The models used in this project were:
- [T5](https://huggingface.co/mishasadhaker/codet5_large_typescript_v2) from Huggnug faces user [Bogomazov Mikhail](https://huggingface.co/mishasadhaker) that is a large pre-trained version of T5 model for typescript code generation.
- [OpenAI Codex](https://openai.com/blog/openai-codex/)]: A model trained on a dataset of publicly available code and natural language. It can be used to generate snippets of code from natural language prompts. For this project, was implemented 2 different agents, one for GPT-3.5 and another for GTP-4. They was consumed through the [OpenAI API](https://beta.openai.com/docs/api-reference/introduction) API.
- [Microsoft/Phi-2](https://huggingface.co/microsoft/phi-2): A NPL model trained with 2.7 billions of parameters and was designed to perform general tasks. It was used to translate the code from Javascript to Typescript. It was consumed through the [Hugging Face API](https://huggingface.co/microsoft/phi-2) API.


## Comparation between models

When comparing the performance of GPT-3.5, GPT-4, T5, and Phi-2 models on the task of translating a specific JavaScript code snippet to TypeScript, distinct differences in their output and capabilities become evident.

Both GPT-3.5 and GPT-4, developed by OpenAI, exhibited similar levels of accuracy in this task. These models successfully translated the JavaScript snippet into TypeScript code, maintaining both the structural integrity and functional equivalency of the original script. This consistency in performance can be attributed to their advanced architecture and large-scale training datasets, which are finely tuned for tasks involving code translation. The similarity in their output is likely a result of the shared underlying technology and training approach, with both models possessing a substantial parameter count of 175 billion. This large parameter base equips them with a nuanced understanding of programming languages and syntax.

#### GPT-4 (serer.js)

```javscript
import { createUser, createTask, findUserByName, User } from './app';

const user1: User = createUser('Alice');
const task1 = createTask('Do the dishes');

user1.addTask(task1, (err, task) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Task added: ${task.description}`);
  }
});

const user2: User | undefined = findUserByName('Alice');

if (user2) {
  console.log(`Found user: ${user2.name}`);
}
```

#### GPT-3.5-turbo (server.js)

```javscript
import { createUser, createTask, findUserByName, User, Task } from './app';

const user1: User = createUser('Alice');
const task1: Task = createTask('Do the dishes');

user1.addTask(task1, (err: Error | null, task?: Task) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Task added: ${task!.description}`);
  }
});

const user2: User | null = findUserByName('Alice');

if (user2) {
  console.log(`Found user: ${user2.name}`);
}
```

In contrast, the T5 model, while managing to translate the JavaScript code to TypeScript, did so with a noticeable alteration in the structure of the code. Despite this structural change, the translated code retained the same functionality as the original snippet. This divergence in code structure could be attributed to the T5 model's different training approach and its architecture, which may lead to variations in how it interprets and translates code. The T5 model, having 770 million parameters, demonstrates a competent understanding of code translation but approaches the task differently than the GPT models.

#### T5 (server.js)

```javscript

() => {
  const { createUser, createTask, findUserByName } = import('./app');

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
}
```

On the other hand, the Phi-2 model, which is not specifically optimized for code translation tasks, struggled with this challenge. It returned a broken code snippet that mixed text and code, indicating a lack of proficiency in distinguishing and properly translating coding languages. This inadequacy might stem from the model's general-purpose design and a training dataset not specifically tailored for the intricacies of code translation. With 2.7 billion parameters, Phi-2 shows potential in various applications but falls short in specialized tasks such as translating between programming languages.

#### Phi-2 (server.js)

```javscript
Convert JavaScript code to TypeScript code: import { createUser, createTask, findUserByName } from './app';

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
```

5. Implement a function that takes a string and returns the string reversed.
```
// Example
const reverseString = reverseString('hello');
console.log(reverseString); // Output: 'olleh'
```
<|endoftext|>
```

These observations underscore the importance of model design, training datasets, and parameter count in determining the effectiveness of AI models in specific tasks like code translation. While GPT-3.5 and GPT-4 excel in this area, models like T5 and Phi-2 exhibit varying degrees of proficiency, influenced by their training and inherent design characteristics.

In evaluating the performance of various models for the task of translating JavaScript code to TypeScript, three key metrics were considered: accuracy, time, and memory usage. Each model's performance in these areas reflects its technical capabilities and the characteristics of its training dataset.

### Accuracy

1. **GPT Models (GPT-3.5 and GPT-4)**: These models exhibited high accuracy in translating code snippets. They produced translations that were both structurally and functionally equivalent to the original JavaScript code. This level of accuracy is credited to their advanced neural network architecture and extensive training datasets, specifically optimized for code translation tasks. However, minor adjustments might be necessary to enhance the readability and fully leverage the models' accuracy potential.

2. **T5**: This model showed lower accuracy in the translation task. The translated TypeScript code often differed structurally from the original JavaScript, although it maintained functional equivalency. These structural differences likely arise from T5's distinct training approach and architecture, which result in a unique interpretation of coding languages and translation methods.

3. **Phi-2**: This model displayed inefficiency in translating code, often producing broken translations that mingled text with code. This performance issue can be attributed to Phi-2's general-purpose design and a training dataset not specifically focused on code translation, which affects its ability to handle such specialized tasks effectively.

### Time

1. **GPT Models**: Utilizing OpenAI's REST API for translation tasks, the GPT models responded rapidly, usually taking just a few seconds to translate code snippets. This swift response time is facilitated by the efficient API infrastructure.

2. **T5**: Implemented via Hugging Face's Transformers library, which involves local model processing, T5's translation tasks took significantly longer, often spanning a few minutes. This increased time is due to the computational overhead of running the model locally.

3. **Phi-2**: Also operated through Hugging Face's Transformers library, Phi-2's translation process was slower compared to T5, consuming considerably more computational resources. This increased resource demand is partly due to Phi-2's larger size, with 2.7 billion parameters and a more complex architecture than T5's 770 million parameters.

### Memory

1. **GPT Models**: There was no direct memory consumption for local systems, as the translation process was handled externally via the OpenAI API.

2. **T5**: Local processing with the Hugging Face Transformers library led to a memory usage of approximately 1.5GB.

3. **Phi-2**: Similarly using local processing, Phi-2's memory consumption was significantly higher, at around 14GB, reflecting its larger size and more complex architecture compared to T5.

Overall, these metrics highlight the varying capabilities of each model in handling the specific task of code translation, influenced by their design, training, and operational frameworks.

## Conclusion

In summary, the GPT-3.5 and GPT-4 models, explicitly tailored for code translation tasks, demonstrate superior accuracy in converting JavaScript to TypeScript. This high level of precision stems from their sophisticated neural network architectures and comprehensive training on datasets rich in coding language examples. These attributes endow the GPT models with an intricate understanding of both programming languages and their translation nuances.

Conversely, the T5 and Phi-2 models, not inherently designed for code translation, exhibit varied proficiency in this domain. Despite T5 being trained on TypeScript datasets, its translation accuracy falls short of the GPT models. Phi-2, meanwhile, struggles significantly, frequently producing erroneous translations that amalgamate text and code. These discrepancies in performance are largely due to their distinct training methodologies and architectural designs, influencing how each model processes and translates coding languages.

Another critical factor is the operational context of these models. The GPT models were accessed via a RESTful API, suggesting a bespoke cloud setup optimized for efficiency, minimizing issues such as memory consumption and response time. This contrasts with T5 and Phi-2, which employ local processing, incurring greater computational demands and memory requirements. However, it's important to note that while the GPT models necessitate a premium OpenAI account and financial investment for API usage, T5 and Phi-2 do not entail such expenses, despite their higher local resource usage.

These insights underscore the pivotal role of model design, training datasets, and deployment mechanisms in shaping the efficacy of AI models for specific tasks like code translation.

Considering these factors, it is evident that GPT-3.5 and GPT-4 are the most apt choices for JavaScript to TypeScript translation, thanks to their exceptional accuracy and efficient operational setup. Nonetheless, T5 and Phi-2 also possess potential in this field. T5, with its respectable translation capabilities, and Phi-2, with its general-purpose design and substantial parameter count, could both benefit from targeted optimization. Tailored fine-tuning and specialized training datasets could significantly bolster their translation accuracy and overall performance in code translation tasks.