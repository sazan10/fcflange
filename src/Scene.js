
import React, {Component} from 'react';
import * as THREE from 'three'
import * as TrackballControls from 'three-trackballcontrols';
import { toCSG, fromCSG } from 'three-2-csg';
import Standard_nozzle from './Standard_nozzle';
class Scene extends Component {
    
    componentDidMount() {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      //ADD CAMERA
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
      );
      this.camera.position.z = 5;
  
      //ADD SCENE
  
      //ADD RENDERER
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      this.mount.appendChild(this.renderer.domElement);
      document.addEventListener( 'click', this.onDocumentMouseDown, false );

  
      //ADD CUBE
  
      this.controls = new TrackballControls(this.camera, this.renderer.domElement);
  
      this.controls.rotateSpeed = 1.0;
      this.controls.zoomSpeed = 1.2;
      this.controls.panSpeed = 0.8;
      this.controls.noZoom = false;
      this.controls.noPan = false;
      this.controls.staticMoving = true;
      this.controls.dynamicDampingFactor = 0.3;
      this.controls.keys = [65, 83, 68];
  
      let axes=new THREE.AxesHelper(100);
      this.scene.add(axes);
      var ambient = new THREE.AmbientLight(0xbbbbbb);
      this.scene.add(ambient);
  
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, 0, 1);
      this.scene.add(directionalLight);
      this.material = new THREE.MeshPhongMaterial({ color: '#0b7dba', emissive: 0x072534 });



      let length_of_pipe=1;
      let nozzle = Standard_nozzle(
        0.1,
        0.05, 
        0.18,
        0.12, 
        0.12, 
        0.235, 
        0.185, 
        0.0006,
        0.0144, 
        16, 
        0.2125, 
        0.011200000000000000001, 
        this.material);
    
          
      // let angle_tiltx=(Math.atan2(l1,m1));
      // let angle_tilt2x=(Math.atan2(m1,n1));
      // let angle_tilt3x=(Math.atan2(n1,m1));
      // let angle_tilt=(Math.atan2(normal1.x,normal1.y));
      // let angle_tilt2=(Math.atan2(normal1.y,normal1.z));
      // let angle_tilt3=(Math.atan2(normal1.x,normal1.z));
      // console.log("angle",90-(angle_tiltx*180)/Math.PI,90-(angle_tilt2x*180)/Math.PI,90-(angle_tilt3x*180)/Math.PI,(angle_tilt*180)/Math.PI,(angle_tilt2*180)/Math.PI,(angle_tilt3*180)/Math.PI);

      
      // let den1=Math.pow(offset,2);
      // let den2=Math.pow(offset,2);
      // let slope=((2*x_offset)/den1)+((2*y_offset)/den1)+((2*z_offset)/den1);
     // let deno=(Math.sqrt(1-Math.pow(x_offset/outer_radius,2)-Math.pow(y_offset/outer_height,2)))
      //   let Zx=-(x_offset/outer_radius)/deno
      // console.log("value of Zx",Zx);
      // let Zy=-((y_offset*outer_radius)/Math.pow(outer_height,2))/deno
      // console.log("value of Zy",Zy);  
      // let angle_theta=Math.acos(Zx/Math.sqrt((Zx*Zx+Zy*Zy+1)))
      this.scene.add(nozzle);
      this.start();
    }

      componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
      }
    
      start = () => {
        if (!this.frameId) {
          this.frameId = requestAnimationFrame(this.animate);
          this.controls.update();
          this.renderer.render(this.scene, this.camera);
        }
      }
    
      stop = () => {
        cancelAnimationFrame(this.frameId);
      }
    
      animate = () => {
        this.controls.update();
    
    
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
      }
    
      renderScene = () => {
        this.renderer.render(this.scene, this.camera);
      }
      render() {
        return ( <
          div style = {
            {
              width: '400px',
              height: '400px'
            }
          }
          ref = {
            (mount) => {
              this.mount = mount
            }
          }
          />
        );
      }

    }

    export default Scene;