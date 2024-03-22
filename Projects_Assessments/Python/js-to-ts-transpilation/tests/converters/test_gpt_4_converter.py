import unittest
from unittest.mock import MagicMock, mock_open, patch

import src.converters.gpt_4_converter as gpt_4_converter


class TestGPT35Converter(unittest.TestCase):

    def setUp(self):
        self.mock_openai_patch = patch('src.converters.gpt_4_converter.get_openai_client')
        self.mock_openai = self.mock_openai_patch.start()
        mock_client = MagicMock()
        mock_client.chat.completions.create.return_value = MagicMock(
            choices=[MagicMock(message=MagicMock(content="Translated TypeScript"))])
        self.mock_openai.return_value = mock_client

    def tearDown(self):
        self.mock_openai_patch.stop()

    def test_translate_js_to_ts(self):
        result = gpt_4_converter.translate_js_to_ts("const a = 'Hello';")
        self.assertEqual(result, "Translated TypeScript")

    @patch("builtins.open", new_callable=mock_open, read_data="data")
    def test_read_file(self, mock_file):
        self.assertEqual(gpt_4_converter.read_file("dummy/path"), "data")

    @patch("builtins.open", new_callable=mock_open)
    @patch("os.makedirs")
    def test_write_file(self, mock_makedirs, mock_file):
        gpt_4_converter.write_file("dummy/path", "content")
        mock_file.assert_called_once_with("dummy/path", "w")
        mock_file().write.assert_called_once_with("content")

    @patch("os.listdir")
    @patch("os.path.join")
    @patch("src.converters.gpt_4_converter.translate_js_to_ts")
    def test_translate_directory(self, mock_translate, mock_join, mock_listdir):
        mock_listdir.return_value = ["test.js"]
        mock_join.side_effect = lambda a, b: f"{a}/{b}"

        with patch("src.converters.gpt_4_converter.read_file", return_value="console.log('Hello, world!');") as mock_read, patch("src.converters.gpt_4_converter.write_file") as mock_write:

            mock_translate.return_value = "console.log('Hello, world!') as string;"

            gpt_4_converter.translate_directory("js_dir", "ts_dir")

            mock_read.assert_called_once_with("js_dir/test.js")

            mock_translate.assert_called_once_with("console.log('Hello, world!');")

            mock_write.assert_called_once_with("ts_dir/test.ts", "console.log('Hello, world!') as string;")


if __name__ == '__main__':
    unittest.main()
