//------------------------------------------------------------------------------
// copy this into the script you want to debug

import os from 'os'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const debug = {
    enabled: false,
    filePath: '',
    enable: function () {
        this.enabled = true;
        const __filename = fileURLToPath(import.meta.url);
        const scriptDirectory = path.dirname(__filename);
        const debugDirectory = path.join(scriptDirectory, 'debug');
        if (!fs.existsSync(debugDirectory)) {
            fs.mkdirSync(debugDirectory);
        }
        const scriptFileName = path.basename(__filename, path.extname(__filename));
        this.filePath = path.join(debugDirectory, `${scriptFileName}.debug.log`);
        fs.writeFileSync(this.filePath, '', 'utf8');
    },
    log: function (description, object) {
        if (this.enabled === false)
            return
        const date = new Date().toISOString();
        const logEntry = `${date} ${description} ${JSON.stringify(object)}${os.EOL}`;
        fs.appendFileSync(this.filePath, logEntry, 'utf8');
    }
};


//------------------------------------------------------------------------------
// Example usage

debug.enable();
debug.log('Initialization', { status: 'success' });
debug.log('UserLogin', { username: 'john_doe', success: true });


//------------------------------------------------------------------------------
