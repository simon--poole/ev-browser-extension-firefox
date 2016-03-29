var $comments;
var $showCommentsButton, $hideCommentsButton;
var showingComments = false;
var showCommentsButton = "<button id='showCommentsButton' class='yt-uix-button yt-uix-button-size-default yt-uix-expander-head'>Show Comments</button>";
var hideCommentsButton = "<button id='hideCommentsButton' class='yt-uix-button yt-uix-button-size-default yt-uix-expander-head'>Hide Comments</button>";
(document.body || document.documentElement)
.addEventListener('transitionend', function( /*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        checkVideoChanged();
    }
}, true);

function checkVideoChanged() {
    if ($('#showCommentsButton')
        .length == 0) initialise();
}
self.port.once('sendData', function(data) {
    var channel = $('.yt-user-info > a')
        .attr('href');
    if (typeof channel == "undefined") $('body')
        .on('DOMSubtreeModified', function() {
            channel = $('.yt-user-info > a')
                .attr('href');
            if (typeof channel != "undefined") {
                $('body')
                    .off('DOMSubtreeModified');
                initialise(data, channel);
            }
        });
    else initialise(data, channel);
});

function initialise(data, channel) {
    var cid = channel.replace('/channel/','');
    if (data.channels[cid].run) {
        if (data.comments) $(document)
            .on('DOMSubtreeModified', hideCommentsBinder);
        if (data.related) $(document)
            .on('DOMSubtreeModified', hideRelatedItemsBinder);
        if (data.length) $(document)
            .on('DOMSubtreeModified', hideLengthBinder);
    }
}

function hideCommentsBinder() {
    $comments = $('#watch-discussion');
    if ($comments.length > 0) {
        $(document)
            .off('DOMSubtreeModified', hideCommentsBinder);
        $comments.before(showCommentsButton);
        $comments.before(hideCommentsButton);
        $showCommentsButton = $('#showCommentsButton');
        $hideCommentsButton = $('#hideCommentsButton');
        hideCommentsLoop();
        $comments.on('DOMSubtreeModified', hideCommentsLoop);
    }
}

function hideCommentsLoop() {
    if (!showingComments) hideComments();
}

function hideComments() {
    showingComments = false;
    $comments.hide();
    $hideCommentsButton.hide();
    $showCommentsButton.show()
        .on('click', showComments)
}

function showComments() {
    showingComments = true;
    $showCommentsButton.hide();
    $hideCommentsButton.show()
        .on('click', hideComments);
    $comments.show();
}

function hideRelatedItemsBinder() {
    $('.watch-sidebar, #player-playlist')
        .remove();
    $('.watch-main-col')
        .css('margin', 'auto')
        .css('float', 'none');
    if ($('#player')
        .hasClass('watch-small')) {
        $('#player-api, #placeholder-player')
            .css('left', ($('#player-mole-container')
                .width() - $('#player-api')
                .width()) / 2 + 'px');
    }
}

function hideLengthBinder() {
    if ($('.ytp-progress-bar-container')
        .length > 0) {
        $(document)
            .off('DOMSubtreeModified', hideLengthBinder);
        $('.ytp-time-duration, .ytp-time-separator')
            .remove();
        $('.ytp-progress-bar-container')
            .text('Video length hidden - use arrow keys to seek')
            .css('text-align', 'center');
    }
}