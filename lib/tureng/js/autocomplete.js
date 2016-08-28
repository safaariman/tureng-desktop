var words = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        url: 'http://ac.tureng.co/?c=?&t=%QUERY',
        wildcard: '%QUERY',
        filter: function (response) {
            return response.map(function (item) {
                return item;
            });
        }
    }
});

words.initialize();

$('#scrollable-dropdown-menu .typeahead').typeahead(null, {
    name: 'words',
    limit: 20,
    source: words,
    templates: {
        suggestion: function (data) {
            return '<li onclick="translationJson(\'' + data + '\'); suggestionJson(\'' + data + '\'); return false;">' + data + '</li>';
        }
    }
});
