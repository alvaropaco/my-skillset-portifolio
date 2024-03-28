# Task:

Implement a feature that removes the comments from a TypeScript code using the following
interfaces.

```typescript
interface ICodeCommentRemover {
    trimComment(c: string): void;
}

interface ICodeWriter {
    write(c: string): void;
}
```

The method TrimComment receives the TypeScript code char by char.

The interface ICodeWriter may have several implementations for different outputs (text
file, console). This implementation is not in the scope of your task.

Scenario:

Input:
```typescript
// some comments
var result = a / b;
```
Output:
```typescript
var result = a / b;
```
