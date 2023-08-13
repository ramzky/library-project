/*
TODO
- DONE: change delete book logic to not delete then create entire array
*/

const bookList = [100];
const addBtn = document.querySelector('.add-book');
const bookListPanel = document.querySelector('.book-list');
const dialog = document.getElementById('new-book');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel');
const inputName = document.getElementById('name');
const inputAuthor = document.getElementById('author');
const inputPage = document.getElementById('page');
const inputCheck = document.getElementById('to-read');

function Book(name, author, page, read = false) {
  this.name = name;
  this.author = author;
  this.page = page;
  this.read = read;
}
Book.prototype.info = function() {
  if (this.read.toString() === 'true') return 'Done reading';
  else return 'Not yet read';
}

bookListAdd(new Book('Book', 'Me', 5, true));
bookListAdd(new Book('The Greatest Book', 'The Great One', 101, true));
bookListAdd(new Book('Somebook', 'You', 3, false));
bookListAdd(new Book('How to anime', 'random guy', 1, false));

function bookListAdd(book) {
  bookList.push(book);
  if (book.unique === undefined) {
    book.unique = bookList[0];
    bookList[0]++;
  }
}

//length = start
function listBook(length) {
  for (let index = length; index <= bookList.length-1; index++) {
    const cardDiv = document.createElement('div');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const h4 = document.createElement('h4');
    const paraAuthor = document.createElement('p');
    const paraPage = document.createElement('p');
    const paraToRead = document.createElement('p');
    const toggleButton = document.createElement('button');
    const removeButton = document.createElement('button');

    h4.textContent = bookList[index].name;
    paraAuthor.textContent = bookList[index].author;
    paraPage.textContent = bookList[index].page + ' page/s';
    paraToRead.textContent = bookList[index].info();
    cardDiv.setAttribute('data-unique', bookList[index].unique);

    cardDiv.classList.add('card', 'flex-box');
    div2.classList.add('flex-box');
    toggleButton.classList.add('toggle-read');
    toggleButton.addEventListener('click', toggleRead);
    removeButton.classList.add('remove-book');
    removeButton.addEventListener('click', deleteBook);
    div.appendChild(h4);
    div.appendChild(paraAuthor);
    div.appendChild(paraPage);
    div2.appendChild(toggleButton);
    div2.appendChild(paraToRead);
    div2.appendChild(removeButton);
    cardDiv.appendChild(div);
    cardDiv.appendChild(div2);
    bookListPanel.appendChild(cardDiv);
  }
}
//start listing at index 1
listBook(1);

function removeBooks() {
  while (bookListPanel.firstChild) {
    bookListPanel.removeChild(bookListPanel.firstChild);
  }
}

cancelBtn.addEventListener('click', function(event) {
  event.preventDefault();
  dialog.close(cancelBtn.value);
});

function toggleRead(event) {
  const unique = event.target.parentNode.parentNode.dataset.unique;
  for (index = 1; index <= bookList.length; index++) {
    if (bookList[index].unique === Number(unique)) {
      if (bookList[index].read.toString() === 'true') {
        bookList[index].read = false;
      }
      else {
        bookList[index].read = true;
      }
      event.target.parentNode.firstChild.nextSibling.textContent = bookList[index].info();
      break;
    }
  }
}

function deleteBook(event) {
  const unique = event.target.parentNode.parentNode.dataset.unique;
  const cardDiv = event.target.parentNode.parentNode;
  for (index = 1; index <= bookList.length; index++) {
    if (bookList[index].unique === Number(unique)) {
      bookList.splice(index, 1);
      break;
    }
  }
  cardDiv.parentNode.removeChild(cardDiv);
}

function addBook(event) {
  confirmBtn.value = [inputName.value, inputAuthor.value, inputPage.value, inputCheck.checked];
}
confirmBtn.addEventListener('click', addBook)

function dialogClose(event) {
  if (!(dialog.returnValue === 'cancel' || dialog.returnValue === '')) {
    bookListAdd(new Book(...dialog.returnValue.split(',')));
    listBook(bookList.length-1);

    inputName.value = '';
    inputAuthor.value = '';
    inputPage.value = '';
    inputCheck.checked = false;
  }

}
dialog.addEventListener('close', dialogClose);

function newBook(event) {
  dialog.showModal();
}
addBtn.addEventListener('click', newBook);
