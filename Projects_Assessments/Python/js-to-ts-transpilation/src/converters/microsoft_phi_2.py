import os

import torch
from dotenv import load_dotenv
from transformers import AutoModelForCausalLM, AutoTokenizer

from src.utils.prompts import phi2_js_ts_prompt

load_dotenv()

model_name = "microsoft/phi-2"


def generateOutputs(inputs):
    model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float32, trust_remote_code=True)
    return model.generate(**inputs, max_length=512, do_sample=True, top_k=50, top_p=0.95, num_return_sequences=1, temperature=0.7)


def getTokenizer():
    tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
    tokenizer.add_special_tokens({'pad_token': '[PAD]'})
    return tokenizer


def decodeOutputs(outputs, tokenizer):
    return tokenizer.batch_decode(outputs)[0]


def translate_js_to_ts(js_code):
    """
    Translates JavaScript code to TypeScript.

    Args:
            js_code (str): The JavaScript code to be translated.

    Returns:
            str: The translated TypeScript code.
    """
    input_text = phi2_js_ts_prompt(js_code)

    tokenizer = getTokenizer()
    inputs = tokenizer(input_text, return_tensors="pt", padding=True, truncation=True, return_attention_mask=True)

    outputs = generateOutputs(**inputs)
    text = decodeOutputs(outputs, tokenizer)
    return text


def read_file(file_path):
    """
    Read the contents of a file and return it as a string.

    Args:
            file_path (str): The path to the file to be read.

    Returns:
            str: The contents of the file.

    """
    with open(file_path, "r") as file:
        return file.read()


def write_file(file_path, content):
    """
    Write content to a file at the specified file path.

    Args:
            file_path (str): The path to the file.
            content (str): The content to be written to the file.
    """
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as file:
        file.write(content)


def translate_directory(js_directory, ts_directory):
    """
    Translates all JavaScript files in the given directory to TypeScript and saves them in the specified TypeScript directory.

    Args:
            js_directory (str): The directory containing the JavaScript files.
            ts_directory (str): The directory where the translated TypeScript files will be saved.
    """
    for filename in os.listdir(js_directory):
        if filename.endswith(".js"):
            js_file_path = os.path.join(js_directory, filename)
            ts_file_path = os.path.join(
                ts_directory, os.path.splitext(filename)[0] + ".ts"
            )

            js_code = read_file(js_file_path)
            ts_code = translate_js_to_ts(js_code)
            write_file(ts_file_path, ts_code)
            print(f"Translated TypeScript code saved to {ts_file_path}")


def main():
    js_directory = os.getenv("DIR_JS_CODEBASE")

    ts_directory = os.getenv("DIR_TS_CODEBASE") + "/" + model_name

    translate_directory(js_directory, ts_directory)


if __name__ == "__main__":
    main()
