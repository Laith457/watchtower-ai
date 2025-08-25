// Import the necessary parts of the VS Code and axios APIs
import * as vscode from 'vscode';
import axios from 'axios';

// This function is called when your extension is activated
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "watchtower" is now active!');

    // Create a listener that triggers whenever a document is saved
    vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
        
        // Check if the saved file is named 'package.json'
        if (document.fileName.endsWith('package.json')) {
            
            vscode.window.showInformationMessage('Watchtower: Change detected! Sending to server for analysis...');
            
            // --- NEW CODE STARTS HERE ---
            try {
                // The URL of our running Python server's endpoint
                const serverUrl = 'http://127.0.0.1:8000/analyze';
                
                // Get the full text content of the saved file
                const fileContent = document.getText();
                
                // Send the file content to the server using an HTTP POST request
                const response = await axios.post(serverUrl, {
                    content: fileContent
                });
                
                // Log the server's response to the debug console
                console.log('Server response:', response.data);
                vscode.window.showInformationMessage('Watchtower: Analysis request sent successfully!');
                
            } catch (error) {
                // If an error occurs (e.g., server is not running), show an error message
                console.error('Error sending data to server:', error);
                vscode.window.showErrorMessage('Watchtower: Failed to connect to analysis server.');
            }
            // --- NEW CODE ENDS HERE ---
        }
    });
}

// This function is called when your extension is deactivated
export function deactivate() {}