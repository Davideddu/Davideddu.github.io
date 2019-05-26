const LINE_HEIGHT_APPROX = 18;  // pixels-ish
const COOKIES_LOCATION = "/cookies";

$(document).ready(function () {
    const body = $("body");

    const isCookiesPage = window.location.pathname === COOKIES_LOCATION;

    // Manpage lines and progress
    const indicator = $("#manpage-progress-indicator").append(
        " line <span class='cur'></span>/<span class='total'></span> (<span class='perc'></span>)"
    );

    if (!isCookiesPage) {
        indicator.append(" <span class='no-wrap no-mobile'>(press h for info on cookies)</span>");
    }

    const curLines = indicator.children().filter('.cur');
    const totalLines = indicator.children().filter('.total');
    const percScroll = indicator.children().filter('.perc');

    const pageHeight = $(document).height();
    const pageLinesApprox = pageHeight / LINE_HEIGHT_APPROX;

    totalLines.text(Math.floor(pageLinesApprox));

    const scrollHandler = function () {

        const viewportHeight = screen.height;
        const scrollHeightTop = $(document).scrollTop();
        const scrollHeightBottom = scrollHeightTop + viewportHeight;

        const scrolledLinesApprox = Math.min(
            Math.floor(scrollHeightTop / LINE_HEIGHT_APPROX) + 1,
            Math.floor(pageLinesApprox)
        );
        const scrolledPerc = scrollHeightBottom / pageHeight * 100;

        const scrolledPercText = scrolledPerc > 99
            ? "END"
            : Math.floor(scrolledPerc) + "%";

        curLines.text(scrolledLinesApprox);
        percScroll.text(scrolledPercText);
    };

    scrollHandler();
    $(document).scroll(scrollHandler);


    // Keyboard events
    if (!isCookiesPage) {
        $(document).keypress(function (event) {
            if (event.originalEvent.key === 'h') {
                window.location = COOKIES_LOCATION;
            }
        })
    }
});
