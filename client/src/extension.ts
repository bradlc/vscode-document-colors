import * as path from 'path'
import { ExtensionContext } from 'vscode'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'

let client: LanguageClient

export async function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'))

  client = new LanguageClient(
    'example',
    'Example',
    {
      run: {
        module: serverModule,
        transport: TransportKind.ipc,
      },
      debug: {
        module: serverModule,
        transport: TransportKind.ipc,
      },
    },
    { documentSelector: [{ scheme: 'file', language: 'html' }] }
  )
  client.start()
}

export function deactivate(): Promise<void> {
  return client?.stop()
}
