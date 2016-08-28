/**
 * Created by safaariman on 22.08.2016.
 */

const remote = require('electron').remote;

(function ($, window) {
    $.fn.contextMenu = function (settings) {
        return this.each(function () {
            $(this).on("contextmenu", function (e) {
                if (e.ctrlKey) return;
                var $menu = $(settings.menuSelector)
                    .data("invokedOn", $(e.target))
                    .show()
                    .css({
                        position: "absolute",
                        left: getMenuPosition(e.clientX, 'width', 'scrollLeft'),
                        top: getMenuPosition(e.clientY, 'height', 'scrollTop')
                    })
                    .off('click')
                    .on('click', 'a', function (e) {
                        $menu.hide();

                        var $invokedOn = $menu.data("invokedOn");
                        var $selectedMenu = $(e.target);

                        settings.menuSelected.call(this, $invokedOn, $selectedMenu);
                    });
                return false;
            });

            $('body').click(function () {
                $(settings.menuSelector).hide();
            });
        });

        function getMenuPosition(mouse, direction, scrollDir) {
            var win = $(window)[direction](),
                scroll = $(window)[scrollDir](),
                menu = $(settings.menuSelector)[direction](),
                position = mouse + scroll;
            if (mouse + menu > win && menu < mouse)
                position -= menu;
            return position / remote.getGlobal('tureng_ui_settings').scale_factor;
        }
    };
})(jQuery, window);

function init_context_menu(container_id, context_id, menu_selected_function) {
    $("#" + container_id).contextMenu({
        menuSelector: "#" + context_id,
        menuSelected: menu_selected_function
    });
}