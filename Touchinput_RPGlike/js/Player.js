class Player extends THREE.Object3D{
    constructor(name, camera){
        super()
        this.name = name
        this.camera = camera
        this.camera.name = "camera"
        this.Mesh = new THREE.Mesh( new THREE.BoxGeometry( 0.75, 1.85, 0.75 ), new THREE.MeshNormalMaterial() )
        this.Mesh.name = "dummy"
        this.movespeed = 8
        this.init()
    }
    init(){
        this.add(this.Mesh)
        //this.add(this.camera)
        this.camera.position.set(0,8,10)
        this.camera.rotation.x = THREE.Math.degToRad(-40)
        this.Mesh.position.set(0, 0.9, 0)
    }
    update(delta, input){
        let collider = this.parent.getObjectByName("Collider")
        if (collider !== undefined){
            let intersects = this.checkIntersection(0.75,1.85, this, [collider])
            //console.log(intersects)
            input = this.moveWithCollision(intersects, input)
        }
        this.cameraFollow(input)
        this.translateX(this.movespeed*delta*input.x)
        this.translateZ(this.movespeed*delta*input.y)
    }
    moveWithCollision(intersects, input){
        let newInput = input
        if(intersects.left === true && input.x < 0){
            newInput.x = 0
        }
        if(intersects.right === true && input.x > 0){
            newInput.x = 0
        }
        if(intersects.front === true && input.y > 0){
            newInput.y = 0
        }
        if(intersects.back === true && input.y < 0){
            newInput.y = 0
        }
        return newInput
    }
    cameraFollow(input){
        let offsetX = this.position.x - ( input.x / 5 )
        let offsetZ = this.position.z + 10 - ( input.y / 5)
        this.camera.position.set(offsetX,8,offsetZ)
    }
    checkIntersection(width = 1.0, height= 1.0, object = new THREE.Object3D() , collider = []){
        let intersects = {
            "up" : false,
            "down" : false,
            "front" : false,
            "back" : false,
            "left" : false,
            "right" : false
        }

        let rayVector = new THREE.Vector3(object.position.x, object.position.y + 0.5 , object.position.z)
        if(collider.length > 0){
            let upcast = new THREE.Raycaster(rayVector, new THREE.Vector3(0,1,0), 0.0, height/2)
            let downcast = new THREE.Raycaster(rayVector, new THREE.Vector3(0,-1,0), 0.0, height/2)
            let frontcast = new THREE.Raycaster(rayVector, new THREE.Vector3(0,0,1), 0.0, width/2)
            let backcast = new THREE.Raycaster(rayVector, new THREE.Vector3(0,0,-1), 0.0, width/2)
            let leftcast = new THREE.Raycaster(rayVector, new THREE.Vector3(-1,0,0), 0.0, width/2)
            let rightcast = new THREE.Raycaster(rayVector, new THREE.Vector3(1,0,0), 0.0, width/2)
            
            let intersectionlist = upcast.intersectObjects(collider)
            if(intersectionlist.length > 0){
                intersects.up = true
            }
            
            intersectionlist = downcast.intersectObjects(collider)
            if(intersectionlist.length > 0){
                intersects.down = true
            }
            
            intersectionlist = frontcast.intersectObjects(collider)
            if(intersectionlist.length > 0){
                intersects.front = true
            }
            
            intersectionlist = backcast.intersectObjects(collider)
            if(intersectionlist.length > 0){
                intersects.back = true
            }
            
            intersectionlist = leftcast.intersectObjects(collider)
            if(intersectionlist.length > 0){
                intersects.left = true
            }
            
            intersectionlist = rightcast.intersectObjects(collider)
            if(intersectionlist.length > 0){
                intersects.right = true
            }
        }
        return intersects
    }
}