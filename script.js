const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // Create a free camera, positioned at (0, 5, -10) and targeting the origin
  const camera = new BABYLON.FreeCamera(
    "camera",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  camera.speed = 0.2; // speed from arrow keys
  camera.angularSensibility = 15000; // speed from click and drag
  camera.setTarget(BABYLON.Vector3.Zero());

  // Attach the camera to the canvas
  camera.attachControl(canvas, true);

  // Create a light
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  light.groundColor = new BABYLON.Color3(0.961, 0.871, 0.582);

  // Create a sphere
  const sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 2 },
    scene
  );

  // Define information to display when hovering over the sphere
  const sphereInfo = "This is a sphere. It represents an object in the scene.";

  // Create a HTML element to display the information
  const infoDiv = document.createElement("div");
  infoDiv.id = "sphereInfo";
  infoDiv.style.position = "absolute";
  infoDiv.style.top = "10px";
  infoDiv.style.left = "10px";
  infoDiv.style.padding = "10px";
  infoDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  infoDiv.style.border = "1px solid #000";
  infoDiv.style.display = "none"; // Initially hidden

  // Append the info div to the document body
  document.body.appendChild(infoDiv);

  // Event handler for when the mouse enters the sphere's bounding box
  sphere.actionManager = new BABYLON.ActionManager(scene);
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOverTrigger,
      function (event) {
        // Show the information div and update its content
        infoDiv.innerHTML = sphereInfo;
        infoDiv.style.display = "block";
      }
    )
  );

  // Event handler for when the mouse leaves the sphere's bounding box
  sphere.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
      BABYLON.ActionManager.OnPointerOutTrigger,
      function (event) {
        // Hide the information div
        infoDiv.style.display = "none";
      }
    )
  );

  return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});
