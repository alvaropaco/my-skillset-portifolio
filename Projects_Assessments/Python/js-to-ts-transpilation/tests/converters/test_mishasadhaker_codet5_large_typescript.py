import unittest
from unittest.mock import MagicMock, mock_open, patch

import torch

import src.converters.mishasadhaker_codet5_large_typescript as converter


class TestConverter(unittest.TestCase):
    def setUp(self):
        patch('src.converters.mishasadhaker_codet5_large_typescript.getTokenizer', return_value=MagicMock()).start()

    def tearDown(self):
        patch.stopall()

    def test_read_file(self):
        test_data = "console.log('Hello, world!');"
        with patch("builtins.open", mock_open(read_data=test_data)) as mock_file:
            result = converter.read_file("dummy/path")
            mock_file.assert_called_once_with("dummy/path", "r")
            self.assertEqual(result, test_data)

    def test_write_file(self):
        test_data = "const greeting: string = 'Hello, world!';"
        with patch("builtins.open", mock_open(read_data='')) as mock_file:
            converter.write_file("dummy/path", test_data)
            mock_file.assert_called_once_with("dummy/path", "w")
            mock_file.return_value.write.assert_called_once_with(test_data)

    @patch("os.listdir")
    @patch("os.path.join")
    @patch("src.converters.mishasadhaker_codet5_large_typescript.translate_js_to_ts")
    def test_translate_directory(self, mock_translate, mock_join, mock_listdir):
        mock_listdir.return_value = ["test.js"]
        mock_join.side_effect = lambda a, b: f"{a}/{b}"

        mock_read = patch("src.converters.mishasadhaker_codet5_large_typescript.read_file", return_value="console.log('Hello, world!');").start()
        mock_write = patch("src.converters.mishasadhaker_codet5_large_typescript.write_file").start()
        mock_translate.return_value = "console.log('Hello, world!') as string;"

        converter.translate_directory("js_dir", "ts_dir")

        mock_read.assert_called_once_with("js_dir/test.js")
        mock_translate.assert_called_once_with("console.log('Hello, world!');")
        mock_write.assert_called_once_with("ts_dir/test.ts", "console.log('Hello, world!') as string;")

        mock_read.stop()
        mock_write.stop()

    @patch("src.converters.mishasadhaker_codet5_large_typescript.generateOutputs")
    @patch("src.converters.mishasadhaker_codet5_large_typescript.getTokenizer")
    @patch("src.converters.mishasadhaker_codet5_large_typescript.codet5_js_ts_prompt")
    def test_translate_js_to_ts(self, mock_prompt, mock_get_tokenizer, mock_generate):
        mock_prompt.return_value = "Prompt for T5"
        mock_get_tokenizer.return_value = MagicMock(encode=MagicMock(return_value=torch.tensor([0, 1, 2])))
        mock_generate.return_value = MagicMock(spec=torch.Tensor)
        mock_generate.return_value.tolist.return_value = [0, 1, 2]

        tokenizer = mock_get_tokenizer()
        tokenizer.decode = MagicMock(return_value="const greeting: string = 'Hello, world!';")

        result = converter.translate_js_to_ts("console.log('Hello, world!');")
        self.assertEqual(result, "const greeting: string = 'Hello, world!';")

        mock_prompt.assert_called_once_with("console.log('Hello, world!');")
        mock_get_tokenizer.assert_called()
        mock_generate.assert_called_once()


if __name__ == '__main__':
    unittest.main()
