import * as vscode from 'vscode';

let mark: vscode.Position | null = null;

export function activate(context: vscode.ExtensionContext) {

	const setMarkCommand = vscode.commands.registerCommand('select-region.setStartMark', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			mark = editor.selection.active;
				vscode.window.showInformationMessage('Start mark set');
		}
});

const setEndMarkCommand = vscode.commands.registerCommand('select-region.setEndMark', () => {
	const editor = vscode.window.activeTextEditor;
	if (editor && mark) {
			const currentPos = editor.selection.active;
			editor.selection = new vscode.Selection(mark, currentPos);
			vscode.window.showInformationMessage('Region selected');
	}
});



context.subscriptions.push(setMarkCommand);
context.subscriptions.push(setEndMarkCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {
	mark = null;
}
