/**
 * Created by safaariman on 27.08.2016.
 */

Templates = {};

Templates.left_panel_inner_template = [
    "<div class=\"panel panel-default\" id=\"inner-left\">",
    "<div class=\"panel-heading\">Similar Words</div>",
    "{{#suggestions}}",
    "<a href=\"#\" draggable=\"false\" class=\"list-group-item\">{{.}}</a>",
    "{{/suggestions}}",
    "</div>"
].join('');

Templates.right_panel_inner_template = [
    "{{#categories}}",
    "<div class=\"panel panel-default\" id=\"inner-right\">",
    "<div class=\"panel-heading\">{{name}}</div>",
    "<div class=\"list-group\">",
    "{{#results}}",
    "<a href=\"#\" draggable=\"false\" class=\"list-group-item\">{{to}}{{#show_type}}<i> {{type}}</i>{{/show_type}}</a>",
    "{{/results}}",
    "</div>",
    "</div>",
    "{{/categories}}"
].join('');
