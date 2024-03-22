import os

import torch
from transformers import AutoTokenizer, T5ForConditionalGeneration

from src.utils.prompts import codet5_js_ts_prompt

model_name = "mishasadhaker/codet5_large_typescript_v2"
device = torch.device('cuda:0') if torch.cuda.is_available() else None


def getTokenizer():
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    return tokenizer


def generateOutputs(inputs):
    model = T5ForConditionalGeneration.from_pretrained(model_name).to(device)
    return model.generate(inputs, max_length=1024, do_sample=True, temperature=0.7, num_beams=5)


def translate_js_to_ts(js_code):
    """
    Translates JavaScript code to TypeScript.

    Args:
            js_code (str): The JavaScript code to be translated.

    Returns:
            str: The translated TypeScript code.
    """
    input_text = codet5_js_ts_prompt(js_code)
    tokenizer = getTokenizer()
    input_ids = tokenizer.encode(input_text, return_tensors='pt', max_length=512, truncation=True).to(device)

    with torch.no_grad():
        output_ids = generateOutputs(input_ids)

    output = tokenizer.decode(output_ids[0], skip_special_tokens=True)

    return output


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
