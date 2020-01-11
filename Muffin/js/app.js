let camera, scene, renderer, dt, lastframe = Date.now()

init()

function init() {
    
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 )
    camera.position.set(0,0.4,6)
    
    scene = new THREE.Scene()
    
    let dirlight = new THREE.DirectionalLight( 0xcccffc, 5.4 )
    dirlight.name = "mainlight"
    dirlight.position.set(4,3,1)
    scene.add( dirlight )

    let ambilight = new THREE.AmbientLight( 0xcccffc, 0.6 )
    ambilight.name = "ambilight"
    scene.add( ambilight )
    
    let lightA = new THREE.PointLight( 0xffffff, 1.4 )
    lightA.name = "lightA"
    lightA.position.set(-2,1,2)
    scene.add( lightA )

    let lightB = new THREE.PointLight( 0xffddff,3.0 )
    lightB.name = "lightB"
    lightB.position.set(1,1,3)
    scene.add( lightB )

    let atom = new THREE.Group()
    atom.name = 'atom'
    scene.add(atom)

    let cherryA = new THREE.Group()
    cherryA.name = 'cherryA'
    atom.add(cherryA)

    let cherryB = new THREE.Group()
    cherryB.name = 'cherryB'
    atom.add(cherryB)

    let cherryC = new THREE.Group()
    cherryC.name = 'cherryC'
    atom.add(cherryC)

    let muffin
    const loader = new THREE.GLTFLoader()
    loader.load( 'assets/Muffin.glb', (gltf)  => {
        muffin = gltf.scene.children[0]
        muffin.name = 'muffin'
        scene.add( muffin )
        atom.add(muffin)
        muffin.position.set(0,-1,0)
    } )

    let cherry
    // const loader = new THREE.GLTFLoader()
    loader.load( 'assets/Cherry.glb', (gltf)  => {
        cherry = gltf.scene.children[0]
        cherry.name = 'cherry'
        let secondCherry = cherry.clone()
        let thirdCherry = cherry.clone()
        cherryA.add( cherry )
        cherryB.add( secondCherry )
        cherryC.add( thirdCherry )
        cherry.position.set(2,0,0)
        secondCherry.position.set(-2,0,0)
        thirdCherry.position.set(0,2,0)
    } )

    // atom.rotation.set(THREE.Math.degToRad(20*dt),0,0)


    atom.rotation.set(0.4*Math.PI/4 , 0, 0.2*Math.PI/4 )
    cherryA.rotation.set(0.1*Math.PI/4 , 0, 1*Math.PI/4.2 )
    cherryB.rotation.set(-0.1*Math.PI/4, 0, 5.1*Math.PI/6 )
    
    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setClearColor("#13c9ff")
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
        atom.rotateY(THREE.Math.degToRad(20*dt))
        atom.rotateX(THREE.Math.degToRad(2*dt))
        cherryA.rotateY(THREE.Math.degToRad(160*dt))
        cherryB.rotateY(THREE.Math.degToRad(-155*dt))
        cherryC.rotateX(THREE.Math.degToRad(-150*dt))
        renderer.render( scene, camera )
        lastframe=Date.now()
        requestAnimationFrame( update )
    }
    update()
}
