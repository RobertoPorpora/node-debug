# node-debug

Simple log-to-file library for debugging Node.js scripts.


## Why Use This?

Regardless of the fact that logging to a file with precise timestamps can generally be more practical and useful than printing to the screen...

There are times when you need to debug issues:
- that only manifest during runtime.
- when access to a debugger isn't available.
- when halting the process isn't feasible.
- when the stdout/stderr isn't visible.
- when dealing with a plug-in or a child process.

In such scenarios, logging to a file can be invaluable.

This repository offers a straightforward logger, complete with detailed timestamps, enabling quick setup for file logging.

This library can also be used for simple terminal printing.  
It adds the following features:
- a global switch to disable all debug_log() calls.
- timestamp to the output (can be easily disabled).

<div style="text-align: right;">
    <a href="#node-debug">Back to top</a>
</div>


## Usage

1. Copy `debug.js` into your project.
2. Insert `import Debug from './debug.js'` in the `.js` file where you want to use the logging functions.
3. At the start of your script, Create a new debug object, set the path, set some flags and call debug.enable() like so:
```javascript
// create debug object
import Debug from './debug.js'
let debug = new Debug();
// set the path to be the same as your script's path
import { fileURLToPath } from 'url';
debug.path = fileURLToPath(import.meta.url);
// set some flags, See "FLAGS options" below.
debug.file_output_enable = true;
debug.file_timestamp_enable = true;
// call enable()
debug.enable();
```
4. Every time you need to log something, call `debug.log(SOMETHING);` just like you would call `console.log(SOMETHING);`.
5. When you have finished debugging, comment or delete call to enable() like this `// debug.enable();` to disable logging.
    - No need to comment or delete any `debug.log();` line. Without `debug.enable();`, they will do nothing.

<div style="text-align: right;">
    <a href="#node-debug">Back to top</a>
</div>


## FLAGS options

There are some flags you can use to customize how debug.log() works.


### debug.terminal_output_enable

Why forgo terminal output while logging to file?  
Set this to true in order to see everything you log to file also on the process stdout.
Do you want to disable this at some point?  
Simply set it back to false before calling debugenable().


### debug.terminal_timestamp_enable

If you don't want timestamps for every line in your terminal, set this to false.


### debug.file_output_enable

Need to disable logging to file?  
Use this switch to enable (true) or disable (false) file logging.


### debug.file_timestamp_enable

If you don't want timestamps for every line in your file, set this to false.


### debug.file_history_enable

**debug.file_history_enable = false**: only one file is written and it is overwritten over and over everytime the executable executes.
```
root
├── package.json
├── debug.js
├── index.js  <-- your script
└── debug
    └── index.js.log
```

**debug.file_history_enable = true**: it generates a new timestamped file each time the executable is executed. 
```
root
├── package.json
├── debug.js
├── index.js  <-- your script
└── debug
    ├── 20240531_1234_000_index.js.log
    ├── 20240531_1234_123_index.js.log
    ├── 20240531_1256_012_index.js.log
    └── 20240531_1345_987_index.js.log
```

<div style="text-align: right;">
    <a href="#node-debug">Back to top</a>
</div>


## Testing and compiling the example.

- Check `example.js`.
- Execute it with command `npm run example` or `node example.js`.
- Check the log file that has been written in `debug/` folder.
- Experiment with the `example.js` file (disable debugging, change FLAGS, log other types of data, etc.).

<div style="text-align: right;">
    <a href="#node-debug">Back to top</a>
</div>


## Links.

- [Debug logger for Python.](https://github.com/RobertoPorpora/python-debug)
- [Debug logger for C/C++.](https://github.com/RobertoPorpora/c-debug)
- [Debug logger for Node.js.](https://github.com/RobertoPorpora/node-debug)


<div style="text-align: right;">
    <a href="#node-debug">Back to top</a>
</div>
