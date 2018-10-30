module.exports = function (basePage) {
    return {
        common: {
            title: 'Reservator',
            footer: 'tmhrbr © 2018',
            pages: getPages(basePage),
            breadcrumb: getBreadcrumb(basePage)
        },
        page: getPage(basePage)
    }
};

function getContent(basePage) {
    return {
        buildings: {
            headers: ['Name'],
            content: [
                { name: 'Orchard View', section: 'Section A' },
                { name: 'The Beeches', section: 'Section A' },
                { name: 'Elephant\'s House', section: 'Section B' },
                { name: 'The Old Lighthouse', section: 'Section B' }
            ]
        },
        rooms: {
            headers: ['Name'],
            content: [
                { name: 'Scrgray' },
                { name: 'Hulotus' },
                { name: 'Teskelis' },
                { name: 'Stoniar' },
                { name: 'Teganeus' },
                { name: 'Kokago' },
                { name: 'Malgo' },
                { name: 'Fornray' }
            ]
        },
        schedule: {
            headers: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            content: [
                [ 'WEB', 'BI-ZMA'],
                [ 'BI-CAO'],
                [ 'BI-PS1', 'CSharp', 'MA2'],
                [ '', 'PR1'],
                [ '', '', 'PR2'],
                [ '', '', '', 'BI-MLO'],
                [],
                [],
                ['', '', '', '', 'ARD', ''],
                [],
                [],
            ]
            .map(sub => sub.length < 8 ? sub.concat(Array(7-sub.length).fill('')) : sub)
            .map((sub, i) => [`${8+i}:00`].concat(sub))
        }
    }[basePage];
};

function getPage(basePage) {
    console.log(getContent(basePage).content);
    return {
        buildings: { name: 'Buildings', content: getContent(basePage).content, headers: getContent(basePage).headers },
        rooms: { name: 'Rooms', content: getContent(basePage).content, headers: getContent(basePage).headers },
        schedule: { name: 'Schedule', content: getContent(basePage).content, headers: getContent(basePage).headers }
    }[basePage];
};

function getPages(basePage) {
    return [
        { title: 'Buildings', link: './index.html', active: getActive(basePage, 'buildings') },
        { title: 'Rooms', link: './rooms.html', active: getActive(basePage, 'rooms') },
        { title: 'Schedule', link: './schedule.html', active: getActive(basePage, 'schedule') }
    ]
};

function getBreadcrumb(basePage) {
    const pages = getPages(basePage).slice();

    for (let i = pages.length - 1; i >= 0; --i) {
        if (pages[i].active == 'active')
            return pages;
        pages.pop();
    }
};

function getActive(page, name) {
    return page == name ? 'active' : '';
};

