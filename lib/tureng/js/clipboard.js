/**
 * Created by safaariman on 26.08.2016.
 */

const clipboard = require('electron').clipboard;

function copy_to_clipboard (text) {
    clipboard.writeText(text);
}
