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
    private _backSlash: boolean;

    constructor() {
        this._currentChar = '';
        this._previousChar = '';
        this._skipNextChar = false;
        this._insideBlockComment = false;
        this._backSlash = false;
    }

    trimComment(c: string): string {
        this._currentChar = c;
        const emptyChar = '';
        const openSingleLineCommentOperator = '//';
        const openBlockCommentOperator = '/*';
        const closeBlockCommentOperator = '*/';
        const EoL = '\n';
        const previousTwoChars = `${this._previousChar}${this._currentChar}`;

        // Exiting block comment mode
        if (this._insideBlockComment && previousTwoChars === closeBlockCommentOperator) {
            if(this._backSlash) this._backSlash = false;
            this._insideBlockComment = false;
            this._previousChar = '';
            return emptyChar;
        }

        // Check if entering a block comment
        if (!this._insideBlockComment && previousTwoChars === openBlockCommentOperator) {
            this._insideBlockComment = true;
            this._previousChar = this._currentChar; // Keep current char to check for closing */
            return emptyChar;
        }

        // Inside block comment, ignore everything until we find the closing */
        if (this._insideBlockComment) {
            this._previousChar = this._currentChar;
            return emptyChar;
        }

        // Handling single-line comments
        if (previousTwoChars === openSingleLineCommentOperator) {
            if(this._backSlash) {
                this._backSlash = false;
            }
            this._skipNextChar = true;
        }

        // If we are at the end of the line, reset skip flag
        if (this._currentChar === EoL && this._skipNextChar) {
            this._skipNextChar = false;
            this._previousChar = ''; // Reset to handle block comments correctly
            return c;
        }

        // If the previous ite was a single backslash, should preserve
        // it and the next character
        if(this._backSlash && !this._skipNextChar) {
            this._backSlash = false;
            this._previousChar = this._currentChar;
            return `/${this._currentChar}`
        }

        // check if it is a single line backslash
        if(!this._skipNextChar && this._previousChar !== '/' && this._currentChar === '/') {
            this._backSlash = true;
            this._previousChar = this._currentChar;
            return emptyChar;
        }

        // if we are skipping the next character, do not return it
        if (this._skipNextChar) {
            this._previousChar = c;
            return emptyChar;
        }

        // If not skipping, prepare for next char
        this._previousChar = this._currentChar;

        return this._currentChar;
    }
}

class CodeWriter implements ICodeWriter {
    private _commentRemover: ICodeCommentRemover;

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
}

const writer = new CodeWriter();

console.log(writer.writeCode(`
Line commented // This is a comment
Line not commented
Another line commented // This is another comment
Foo / bar
/* This is a block comment 
    dsl;kdjfljsdfl
*/
removed
`));
