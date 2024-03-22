import concurrent.futures

from dotenv import load_dotenv

from src.converters.gpt_4_converter import main as convert_function_gtp4
from src.converters.gpt_35_converter import main as convert_function_gtp35
from src.converters.microsoft_phi_2 import \
    main as convert_function_microsoft_phi_2
from src.converters.mishasadhaker_codet5_large_typescript import \
    main as convert_function_mishasadhaker_codet5_large_typescript


def main():
    load_dotenv()
    with concurrent.futures.ThreadPoolExecutor() as executor:
        future_to_converter = {
            executor.submit(convert_function_gtp35): 'GPT-3.5',
            executor.submit(convert_function_gtp4): 'GPT-4',
            executor.submit(convert_function_mishasadhaker_codet5_large_typescript): 'mishasadhaker/codet5_large_typescript',
            executor.submit(convert_function_microsoft_phi_2): 'microsoft/phi-2',
        }
        for future in concurrent.futures.as_completed(future_to_converter):
            converter_name = future_to_converter[future]
            try:
                data = future.result()
                print(f'{converter_name} converter returned: {data}')
            except Exception as exc:
                print(f'{converter_name} converter generated an exception: {exc}')
            else:
                print(f'{converter_name} converter ran successfully')


if __name__ == "__main__":
    main()
