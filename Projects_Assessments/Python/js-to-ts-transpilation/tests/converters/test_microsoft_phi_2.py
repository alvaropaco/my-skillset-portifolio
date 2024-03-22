import unittest
from unittest.mock import MagicMock, patch

import src.converters.microsoft_phi_2 as converter


class TestConverter(unittest.TestCase):

    @patch('src.converters.microsoft_phi_2.open', new_callable=unittest.mock.mock_open, read_data="console.log('Hello, world!');")
    def test_read_file(self, mock_file):
        result = converter.read_file("dummy/path")
        mock_file.assert_called_once_with("dummy/path", "r")
        self.assertEqual(result, "console.log('Hello, world!');")

    @patch('src.converters.microsoft_phi_2.open', new_callable=unittest.mock.mock_open)
    def test_write_file(self, mock_file):
        test_data = "const greeting: string = 'Hello, world!';"
        converter.write_file("dummy/path", test_data)
        mock_file.assert_called_once_with("dummy/path", "w")
        mock_file().write.assert_called_once_with(test_data)

    @patch('src.converters.microsoft_phi_2.generateOutputs')
    @patch('src.converters.microsoft_phi_2.getTokenizer')
    @patch('src.converters.microsoft_phi_2.decodeOutputs')
    def test_translate_js_to_ts(self, mock_decode, mock_get_tokenizer, mock_generate):
        mock_get_tokenizer.return_value = MagicMock()
        mock_generate.return_value = MagicMock()
        mock_decode.return_value = "Translated TypeScript code"

        result = converter.translate_js_to_ts("console.log('Hello, world!');")
        self.assertEqual(result, "Translated TypeScript code")

    @patch('src.converters.microsoft_phi_2.os.listdir', return_value=["test.js"])
    @patch('src.converters.microsoft_phi_2.os.path.join', side_effect=lambda a, b: f"{a}/{b}")
    @patch('src.converters.microsoft_phi_2.read_file', return_value="console.log('Hello, world!');")
    @patch('src.converters.microsoft_phi_2.write_file')
    @patch('src.converters.microsoft_phi_2.translate_js_to_ts', return_value="console.log('Hello, world!') as string;")
    def test_translate_directory(self, mock_translate, mock_write, mock_read, mock_join, mock_listdir):
        converter.translate_directory("js_dir", "ts_dir")
        mock_read.assert_called_once_with("js_dir/test.js")
        mock_translate.assert_called_once_with("console.log('Hello, world!');")
        mock_write.assert_called_once_with("ts_dir/test.ts", "console.log('Hello, world!') as string;")


if __name__ == '__main__':
    unittest.main()
