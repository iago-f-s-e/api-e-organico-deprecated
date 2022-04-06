import 'dotenv/config';

import fs from 'fs';
import { connection } from './connection-options';

fs.writeFileSync('ormconfig.json', JSON.stringify({ ...connection, host: 'localhost' }, null, 2));
