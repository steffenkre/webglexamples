class Level extends THREE.Object3D{
    constructor(name){
        super()
        this.name = name
        this.colliderMesh
        this.visible = true
        this.loader = new THREE.GLTFLoader()
        this.preload()
    }
    preload(){
        this.loader.load( 'assets/collider.glb', (gltf)  => {
            this.colliderMesh = gltf.scene.children[0]
            this.add(this.colliderMesh),
            this.init()
        })
    }
    init(){
        //init code here
        this.add(new THREE.GridHelper(100,100))
        this.add(this.colliderMesh)
    }
    update(){
        //update code here
    }
}