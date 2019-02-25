bootKicked = false;
gnomeDead = false;
gnomeKicked = false;
specialUnlocked = false;

function resGnome(){
    console.log("onclick works!");
}

function translateGnome(){
    let gnome = document.getElementById("gnome");
    let vertPos = -180;
    let horzPos = 0;
    let left = gnome.style.left.slice(0, 3);
    let bottom = gnome.style.bottom.slice(0, 3);
    console.log(gnome.style.bottom)
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
                gnome.style.left = horzPos + "px";
                gnome.style.bottom = vertPos + "px";
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
                gnome.style.left = Number(left) + horzPos + "px";
                gnome.style.bottom = Number(bottom) + vertPos + "px";
            }
        } else {
            return
        }
    }
}

function translateBoot(){
    let boot = document.getElementById("boot");
    let bell = document.getElementById("bootAudio");
    let vertPos = 0;
    let horzPos = 0;
    let left = boot.style.left.slice(0, 3);
    let bottom = boot.style.bottom.slice(0, 2);
    let currentVertPos;
    let currentHorzPos;
    let timer = setInterval(frame, 1);
    function frame(){
        if (this.bootKicked == false){
            if(horzPos >= 856){
                clearInterval(timer);
                bell.play();
                this.bootKicked = true;
                translateGnome()
            } else {
                horzPos += 8;
                vertPos += .8;
                boot.style.left = horzPos + "px";
                boot.style.bottom = vertPos + "px"
            }
        } else if(this.bootKicked == true){
            if(horzPos <= -856){
                clearInterval(timer);
                this.bootKicked = false;
                translateGnome();
            } else {
                horzPos -= 4;
                vertPos -= .4;
                boot.style.left = Number(left) + horzPos + "px";
                boot.style.bottom = Number(bottom) + vertPos + "px";
            } 
        } else {
            return
        }
    }
}

function resetBoot(){

}