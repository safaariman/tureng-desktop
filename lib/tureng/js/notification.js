/**
 * Created by safaariman on 26.08.2016.
 */

const notifier = require('node-notifier');

function send_notification() {
    notifier.notify({
        'title': 'Tureng',
        'message': 'Text copied'
    });
}
