import 'dotenv/config';

import { bootstrap } from './server';

bootstrap().catch(err => console.error(err));
