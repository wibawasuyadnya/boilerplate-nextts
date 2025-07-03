import { createHash } from 'crypto';

const originalKey = '@Encryption-SecKey+_PredikGameNagaHitam!!';
const secretKey = createHash('sha256').update(originalKey).digest('base64');

// Trim the base64-encoded string to 32 characters
const readableKey = secretKey.substring(0, 32);
console.log(readableKey.length); // Should output 32
console.log(readableKey); // Readable 32-byte key
