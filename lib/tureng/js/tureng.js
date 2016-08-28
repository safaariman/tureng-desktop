/**
 * Created by safaariman on 22.08.2016.
 */

const http = require('http');
const tureng = require('turengjs');

function render_panel (template, suggestions) {
    return Mustache.render(template, suggestions);
}

function get_suggestions_from_tureng (word, callback) {
    var options = {
        host: 'ac.tureng.co',
        port: 80,
        path: '/?c=?&t=' + encodeURIComponent(word),
        method: 'GET'
    };
    var output = '';
    var req = http.request(options, function (res) {
        res.on('data', function (d) {
            output += d;
            var suggestions = {
                "suggestions": JSON.parse(output.substring(2, output.length - 2))
            };
            callback(suggestions);
        });
    });
    req.end();
}

function get_translations_from_tureng (word, callback) {
    tureng(word, function (error, data) {
        if (!error) {
            callback(recreate_translations_json(word, data));
        }
    });
}

function recreate_translations_json (word, translations) {
    var recreated_json = {
        categories: []
    };
    for (var i = 0; i < translations.categories.length; i++) {
        var category = {
            name: translations.categories[i].name,
            results: []
        };
        var res = translations.categories[i].results;
        for (var j = 0; j < res.length; j++) {
            var result_item = {};
            if (res[j].english == word) {
                result_item.from_lang = 'english';
                result_item.to_lang = 'turkish';
                result_item.from = res[j].english;
                result_item.to = res[j].turkish;
                result_item.type = res[j].type;
            }
            else if (res[j].turkish == word) {
                result_item.from_lang = 'turkish';
                result_item.to_lang = 'english';
                result_item.from = res[j].turkish;
                result_item.to = res[j].english;
                result_item.type = res[j].type;
            }
            result_item.show_type = (result_item.to_lang == 'english');
            category.results.push(result_item);
        }
        recreated_json.categories.push(category);
    }
    return recreated_json;
}