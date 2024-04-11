import * as vscode from "vscode";

let mark: vscode.Position | null = null;
let isSelecting = false;

export function activate(context: vscode.ExtensionContext) {
  const toggleMarkCommand = vscode.commands.registerCommand(
    "select-region.toggleMark",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      if (!isSelecting) {
        mark = editor.selection.active;
        isSelecting = true;
        vscode.window.showInformationMessage("Start mark set");
      } else {
        if (mark) {
          const currentPos = editor.selection.active;
          editor.selection = new vscode.Selection(mark, currentPos);
          vscode.window.showInformationMessage("Region selected");
        }
        isSelecting = false;
      }
    }
  );

  context.subscriptions.push(toggleMarkCommand);
}

export function deactivate() {
  mark = null;
}
