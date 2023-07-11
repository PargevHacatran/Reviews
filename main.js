var comments = [];
loadComments();

document.getElementById("comment__add").onclick = function(){
    event.preventDefault();
    var commentName = document.getElementById("coment__name");
    var commentBody = document.getElementById("coment__body");

    var comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now()/1000)
    }

    commentName.value = "";
    commentBody.value = "";
    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem("comments", JSON.stringify(comments))
}

function loadComments(){
    if(localStorage.getItem("comments")){
        comments = JSON.parse(localStorage.getItem("comments"))
    }
    showComments();
}

function showComments(){
    var commentField = document.getElementById("commentField");
    var out = "";
    comments.forEach(function(item){
        out += `<p class="text__right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="text__right small">${item.name}</p>`;
        out += `<p class="text__right small">${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
    return time;
}