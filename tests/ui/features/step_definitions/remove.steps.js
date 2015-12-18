var assert = require("assert");
var Browser = require('zombie');

module.exports = function () {
    'use strict';

    var _browser = Browser.create();
    this.Given(/^The contact exist$/, function (callback) {
        _browser.visit("http://127.0.0.1:3000/", function (err) {
            if (err) throw err;

            assert.ok(_browser.success);
            assert.equal(_browser.text('h1'), 'Contacts');

            var it = _browser.tabs.current.Contact.Contacts.instance().iterator();
            while (it.hasNext ()) {
                var contact_id = it.next();

                var contact_table = _browser.query('#contacts table');
                assert(contact_table);

                var it_2 = _browser.tabs.current.Contact.Contacts.instance().iterator();
                var contact = it_2.next();
                assert.equal(contact.lastName(),'RAMAT');
                assert.equal(contact.firstName(), 'Eric');

                var first_contact_id = contact.id();
                var deleteButton = _browser.query('#contacts a#button_'+first_contact_id);
                assert(deleteButton);
            }
            callback();
        });
    });

    this.When(/^User delete a contact$/, function(callback) {
        _browser.visit("http://127.0.0.1:3000/", function (err) {
            if (err) throw err;

            var it = _browser.tabs.current.Contact.Contacts.instance().iterator();
            var contact = it.next();
            var contact_id = contact.id();

            _browser.clickButton('#contacts a#button_'+contact_id);
        });
        callback();
    });

    this.Then(/^Contact deleted$/,function(callback) {
        _browser.visit("http://127.0.0.1:3000/", function (err) {
            if (err) throw err;

            var it = _browser.tabs.current.Contact.Contacts.instance().iterator();
            var contact = it.next();
            var first_contact_id = contact.id();

            assert.equal(first_contact_id.lastName(),'DUPONT');
            assert.equal(first_contact_id.firstName(),'Pierre');
        });
        callback();
    });
};