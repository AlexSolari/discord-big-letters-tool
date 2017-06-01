var inputArea = document.querySelector("#in");
var resultsButton = document.querySelector("#results");
var copiedMessage = document.querySelector("#message");
var timeOuts = [];

resultsButton.onclick = function(){
    var result = inputArea.value.replace(/( )/g, "  ");
    result = result.replace(/([a-z])/g, ":regional_indicator_$1: ");
    
    var textArea = document.createElement("textarea");
    textArea.value = result;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';

        showSuccessfulMessage();
    } catch (err) {
        alert('Oops, unable to copy');
    }
    document.getSelection().empty();
    document.body.removeChild(textArea);
}

function showSuccessfulMessage(){
    timeOuts.forEach(function(id){
        clearTimeout(id);
    });

    copiedMessage.className = "";
    for(var i = 0; i < 50; i++)
    {
        (function(value){
            var timeoutId = setTimeout(function(){
                copiedMessage.style.opacity = (50.0 - value) / 50.0;
            }, 40*i);
            timeOuts.push(timeoutId);
        })(i)
        
    }

    var timeoutId = setTimeout(function(){
            copiedMessage.style.opacity = 1;
            copiedMessage.className = "hidden";
        }, 3000);
    timeOuts.push(timeoutId);
}