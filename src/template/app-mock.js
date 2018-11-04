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
            content: {
                rooms: [
                    { name: 'Scrgray' },
                    { name: 'Hulotus' },
                    { name: 'Teskelis' },
                    { name: 'Stoniar' },
                    { name: 'Teganeus' },
                    { name: 'Kokago' },
                    { name: 'Malgo' },
                    { name: 'Fornray' }
                ],
                scheduleTimes: new Array(12).fill(1).map((_, i) => `${(i + 8)}:00`),
                schedule: [
                    ['Scrgray', 'ARD', '', '', 'GIT'],
                    ['Hulotus', '', '', 'PR1', 'PR1', 'PR2', 'PR2'],
                    ['Teskelis', 'MA1', 'MA1', 'MA2', 'MA2', 'BI-ZMA'],
                    ['Stoniar', 'MLO', 'MLO', '', '', 'TAU', 'TAU'],
                    ['Teganeus', '', '', '', 'PA1', 'PA1'],
                    ['Kokago', '', '', '', '', '', 'ARM'],
                    ['Malgo'],
                    ['Fornray']
                ].map(sub => sub && sub.length < 14 ? sub.concat(Array(13 - sub.length).fill('')) : sub)
            },
        },
        schedule: {
            headers: new Array(12).fill(1).map((_, i) => `${(i + 8)}:00`),
            content: [
                ['Monday', '', '', '', '', 'MA1', 'MA1', 'MA2', 'MA2'],
                ['Tuesday', 'PR1', 'PR1', 'PR2', 'PR2', 'ALG', 'ALG'],
                ['Wednesday', '', '', 'BI-ZMA', 'BI-ZMA'],
                ['Thursday', 'ARD', 'ARD', 'MLO', 'MLO', 'CSharp', 'CSharp', 'ALG', 'ALG'],
                ['Friday', 'PA1', 'PA1', 'EKO', 'EKO', 'MRO1', 'MRO1'],
                ['Saturday'],
                ['Sunday', '', '', '', '', '', '', 'BI-LIN']
            ].map(sub => sub && sub.length < 14 ? sub.concat(Array(13 - sub.length).fill('')) : sub)
        }
    }[basePage];
};

function getPage(basePage) {
    console.log(getContent(basePage).content);
    console.log(getContent(basePage).scheduleTimes);
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

