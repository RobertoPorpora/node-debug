import Debug from './debug.js'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);


//------------------------------------------------------------------------------

let debug = new Debug();
debug.path = __filename;
//debug.terminal_output_enable = true;
//debug.terminal_timestamp_enable = true;
debug.file_output_enable = true;
debug.file_timestamp_enable = true;
//debug.file_history_enable = true;
debug.enable();

debug.log('Initialization', { status: 'success' });
debug.log('UserLogin', { username: 'john_doe', success: true });


//------------------------------------------------------------------------------
