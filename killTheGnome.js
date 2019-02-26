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
hammerOfWrath = document.getElementById("hammerOfWrath");
resAudio = document.getElementById("resSound");
scoreDisplay = document.getElementById("score");
critDisplay = document.getElementById("critDiv");
hammer = document.getElementById("hammer");
hammerOfWrathAudio = document.getElementById("hammerOfWrathAudio");
score = 0;
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
                let abilityScore = Math.floor((Math.random() * 3) + 1)
                if(abilityScore == 3){
                    this.critDisplay.style.display = "block";
                    setTimeout(() => {
                        this.critDisplay.style.display = "none"
                    }, 750)
                }
                this.score += abilityScore
                if(this.score >= 10){
                    showHammerOfWrath();
                }
                scoreDisplay.innerText = ("Score: " + this.score);
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
                let abilityScore = Math.floor((Math.random() * 4) + 1)
                if(abilityScore == 4){
                    this.critDisplay.style.display = "block";
                    setTimeout(() => {
                        this.critDisplay.style.display = "none"
                    }, 750)
                }
                this.score += abilityScore
                if(this.score >= 10){
                    showHammerOfWrath();
                }
                scoreDisplay.innerText = ("Score: " + this.score); 
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
        this.gnomeDead = false;
    }
}

function resGnome(){
    this.gnomeDead = false;
    this.resAudio.play();
    setTimeout(() => {
        swapGnomeSprite();
    }, 2000)
}

function showHammerOfWrath(){
    this.hammerOfWrath.src = "./assets/images&sprites/Spell_paladin_hammerofwrath.png";
}

function translateHammerOfWrath(){
    this.hammer.src = "./assets/images&sprites/Inv_hammer_04.png";
    let vertPos = 0;
    let timer = setInterval(frame, 1);
    if(this.gnomeDead == false){
        this.hammerOfWrathAudio.play();
    }

    function frame(){
        if(this.gnomeDead == false && this.gnomeKicked == false){
            console.log(this.gnomeDead)
            if(vertPos <= -650){
                clearInterval(timer);
                this.gnomeDeadSound.play();
                this.gnomeDead = true;
                this.hammer.src = "";
                let abilityScore = Math.floor((Math.random() * 5) + 1)
                if(abilityScore == 5){
                    this.critDisplay.style.display = "block";
                    setTimeout(() => {
                        this.critDisplay.style.display = "none"
                    }, 750)
                }
                this.score += abilityScore
                scoreDisplay.innerText = ("Score: " + this.score); 
                swapGnomeSprite();
            } else {
                vertPos -= 13;
                this.hammer.style.bottom = vertPos + "px";
            }
        } else {
            return
        }
    }
}