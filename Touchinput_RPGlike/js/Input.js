class Input{
    constructor(gampadindex=0, virtualsticks=1, pointerlock = true){
        this.mouse = {
            "x" : 0.0,
            "y" : 0.0
        }
        this.axes = {
            "verticalLeft" : 0.0,
            "horizontalLeft" : 0.0,
            "verticalRight" : 0.0,
            "horizontalRight" : 0.0,
        }
        this.buttons = {
            "jump" : false,
            "use" : false
        }
        this.pointerlock = pointerlock
        this.gampadindex = gampadindex 
        this.virtualsticks = virtualsticks
        this.virtualSticksize = 180
        this.virtualStickpadding = 30
        this.leftVStick = false
        this.rightVStick = false
        this.init()
    }
    init(){
        if(this.pointerlock){
            document.body.addEventListener("click", (e) => { document.body.requestPointerLock()})
        }
        window.addEventListener("mousemove", (e) => {this.mouse.x = e.movementX, this.mouse.y=e.movementY})
        window.addEventListener("keypress", (e)=> {
            if(e.code === "KeyW"){
                this.axes.verticalLeft = 1.0
            }
            if(e.code === "KeyS"){
                this.axes.verticalLeft = -1.0
            }
            if(e.code === "KeyA"){
                this.axes.horizontalLeft = 1.0
            }
            if(e.code === "KeyD"){
                this.axes.horizontalLeft = -1.0
            }
            if(e.code === "KeyE"){
                this.buttons.use = true
            }
            if(e.code === "Space"){
                this.buttons.jump = true
            }
        })
        window.addEventListener("keyup", (e)=> {
            if(e.code === "KeyW"){
                this.axes.verticalLeft = 0.0
            }
            if(e.code === "KeyS"){
                this.axes.verticalLeft = 0.0
            }
            if(e.code === "KeyA"){
                this.axes.horizontalLeft = 0.0
            }
            if(e.code === "KeyD"){
                this.axes.horizontalLeft = 0.0
            }
            if(e.code === "KeyE"){
                this.buttons.use = false
            }
            if(e.code === "Space"){
                this.buttons.jump = false
            }
        })
        this.createVitualstick("fuubar", 130, true)
        this.createVitualstick("fuubar2", document.body.clientWidth - 130, false)
    }
    update(){
        this.mouse.x = 0
        this.mouse.y = 0
        if(window.navigator.getGamepads()[this.gampadindex]){
            this.axes.verticalLeft = (window.navigator.getGamepads()[this.gampadindex].axes[1]).toFixed(0) 
            this.axes.horizontalLeft =( window.navigator.getGamepads()[this.gampadindex].axes[0]).toFixed(0) 
            this.axes.verticalRight =( window.navigator.getGamepads()[this.gampadindex].axes[3]).toFixed(0) 
            this.axes.horizontalRight = (window.navigator.getGamepads()[this.gampadindex].axes[2]).toFixed(0) 

            this.buttons.jump = window.navigator.getGamepads()[this.gampadindex].buttons[0].pressed
            this.buttons.use = window.navigator.getGamepads()[this.gampadindex].buttons[1].pressed
        }
    }

    createVitualstick(name = "", horizontalPosition, leftStick = true){
        if("ontouchstart" in document.documentElement){
            let x,y
            let touchindex = 0

            this.touch = true
            let div = document.createElement("div");
            document.body.appendChild(div)
            div.setAttribute("id", name)
            let touchstick = document.getElementById(name)
            div.style.cssText = "position: absolute;" +
                                "bottom: " + this.virtualStickpadding + "px;" +
                                "left: " + ( horizontalPosition - this.virtualSticksize/2) +"px;" +
                                "width: " + this.virtualSticksize + "px;" +
                                "height: " + this.virtualSticksize + "px;" +
                                "z-index: 2;" +
                                "border-radius: 100%;" +
                                "background-color: rgba(0, 0, 0, 0.100);" +
                                "display: none;" +
                                "border: 2px solid rgba(255, 255, 255, 0.267);"

            touchstick.style.display = "block" //show touch element
            document.getElementById(name).addEventListener("touchstart", (e)=>{
                if(leftStick){
                    this.leftVStick = true
                }
                else{
                    this.rightVStick = true
                }
                e.preventDefault()
                if(this.leftVStick === true && this.rightVStick === false){
                    touchindex = 0
                }
                else if(this.leftVStick === false && this.rightVStick === true){
                    touchindex = 0
                }
                else if(this.leftVStick === true && this.rightVStick === true){
                    touchindex = 1
                }

                else{
                    touchindex = 0
                }

            })
            document.getElementById(name).addEventListener("touchmove", (e)=>{
                if(e.touches) {

                    // touchindex = e.touches.length - 1
                    x = (e.touches[touchindex].pageX - horizontalPosition ) / this.virtualSticksize
                    y = ( e.touches[touchindex].pageY - (document.body.clientHeight - ((this.virtualSticksize/2) + this.virtualStickpadding ))) / this.virtualSticksize
                    if(leftStick){
                        this.axes.horizontalLeft = x * -1
                        this.axes.verticalLeft = y * -1
                    }
                    else{
                        this.axes.horizontalRight = x * -1
                        this.axes.verticalRight = y * -1
                    }

                }
            })
            document.getElementById(name).addEventListener("touchend", (e)=>{
                if(e.touches) {
                    // e.preventDefault()
                    if(leftStick){
                        this.leftVStick = false
                    }
                    else{
                        this.rightVStick = false
                    }
                    if(leftStick){
                        this.axes.horizontalLeft = 0
                        this.axes.verticalLeft = 0
                    }
                    else{
                        this.axes.horizontalRight = 0
                        this.axes.verticalRight = 0
                    }
                }
            })
        }
    }
    // debug(text){
    //     try {
    //         document.getElementById("debug").innerHTML = text
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}