const secret = process.env.SESSION_SECRET || 'default_secret';

const getKey = async () => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(secret),
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: enc.encode('some_salt'),
            iterations: 100000,
            hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
};

export const encrypt = async (data: string) => {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await getKey();
    const enc = new TextEncoder();
    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        enc.encode(data)
    );

    const encryptedArray = new Uint8Array(ciphertext);
    const resultBuffer = new Uint8Array(iv.length + encryptedArray.length);
    resultBuffer.set(iv, 0);
    resultBuffer.set(encryptedArray, iv.length);

    return Buffer.from(resultBuffer).toString('base64');
};

export const decrypt = async (encrypted: string) => {
    const data = Buffer.from(encrypted, 'base64');
    const iv = data.slice(0, 12);
    const ciphertext = data.slice(12);

    const key = await getKey();
    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        ciphertext
    );

    return new TextDecoder().decode(decrypted);
};
