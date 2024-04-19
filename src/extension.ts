import * as vscode from "vscode";

let mark: vscode.Position | null = null;
let isSelecting = false;
let statusBarItem: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  context.subscriptions.push(statusBarItem);

  const toggleMarkCommand = vscode.commands.registerCommand(
    "select-region.toggleMark",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      if (isSelecting) {
        if (mark) {
          const currentPos = editor.selection.active;
          editor.selection = new vscode.Selection(mark, currentPos);
        }
        isSelecting = false;
        statusBarItem.hide();
      } else {
        mark = editor.selection.active;
        isSelecting = true;
        statusBarItem.text = "Start mark set";
        statusBarItem.show();
      }
    }
  );
  context.subscriptions.push(toggleMarkCommand);
}

export function deactivate() {
  mark = null;
}
