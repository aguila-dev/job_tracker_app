// Utility to convert PEM to ArrayBuffer
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const binaryDerString = atob(
    pem.replace(/(-----(BEGIN|END) PUBLIC KEY-----|\n)/g, '')
  )
  const binaryDer = Uint8Array.from(binaryDerString, (char) =>
    char.charCodeAt(0)
  )
  return binaryDer.buffer
}

// Import the server's public key in the browser
export async function importPublicKey(pem: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'spki',
    pemToArrayBuffer(pem),
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt']
  )
}

// Encrypt data using the server's public key
export async function encryptDataWithPublicKey(
  plainText: string,
  publicKey: CryptoKey
): Promise<string> {
  const enc = new TextEncoder()
  const data = enc.encode(plainText)

  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    data
  )

  return arrayBufferToBase64(encrypted)
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

// Example usage: Encrypt data with the server's public key
export async function encryptAndSendData(
  plainText: string,
  publicKeyPem: string
): Promise<string> {
  const publicKey = await importPublicKey(publicKeyPem)
  return await encryptDataWithPublicKey(plainText, publicKey)
}
