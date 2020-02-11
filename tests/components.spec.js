import { expect } from 'chai';
import createCookieMonster from '../';
import { tick } from 'svelte';

describe('Cookie Banner Components', () => {
    before(() => {
        // patch the requestAnimationFrame method
        window.requestAnimationFrame = global.requestAnimationFrame = setImmediate;
    });

    it('The Factory returns a svelte component instance', () => {
        const div = document.createElement('div');
        const component = createCookieMonster(div);

        expect(component).to.be.ok;

        component.$destroy();
    });

    it('Properties will be properly handled', () => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'hello',
        });

        expect(component.cookieAge).to.be.equal(1000);
        expect(component.cookieId).to.be.equal('hello');

        component.$destroy();
    });

    it('Buttons will be properly rendered (simple)', () => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'hello',
        });

        const buttons = div.querySelectorAll('button');

        expect(buttons).to.have.length(1);

        component.$destroy();
    });

    it('Buttons will be properly rendered (groups)', () => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'hello',
            groupsSettings: {},
        });

        const buttons = div.querySelectorAll('button');

        expect(buttons).to.have.length(3);

        component.$destroy();
    });

    it('Load properly the vocabulary keys', () => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'hello',
            title: 'halli hallo',
        });

        const title = div.querySelector('.cookie-monster--title');

        expect(title.innerHTML).to.be.equal('halli hallo');

        component.$destroy();
    });

    it('Toggle the groups table', async () => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'hello',
            groupsSettings: {
                rows: [],
                groups: [],
            },
        });

        const tableBefore = div.querySelector('.cookie-monster--groups');
        expect(tableBefore).to.be.not.ok;

        component.toggleTable();
        await tick();

        const tableAfter = div.querySelector('.cookie-monster--groups');
        expect(tableAfter).to.be.ok;

        component.$destroy();
    });

    it('Accepting cookies should set the custom cookie id', () => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'hello',
        });

        component.acceptCookies();

        expect(createCookieMonster.__.hasAcceptedCookies('hello')).to.be.ok;
        component.$destroy();
    });

    it('The onAccepted callback is properly called', done => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'goodbye',
            groupsSettings: {
                rows: [],
                groups: [{
                    required: true,
                    name: 'test',
                    cookies: [{
                        id: 'gtm',
                    }],
                }],
            },
            onAccepted(cookies) {
                expect(cookies).to.contain('gtm');
                done();
            },
        });

        component.acceptCookies();

        expect(createCookieMonster.__.hasAcceptedCookies('goodbye')).to.be.ok;

        component.$destroy();
    });

    it('The accept all cookies button works as expected', done => {
        const div = document.createElement('div');
        const component = createCookieMonster(div, {
            cookieAge: 1000,
            cookieId: 'goodbye-all',
            groupsSettings: {
                rows: [],
                groups: [{
                    required: false,
                    name: 'test',
                    cookies: [{
                        id: 'gtm',
                    }],
                }],
            },
            onAccepted(cookies) {
                expect(cookies).to.contain('gtm');
                done();
            },
        });

        component.acceptAllCookies();

        expect(createCookieMonster.__.hasAcceptedCookies('goodbye-all')).to.be.ok;

        component.$destroy();
    });
});
