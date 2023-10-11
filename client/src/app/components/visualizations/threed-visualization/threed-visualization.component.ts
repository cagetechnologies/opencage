import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as BABYLON from 'babylonjs';
import { BabylonFileLoaderConfiguration } from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import { FocusTransition } from 'src/app/components/analysises/focus_transition';

@Component({
  selector: 'app-threed-visualization',
  templateUrl: './threed-visualization.component.html',
  styleUrls: ['./threed-visualization.component.scss']
})
export class ThreedVisualizationComponent implements OnInit, AfterViewInit {

  value: any;
  
  @ViewChild('threeDeeCanvas')
  threeDeeCanvas: ElementRef<HTMLCanvasElement>;

  canvas: any;
  scene: any;
  camera1: any;

  enteredVR = false;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('/assets/test1.json').subscribe((response) => {
      let focusTransition = new FocusTransition();
      focusTransition.process(response);
    });
  }
  
  ngAfterViewInit(): void {
    this.canvas = this.threeDeeCanvas.nativeElement;
    //document.getElementById("threeDeeCanvas"); // Get the canvas element
    const engine = new BABYLON.Engine(this.canvas, true); // Generate the BABYLON 3D engine
    // Add your code here matching the playground format
    //const scene = createScene(); //Call the createScene function
    this.scene = new BABYLON.Scene(engine);
    const camera = //new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new BABYLON.Vector3(0, 0, 0), this.scene);
      new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), this.scene);
    camera.attachControl(this.canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);
    //const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
    const explorationNode = new BABYLON.TransformNode("shackletonNode", this.scene);
    explorationNode.position.x = -1;
    explorationNode.position.y = 0;
    explorationNode.position.z = 0;
    const explorationLabel = new GUI.TextBlock();
    explorationLabel.text = 'exploration';
    explorationLabel.color = "#FFFFFF";

    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.addControl(explorationLabel);
    explorationLabel.linkWithMesh(explorationNode);

    const shackletonNode = new BABYLON.TransformNode("shackletonNode", this.scene);
    shackletonNode.position.x = -4;
    shackletonNode.position.y = 0;
    shackletonNode.position.z = 0;
    const shackletonLabel = new GUI.TextBlock();
    shackletonLabel.text = 'Shackleton';
    shackletonLabel.color = "#FFFFFF";
    //shackletonLabel.alpha = 1;
    //shackletonLabel.background = "#EEEEEE";
    advancedTexture.addControl(shackletonLabel);
    shackletonLabel.linkWithMesh(shackletonNode);

    BABYLON.MeshBuilder.CreateLines("explorationToShackleton", {
      points: [
        new BABYLON.Vector3(-1, 0, 0),
        new BABYLON.Vector3(-4, 0, 0)
      ]
    });

    const southPoleNode = new BABYLON.TransformNode("southPoleNode", this.scene);
    southPoleNode.position.x = 2;
    southPoleNode.position.y = 0;
    southPoleNode.position.z = 0;
    const southPoleLabel = new GUI.TextBlock();
    southPoleLabel.text = 'South Pole';
    southPoleLabel.color = "#FFFFFF";
    advancedTexture.addControl(southPoleLabel);
    southPoleLabel.linkWithMesh(southPoleNode);

    BABYLON.MeshBuilder.CreateLines("explorationToSouthPole", {
      points: [
        new BABYLON.Vector3(-1, 0, 0),
        new BABYLON.Vector3(2, 0, 0)
      ]
    });

    const antarcticaNode = new BABYLON.TransformNode("antarcitcaNode", this.scene);
    antarcticaNode.position.x = 2;
    antarcticaNode.position.y = 2;
    antarcticaNode.position.z = 0;
    const antarcticaLabel = new GUI.TextBlock();
    antarcticaLabel.text = 'Antarctica';
    antarcticaLabel.color = "#FFFFFF";
    advancedTexture.addControl(antarcticaLabel);
    antarcticaLabel.linkWithMesh(antarcticaNode);

    BABYLON.MeshBuilder.CreateLines("explorationToAntarctica", {
      points: [
        new BABYLON.Vector3(-1, 0, 0),
        new BABYLON.Vector3(2, 2, 0)
      ]
    });

    const expeditionNode = new BABYLON.TransformNode("expeditionNode", this.scene);
    expeditionNode.position.x = 2;
    expeditionNode.position.y = -3;
    antarcticaNode.position.z = 0;
    const expeditionLabel = new GUI.TextBlock();
    expeditionLabel.text = 'expedition';
    expeditionLabel.color = "#FFFFFF";
    advancedTexture.addControl(expeditionLabel);
    expeditionLabel.linkWithMesh(expeditionNode);

    BABYLON.MeshBuilder.CreateLines("explorationToExpedition", {
      points: [
        new BABYLON.Vector3(-1, 0, 0),
        new BABYLON.Vector3(2, -3, 0)
      ]
    });

    const disasterNode = new BABYLON.TransformNode("disasterNode", this.scene);
    disasterNode.position.x = 4;
    disasterNode.position.y = -3;
    disasterNode.position.z = 0;
    const disasterLabel = new GUI.TextBlock();
    disasterLabel.text = 'disaster';
    disasterLabel.color = "#FFFFFF";
    advancedTexture.addControl(disasterLabel);
    disasterLabel.linkWithMesh(disasterNode);

    BABYLON.MeshBuilder.CreateLines("expeditionToDisaster", {
      points: [
        new BABYLON.Vector3(2, -3, 0),
        new BABYLON.Vector3(4, -3, 0)
      ]
    });

    //this.camera1 = new BABYLON.WebVRFreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), this.scene);

    // after creating a button with vrButton as ID:
    /*let button = document.getElementById("vrButton");
    function attachWebVR() {

    }
    button.addEventListener("click", attachWebVR, false);*/

    // Register a render loop to repeatedly render the scene
    let scene = this.scene;
    engine.runRenderLoop(function () {
      scene.render();
    });


    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
      engine.resize();
    });
  }

  ngOnInit(): void {

  }

  enterVR() {
    this.enteredVR = true;


    const env = this.scene.createDefaultEnvironment();

    let xrHelper = this.scene.createDefaultXRExperienceAsync({
      floorMeshes: [env.ground] /* Array of meshes to be used as landing points */,
    });

    const featureManager = xrHelper.baseExperience.featuresManager;
    featureManager.enableFeature(BABYLON.WebXRFeatureName.HAND_TRACKING, "latest", {
      xrInput: xrHelper.input,
    });
    //this.camera1.attachControl(this.canvas, true);
  }

}
