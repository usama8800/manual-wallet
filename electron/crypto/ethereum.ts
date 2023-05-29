import { Keccak, KeccakAlgorithm, default as createKeccakHash } from 'keccak';
import randomBytes from 'randombytes';
import * as secp256k1 from 'secp256k1';
import { TransformOptions } from 'stream';

const keccak: (algorithm: KeccakAlgorithm, options?: TransformOptions) => Keccak = createKeccakHash as any;

function privateToAddress(privateKey: Buffer) {
  const pub = secp256k1.publicKeyCreate(privateKey, false).slice(1);
  return keccak('keccak256').update(Buffer.from(pub)).digest().subarray(-20).toString('hex');
}

export function getRandomWallet() {
  const randbytes = randomBytes(32);
  return {
    address: '0x' + privateToAddress(randbytes),
    privateKey: randbytes.toString('hex'),
  };
}
