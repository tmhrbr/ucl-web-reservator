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

function getPage(basePage) {
    return {
        buildings: { name: 'Buildings' },
        rooms: { name: 'Rooms' }
    }[basePage];
};

function getPages(basePage) {
    return [
        { title: 'Buildings', link: '/buildings.html', active: getActive(basePage, 'buildings') },
        { title: 'Rooms', link: '/rooms.html', active: getActive(basePage, 'rooms') }
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

