var assert = require("assert");
var Browser = require('zombie');

module.exports = function () {
    'use strict';

    var _browser = Browser.create();
    this.Given(/^The contact exist$/, function (callback){
        _browser.visit("http://127.0.0.1:3000/", function (err) {
            if (err) throw err;

            var it = _browser.tabs.current.Contact.Contacts.instance().iterator();
            while (it.hasNext()) {
                var contact = it.next();
                if (contact) {
                    assert.ok(_browser.query('tr#x'+contact.id()));
                }
            };

            callback();
        });

    });
};