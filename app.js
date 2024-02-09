let addButton = document.getElementById('book-adder')
let addForm = document.getElementsByClassName('form')
let container = document.getElementsByClassName('container')
let submitButton = document.getElementById('submit-btn')
let readButton = document.getElementsByTagName('input');
let labels = document.getElementsByClassName('lbl-req');
let libContent = document.getElementsByClassName('lib-content');

const myLibrary = [];
let readButtons = [];
let removeButtons = [];
let array = [];
let array2 = [];


function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {

    const book = new Book(title, author, pages, read);
    myLibrary.push(book);

}

function addBooks(){

    libContent[0].innerHTML = '';

    for(let i = 0; i < myLibrary.length; i++)
    {
        var newBook = document.createElement('div');
        let readID;
        newBook.classList.add('book');

        if(myLibrary[i].read === 'Read')
        readID = 'read-btn';
        else
        readID = 'unread-btn';

        newBook.innerHTML = 
        '<h3>"' + myLibrary[i].title +'"</h3>' +
        '<h3>' + myLibrary[i].author +'</h3>' +
        '<h3>' + myLibrary[i].pages +' pages </h3>'+
        '<button class="'+ readID +' rdBTN">'+ myLibrary[i].read +'</button>'+
        '<button class="remove-btn">Remove</button>';

        libContent[0].appendChild(newBook);

    }
    readButtons = document.getElementsByClassName('rdBTN');
    array = Array.from(readButtons);

    removeButtons = document.getElementsByClassName('remove-btn');
    array2 = Array.from(removeButtons);
    
    array.forEach(function(element, id) {
    element.addEventListener('click', function() {
        if(myLibrary[id].read === 'Read')
        myLibrary[id].read = 'Not read yet';
        else
        myLibrary[id].read = 'Read';

        addBooks();
        
        });
        
    });

    array2.forEach(function(element, id){
    element.addEventListener('click', function(){
        myLibrary.splice(id,1);

        addBooks();
    });
    });
}

addButton.addEventListener('click', ()=>{
    container[0].classList.add('containerUnactive');
    addButton.style.pointerEvents = 'none';
    addForm[0].classList.remove('add-form-close');
    addForm[0].classList.add('add-form');
});

container[0].addEventListener('click', ()=>{
    if (event.target !== addButton)
    {
        container[0].classList.remove('containerUnactive');
        addButton.style.pointerEvents = 'auto';
        addForm[0].classList.remove('add-form');
        addForm[0].classList.add('add-form-close');
    }
});

submitButton.addEventListener('click', ()=>{
    let valid = true;
    for(let i = 0; i < readButton.length - 1; i++)
    {
        if(readButton[i].value === '')
        {
            labels[i].innerHTML ='This field is required';
            valid = false;            
        }else
        {
            labels[i].innerHTML ='';

        }

        myLibrary.forEach(element => {
            if(readButton[0].value === element.title)
            {
                labels[0].innerHTML = 'Book with this title already exists!';
                valid = false;
            }
        });
    }

    if(valid)
    {
        if(readButton[3].checked)
        {
            readButton[3].value = 'Read';
        }else{
            readButton[3].value = 'Not read yet';
        }
        addBookToLibrary(readButton[0].value, readButton[1].value, readButton[2].value, readButton[3].value);
        addBooks();
        for(let i = 0; i < 3; i++)
        {
            readButton[i].value = '';
        }
        readButton[3].checked = false;

        container[0].classList.remove('containerUnactive');
        addButton.style.pointerEvents = 'auto';
        addForm[0].classList.remove('add-form');
        addForm[0].classList.add('add-form-close');
    }
});
