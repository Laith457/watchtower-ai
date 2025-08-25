// استيراد واجهة برمجة تطبيقات VS Code اللازمة
import * as vscode from 'vscode';

// هذه الدالة الرئيسية يتم استدعاؤها عند تفعيل الإضافة لأول مرة
export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "watchtower" is now active!');

    // إنشاء "مستمع" يتم تفعيله في كل مرة يتم فيها حفظ أي ملف
    vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
        
        // التحقق مما إذا كان اسم الملف المحفوظ ينتهي بـ 'package.json'
        if (document.fileName.endsWith('package.json')) {
            
            // إذا كان كذلك، أظهر رسالة معلومات للمستخدم في أسفل يمين الشاشة
            vscode.window.showInformationMessage('Watchtower: A change in package.json was detected!');
            
            // لاحقًا، سنقوم بإرسال محتوى الملف إلى الخادم الخلفي من هنا
        }
    });
}

// هذه الدالة يتم استدعاؤها عند إيقاف تفعيل الإضافة
export function deactivate() {}