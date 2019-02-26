bootKicked = false;
gnomeDead = false;
gnomeKicked = false;
specialUnlocked = false;
gnome = document.getElementById("gnome");
boot = document.getElementById("boot");
bell = document.getElementById("bootAudio");
deadGnome = document.getElementById("deadGnome");
executionSentence = document.getElementById("executionSentence");
exeSentenceAudio = document.getElementById("executionSentenceAudio");
gnomeDeadSound = document.getElementById("gnomeDeadSound");
executionSentenceDiv = document.getElementById("executionSentenceDiv");
resAudio = document.getElementById("resSound");
function resGnome(){
    console.log("onclick works!");
}

function translateGnome(){
    let vertPos = -180;
    let horzPos = 0;
    let left = this.gnome.style.left.slice(0, 3);
    let bottom = this.gnome.style.bottom.slice(0, 3);
    console.log(this.gnome.style.bottom)
    let currentVertPos;
    let currentHorzPos;
    let timer = setInterval(frame, 1);
    function frame(){
        if(this.gnomeKicked == false && this.gnomeDead == false){
            if(horzPos >= 856){
                clearInterval(timer);
                this.gnomeKicked = true;
            } else {
                horzPos += 15;
                vertPos += 8;
                this.gnome.style.left = horzPos + "px";
                this.gnome.style.bottom = vertPos + "px";
            }
        } else if(this.gnomeKicked == true && this.gnomeDead == false){
            if(horzPos <= -856){
                clearInterval(timer);
                this.gnomeKicked = false;
            } else {
                horzPos -= 7.5;
                if(vertPos >= -500){
                    vertPos -= 4;
                }
                console.log(vertPos);
                this.gnome.style.left = Number(left) + horzPos + "px";
                this.gnome.style.bottom = Number(bottom) + vertPos + "px";
            }
        } else if(this.gnomeDead == true) {
            this.gnome.style.display = "none";
        } else {
            return
        }
    }
}

function translateBoot(){
    let vertPos = 0;
    let horzPos = 0;
    let left = this.boot.style.left.slice(0, 3);
    let bottom = this.boot.style.bottom.slice(0, 2);
    let currentVertPos;
    let currentHorzPos;
    let timer = setInterval(frame, 1);
    function frame(){
        if (this.bootKicked == false && this.gnomeDead == false){
            if(horzPos >= 856){
                clearInterval(timer);
                this.bell.play();
                this.bootKicked = true;
                translateGnome()
            } else {
                horzPos += 8;
                vertPos += .8;
                this.boot.style.left = horzPos + "px";
                this.boot.style.bottom = vertPos + "px"
            }
        } else if(this.bootKicked == true){
            if(horzPos <= -856){
                clearInterval(timer);
                this.bootKicked = false;
                translateGnome();
            } else {
                horzPos -= 4;
                vertPos -= .4;
                this.boot.style.left = Number(left) + horzPos + "px";
                this.boot.style.bottom = Number(bottom) + vertPos + "px";
            } 
        } else {
            return
        }
    }
}

function translateExecutionSentence(){
    let vertPos = 0;
    let timer = setInterval (frame, 5);
    this.executionSentenceDiv.style.display = "block";
    this.executionSentence.style.display = "block";
    this.exeSentenceAudio.play();

    function frame(){
        if(this.gnomeDead == false){
            if(vertPos <= -285){
                clearInterval(timer);
                this.gnomeDeadSound.play();
                this.gnomeDead = true;
                setTimeout(() => {
                    this.executionSentence.style.display = "none";
                  }, 1000)
                swapGnomeSprite();
            } else {
                console.log("hitting this statement")
                vertPos -= 1;
                this.executionSentence.style.bottom = vertPos + "px";
                console.log(this.executionSentence.style.bottom);
            }
        } else {
            return
        }
    }
}

function swapGnomeSprite(){
    if(this.gnomeDead == true){
        this.gnome.style.display = "none";
        this.deadGnome.style.display = "block";
    } else {
        this.gnome.style.display = "block";
        this.deadGnome.style.display = "none";

    }
}

function resGnome(){
    this.gnomeDead = false;
    this.resAudio.play();
    setTimeout(() => {
        swapGnomeSprite();
    }, 2000)
}