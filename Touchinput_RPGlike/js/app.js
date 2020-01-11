let camera, scene, renderer, dt, lastframe = Date.now()

let Input = {x:0,y:0,touch:false}

if("ontouchstart" in document.documentElement){
    Input.touch = true
    let div = document.createElement("div");
    document.body.appendChild(div)
    div.setAttribute("id", "touchcontroller")
    let touchstick = document.getElementById("touchcontroller")
    div.style.cssText = "position: absolute;bottom: 35px;left: calc(50% - 65px);width: 150px;height: 150px;z-index: 2;border-radius: 100%;background-color: rgba(0, 0, 0, 0.100);display: none;border: 2px solid rgba(255, 255, 255, 0.267);"
    touchstick.style.display = "block" //show touch element
    document.getElementById("touchcontroller").addEventListener("touchmove", (e)=>{
        if(e.touches) {
            e.preventDefault();
            Input.x = (e.touches[0].pageX - (document.body.clientWidth/2) ) / 130
            Input.y = ( e.touches[0].pageY - (document.body.clientHeight - 95)) / 130
            if (touchstick !== document.elementFromPoint(e.touches[0].pageX,e.touches[0].pageY)) {
                Input.x = 0.5
                Input.y = Input.y
            }
        }
    })
    document.getElementById("touchcontroller").addEventListener("touchend", (e)=>{
        if(e.touches) {
            e.preventDefault();
            Input.x = 0
            Input.y = 0
        }
    })
}
else{
    alert("no touch device")
}

init();

function init() {
    
    camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.01, 1000 );
    
    
    scene = new THREE.Scene()
    
    let dirlight = new THREE.DirectionalLight( 0xcccffc, 3.4 )
    dirlight.name = "mainlight"
    dirlight.position.set(4,8,1)
    scene.add( dirlight );

    let player = new Player("player", camera)
    scene.add(player)

    let level = new Level("demo")
    scene.add(level)
    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setClearColor("#303338")
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.gammaOutput = true
    renderer.gammaFactor = 2.2
    renderer.physicallyCorrectLights = true
    window.addEventListener("resize", e => {
        renderer.setSize( window.innerWidth, window.innerHeight )
        camera.aspect =  window.innerWidth/ window.innerHeight
        camera.updateProjectionMatrix() 
    })
    document.body.appendChild( renderer.domElement )
    
    function update() {
        dt = (Date.now()-lastframe)/1000
    
        //if(animationmixerobject){animationmixerobject.update(dt)}
        //update code here
        // object.translateX/Y/Z(value)
        player.update(dt,Input)
        level.update()
    
        renderer.render( scene, camera )
        lastframe=Date.now()
        requestAnimationFrame( update )
    }
    update();
}
