# README.md for JavaScript to TypeScript Conversion Tool

## Overview
This tool is designed to convert JavaScript code to TypeScript using various AI models, including GPT-3.5, GPT-4, Microsoft PHI-2, and Mishasadhaker CodeT5 Large TypeScript. The script runs these models in parallel to process and translate JavaScript files efficiently.

## Prerequisites
- Python 3.9 or later.
- PyTorch (if using models that require it).
- An internet connection (for downloading model weights and tokenizer data).
- An API key from OpenAI (for GPT-3.5 and GPT-4 models).

## Installation
1. **Clone the Repository**: Clone this repository to your local machine using:
   ```
   git clone <repository-url>
   ```
2. **Install Dependencies**: Navigate to the cloned directory and install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

## Configuration
- Set up your environment variables in a `.env` file at the root of the project. This file should include the OpenAI API key and any other necessary configuration parameters. This repository includes a `.env.sample` file that you can use as a template.

## Running the Tool
To run the conversion tool, execute the main script from the command line:
```
python main.py
```
This will start the process of converting JavaScript files using the different AI models in parallel.

## Testing
To ensure that the tool is functioning correctly, you can run the included unit tests. These tests check the functionality of each converter separately.
- Run the tests using the following command:
  ```
  pytest
  ```

## Notes
- **Parallel Execution**: The script uses `concurrent.futures.ThreadPoolExecutor` to run the models in parallel, which may speed up the process significantly, depending on your system's capabilities.
- **Error Handling**: The script includes basic error handling for each model. If an exception occurs in any model, it will be printed to the console.
- **Customization**: You can modify the script or the individual converters to suit specific needs or to integrate other models.
