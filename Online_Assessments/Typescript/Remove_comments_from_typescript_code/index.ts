const emptyChar = '';

interface ICodeCommentRemover {
    trimComment(c: string): void;
}

interface ICodeWriter {
    write(c: string): void;
}

class CodeCommentRemover implements ICodeCommentRemover{
    private _currentChar: string;
    private _previousChar: string;
    private _skipNextChar: boolean;
    private _insideBlockComment: boolean;
    private _insideSingleComment: boolean;
    private _backSlash: boolean;
    private _accumulatedEoL: number;
    private _output: string[] = [];

    constructor() {
        this._currentChar = '';
        this._previousChar = '';
        this._skipNextChar = false;
        this._insideBlockComment = false;
        this._insideSingleComment = false;
        this._backSlash = false;
        this._accumulatedEoL = 0;
    }

    /**
     * Sets the output string.
     * 
     * @param str - The string to set as the output.
     */
    setOutput(str?: string): void {
        this._previousChar = this._currentChar;
        if(this._skipNextChar) return;
        if(str){
            str.split("").forEach((char) => this._output.push(char));
        }
    }

    /**
     * Retrieves the output as a string.
     * @returns The output joined as a string.
     */
    getOutput(): string {
        return this._output.join(emptyChar);
    }

    /**
     * Removes the last item from the output array.
     * If a string is provided, it will only remove the last item if it matches the provided string.
     * @param str - Optional string to match against the last item in the output array.
     */
    removeLastOutputItem(str?: string): void {
        if(!str) {
            this._output.pop();
        } else {
            this._output = this._output[this._output.length - 1] === str ? this._output.slice(0, this._output.length - 1) : this._output;
        }
    }

    /**
     * Trims comments from a given string.
     * @param c - The current character to process.
     * @remarks
     * This method removes comments from a string by processing each character and determining if it is part of a comment or not.
     * It supports both single-line and block comments in TypeScript code.
     * The method updates the internal state of the class instance and generates the output string without the comments.
     */
    trimComment(c: string): void {
        this._currentChar = c;
        const openSingleLineCommentOperator = '//';
        const openBlockCommentOperator = '/*';
        const closeBlockCommentOperator = '*/';
        const EoL = '\n';
        const previousTwoChars = `${this._previousChar}${this._currentChar}`;

        // Exiting block comment mode
        if (this._insideBlockComment && previousTwoChars === closeBlockCommentOperator) {
            if(this._backSlash) this._backSlash = false;
            this._insideBlockComment = false;
            if(this._output[this._output.length - 1] === EoL) {
                this.removeLastOutputItem();
            }
            this.setOutput();
            return;
        }

        // Check if entering a block comment
        if (!this._insideBlockComment && previousTwoChars === openBlockCommentOperator) {
            this._insideBlockComment = true;
            this.setOutput();
            return;
        }

        // Inside block comment, ignore everything until we find the closing */
        if (this._insideBlockComment) {
            this.setOutput();
            return;
        }

        // Handling single-line comments
        if (previousTwoChars === openSingleLineCommentOperator) {
            if(this._backSlash) {
                this._backSlash = false;
            }
            this._currentChar = emptyChar;
            this._previousChar = emptyChar;
            this._skipNextChar = true;
            this.setOutput();
            return;
        }

        // If we are at the end of the line, reset skip flag
        if (this._currentChar === EoL && this._skipNextChar) {
            this._skipNextChar = false;
            // Reset to handle block comments correctly
            this.removeLastOutputItem('\n');
            this.setOutput(EoL);
            return;
        }

        // If the previous ite was a single backslash, should preserve
        // it and the next character
        if(this._backSlash && this._currentChar != '/' && !this._skipNextChar) {
            this._backSlash = false;
            this.setOutput(`/${this._currentChar}`)
            return;
        }

        // check if it is a single line backslash
        if(!this._skipNextChar && this._previousChar !== '/' && this._currentChar === '/') {
            this._backSlash = true;
            this._previousChar = this._currentChar;
            return;
        }

        // if we are skipping the next character, do not return it
        if (this._skipNextChar) {
            this.setOutput();
            return
        }

        // If not skipping, prepare for next char
        this.setOutput(this._currentChar);
        return;
    }
}

class CodeWriter implements ICodeWriter {
    private _commentRemover: CodeCommentRemover;

    constructor() {
        this._commentRemover = new CodeCommentRemover();
    }

    write(c: string): void {
        return this._commentRemover.trimComment(c);
    }

    writeCode(code: string): string {
        let result = emptyChar;
        for(let i = 0; i < code.length; i++) {
            result += this.write(code[i]);
        }
        return result;
    }

    getOutput(): string {
        return this._commentRemover.getOutput();
    }
}

const writer = new CodeWriter();

writer.writeCode(`
import { GET_ACCOUNT_FUNC_ENDPOINT, IAccount } from '@mobile-platform/common';
import { useQuery } from 'react-query';
import { useIdToken } from './useIdToken';
import useRemoteConfig from './useRemoteConfig';

function useGetAccountById(id: string | null) {
  const { configValues } = useRemoteConfig(['get_account_func_endpoint'], {
    get_account_func_endpoint: GET_ACCOUNT_FUNC_ENDPOINT,
  });
  const { idToken, getIdTokenAsync } = useIdToken();

  const fetchAccountInfo = async () => {
    if (!id) {
      console.warn('fetchAccountInfo: id is required');
      return null;
    }

    const token = idToken ?? (await getIdTokenAsync()); // we need to get this token from firebase User.getIdToken() insteadm firebase/auth

    if (!token) throw new Error('token is required');
    if (!response.ok) {
      throw new Error('Token validation failed');
    }
    return response.json();
  };

  return useQuery<IAccount, Error>(['accountInfo', id], fetchAccountInfo, {
    enabled: Boolean(id),
    staleTime: 0, // 5 minutes
    cacheTime: 0, // 1 hour
  });
}

export default useGetAccountById;

`);

console.log(writer.getOutput());
