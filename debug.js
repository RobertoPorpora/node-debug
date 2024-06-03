import os from 'os';
import fs from 'fs';
import path from 'path';

function get_timestamp() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    return `${year}${month}${day}_${hours}${minutes}${seconds}_${milliseconds}`;
}

class Debug {

    // global enable
    enabled = false;

    // file path
    path = null;

    // FLAGS options
    terminal_output_enable = false;
    terminal_timestamp_enable = false;
    file_output_enable = false;
    file_timestamp_enable = false;
    file_history_enable = false;

    // constructor (nothing to do here)
    constructor() { }

    // enable logging and set things up
    enable() {

        // globally enable logging
        this.enabled = true;

        // set things up for file logging
        if (this.file_output_enable && this.path != null) {

            // calculate path directory
            const script_dir = path.dirname(this.path);
            const debug_dir = path.join(script_dir, 'debug');
            if (!fs.existsSync(debug_dir)) {
                fs.mkdirSync(debug_dir);
            }

            // calculate path filename
            let log_filename = '';
            if (this.file_history_enable) {
                log_filename += get_timestamp();
                log_filename += '_';
            }
            log_filename += path.basename(this.path);
            log_filename += '.log';

            // set path = directory + filename
            this.path = path.join(debug_dir, log_filename);

            // create file
            fs.writeFileSync(this.path, '', 'utf8');
        }
    }

    // add a new line to the log
    log(...objects) {

        // check if disabled
        if (!this.enabled) {
            return;
        }

        // log to file if enabled
        if (this.file_output_enable) {
            let log_entry = '';
            if (this.file_timestamp_enable) {
                log_entry += get_timestamp();
            }
            for (const o of objects) {
                log_entry += ' ';
                log_entry += JSON.stringify(o);
            }
            log_entry += os.EOL;
            fs.appendFileSync(this.path, log_entry, 'utf8');
        }

        // Log to terminal if enabled
        if (this.terminal_output_enable) {
            if (this.terminal_timestamp_enable) {
                console.log(get_timestamp(), ...objects)
            } else {
                console.log(...objects)
            }
        }
    }

}

export default Debug;