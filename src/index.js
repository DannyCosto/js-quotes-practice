//Stable elements
let quoteList = document.querySelector('#quote-list');
let newQuoteForm = document.querySelector('#new-quote-form');

//Get fetch
fetch('http://localhost:3000/quotes?_embed=likes')
.then(res => res.json())
.then(function(quotesArr){
    quotesArr.forEach(function(quoteObj){
        let quoteLi = document.createElement('li');
            quoteLi.className ="quote-card";
        let quoteBlockquote = document.createElement('blockquote');
            quoteBlockquote.className = "blockquote";
        let quoteP = document.createElement('p');
            quoteP.className = 'mb-0';
            quoteP.innerText = quoteObj.quote;
        let quoteFooter = document.createElement('footer');
            quoteFooter.className = "blockquote-footer";
            quoteFooter.innerText = quoteObj.author;
        let quoteBreaker = document.createElement('br');
        let successButton = document.createElement('button');
            successButton.innerText = "Likes: ";
            successButton.className = 'btn-success';
        let quoteSpan = document.createElement('span');
            quoteSpan.innerText = quoteObj.likes.length;
        let deleteButton = document.createElement('button');
            deleteButton.className = 'btn-danger';
            deleteButton.innerText = "Delete";
            //Creates elements
            //Adds them to page
            successButton.append(quoteSpan);
            quoteLi.append(quoteBlockquote,quoteP,quoteFooter, quoteBreaker, successButton, deleteButton);
            quoteList.append(quoteLi);
            console.log(quoteLi);
        ///Delete button listener
        deleteButton.addEventListener("click",function(){
        
            fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(function(){
                    quoteLi.remove();
                });
        });
        //Like button listener

       
        successButton.addEventListener("click", function(){
            fetch(`http://localhost:3000/likes`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quoteId: quoteObj.id
                }) 
            })
                .then(res => res.json())
                .then(function(newCreatedLike){
                    console.log(newCreatedLike) // like obj
                    console.log(quoteObj.likes) //likes in like obj

                    quoteObj.likes.push(newCreatedLike) 
                    quoteSpan.innerText = quoteObj.likes.length
                })
            })
        });
    });

    newQuoteForm.addEventListener("submit",function(e){
        e.preventDefault()
        let newQuote = e.target["new-quote"].value
        let newAuthor = e.target.author.value

        console.log(newAuthor,newQuote)

        fetch("http://localhost:3000/quotes", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                quote: newQuote,
                author: newAuthor
            })
        }).then(res => res.json())
        .then(function(quoteObj){
                let quoteLi = document.createElement('li');
                    quoteLi.className ="quote-card";
                let quoteBlockquote = document.createElement('blockquote');
                    quoteBlockquote.className = "blockquote";
                let quoteP = document.createElement('p');
                    quoteP.className = 'mb-0';
                    quoteP.innerText = quoteObj.quote;
                let quoteFooter = document.createElement('footer');
                    quoteFooter.className = "blockquote-footer";
                    quoteFooter.innerText = quoteObj.author;
                let quoteBreaker = document.createElement('br');
                let successButton = document.createElement('button');
                    successButton.innerText = "Likes: ";
                    successButton.className = 'btn-success';
                let quoteSpan = document.createElement('span');
                    quoteSpan.innerText = quoteObj.likes;
                let deleteButton = document.createElement('button');
                    deleteButton.className = 'btn-danger';
                    deleteButton.innerText = "Delete";
                    //Creates elements
                    //Adds them to page
                    successButton.append(quoteSpan);
                    quoteLi.append(quoteBlockquote,quoteP,quoteFooter, quoteBreaker, successButton, deleteButton);
                    quoteList.append(quoteLi);
                    console.log(quoteLi);
                ///Delete button listener
                deleteButton.addEventListener("click",function(){
                
                    fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(function(){
                            quoteLi.remove();
                        });
                });
                //Like button listener
        
               
                successButton.addEventListener("click", function(){
                    fetch(`http://localhost:3000/likes`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            quoteId: newQuote
                        }) 
                    })
                        .then(res => res.json())
                        .then(function(newCreatedLike){
                            quoteObj.likes.push(newCreatedLike) 
                            quoteSpan.innerText = quoteObj.likes
                                // needs refresh to get past undefined in quoteSpan
                    })
                })
            })
        })