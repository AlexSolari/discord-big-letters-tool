var Tool = (function(){
    var BigLetterTool = {
        inputArea: document.querySelector("#in"),
        resultsButton: document.querySelector("#results"),
        copiedMessage: document.querySelector("#message"),
        
        timeOuts: [],
        spacesRegex: /( )/g,
        lettersRegex: /([a-z])/g,
        numbersRegex: /([0-9])/g,

        numbersDictionary:{
            "0": ":zero: ",
            "1": ":one: ",
            "2": ":two: ",
            "3": ":three: ",
            "4": ":four: ",
            "5": ":five: ",
            "6": ":six: ",
            "7": ":seven: ",
            "8": ":eight: ",
            "9": ":nine: ",
        },

        init: function(){
            BigLetterTool.resultsButton.onclick = BigLetterTool.copyResult;
        },
        processText: function(value){
            var result = value.replace(BigLetterTool.spacesRegex, "  ");
            result = result.replace(BigLetterTool.lettersRegex, ":regional_indicator_$1: ");
            result = result.replace(BigLetterTool.numbersRegex, function(match, substr){
                return BigLetterTool.numbersDictionary[substr];
            });

            return result;
        },
        copyResult: function(){
            var result = BigLetterTool.processText(BigLetterTool.inputArea.value);
            
            var textArea = document.createElement("textarea");
            textArea.value = result;
            document.body.appendChild(textArea);
            textArea.select();
            
            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';

                BigLetterTool.showSuccessfulMessage();
            } catch (err) {
                alert('Oops, unable to copy');
            }

            document.getSelection().empty();
            document.body.removeChild(textArea);
        },
        showSuccessfulMessage: function(){
            BigLetterTool.timeOuts.forEach(function(id){
                clearTimeout(id);
            });

            BigLetterTool.copiedMessage.className = "";

            for(var i = 0; i < 50; i++)
            {
                (function(value){
                    var timeoutId = setTimeout(function(){
                        BigLetterTool.copiedMessage.style.opacity = (50.0 - value) / 50.0;
                    }, 40*i);
                    
                    BigLetterTool.timeOuts.push(timeoutId);
                })(i);
            }

            var timeoutId = setTimeout(function(){
                    BigLetterTool.copiedMessage.style.opacity = 1;
                    BigLetterTool.copiedMessage.className = "hidden";
                }, 3000);
            BigLetterTool.timeOuts.push(timeoutId);
        },
    };

    BigLetterTool.init();

    return BigLetterTool;
})();
