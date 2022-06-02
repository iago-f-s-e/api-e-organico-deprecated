import { EncryptionTransformer } from 'typeorm-encrypted';

import * as Settings from '@src/server/settings';

export const myTransformer = new EncryptionTransformer({
  key: Settings.TRANSFORMER_KEY_SECURITY,
  algorithm: 'aes-256-cbc',
  ivLength: 16,
  iv: Settings.TRANSFORMER_KEY_IV
});
