import Pagination from 'tui-pagination';

// TODO:
//total pages is calcalated as totalItems/itemsPerPage
// in events should be variable that will be used for pagination render
// totalItems -> could be taken from result of API cal
// itemsPerPage ->  should be calculted as length of result list
//                  default for home page: 20,
//                  for library depending on screen size: 4, 8, 9
// visiblePages -> should be calculated max value is 5, min is 1
// page -> should be taken from result of API call
const options = {
  totalItems: 200,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' + '<span>⋅⋅⋅</span>' + '</a>',
  },
};

const pagination = new Pagination('pagination', options);
export default pagination;
//TODO
// event listener for buttons
// default example:
/*
pagination.on('beforeMove', evt => {
  const { page } = evt;
  //How to spread API call?
  const result = ajax.call({page});

  if(result) {
    pagination.movePageTo(page);
  } else {
    return false;
  }
});
// How to render new page?
pagination.on('afterMove', ({ page }) => viewGallery());
*/
