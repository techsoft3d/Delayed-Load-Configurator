modelUIDs = [
        "968c442d-ac77-486f-92ee-69b722da342f", //conf_proe
        "8631708f-c969-461e-bc7c-1dc488e98a73", //tire_2
        "06664f83-366d-4c05-89b3-b7fe3f45e453", //tire_3
        "8ecd4026-d910-42b2-9faa-f113ea973864", // tire_4
        "78545625-ac79-47ff-a972-f1e841d3a247", //toyotire
        "d2974d89-814f-4700-9691-bc59633d18c0", //VoiturePiston
        "bdd6b246-3c62-4494-8767-168a908b4c1b" //proe_v3
]

async function startViewer(modelName, uid) {
        var viewer;
        let sessioninfo = await caasClient.getStreamingSession();
        await caasClient.enableStreamAccess(sessioninfo.sessionid, modelUIDs);
        viewer = new Communicator.WebViewer({
                containerId: "viewerContainer",
                endpointUri: sessioninfo.endpointUri,
                model: "conf_proe",
                streamingMode: Communicator.StreamingMode.OnDemand,
                boundingPreviewMode: "none",
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer",
                rendererType: 0
        });

        viewer.start();

        return viewer;

}

async function fetchVersionNumber() {
        let data = await caasClient.getHCVersion();
        versionNumer = data;        
        return data
      }
      



async function initializeViewer() {
        const models = ['conf_proe', 'proe_v3', 'tire_2', 'tire_3', 'tire_4', 'VoiturePiston', 'toyotire'];

        hwv = await startViewer()
    
        hwv.setCallbacks({
          sceneReady: function () {
            hwv.getSelectionManager().setHighlightLineElementSelection(false);
            hwv.getSelectionManager().setHighlightFaceElementSelection(false);
            hwv.getSelectionManager().setSelectParentIfSelected(false);
            hwv.getView().setAmbientOcclusionEnabled(true);
            hwv.getView().setAmbientOcclusionRadius(0.02);
            hwv.setClientTimeout(0, 60);
            hwv.getView().setCamera(Communicator.Camera.construct(INITIAL_VIEW));
            hwv.model.setEnableAutomaticUnitScaling(false);
    
          },
          modelStructureReady: function () {
            hwv.getView().getNavCube().disable();
            hwv.getView().getAxisTriad().disable();
    
            var op = hwv.operatorManager.getOperator(Communicator.OperatorId.Orbit)
            op.setOrbitFallbackMode(Communicator.OrbitFallbackMode.CameraTarget)
    
            var proe_button = document.getElementById('request_proe');
            proe_button.style.visibility = "visible"
    
            var show_piston_button = document.getElementById('show_piston');
            show_piston_button.style.visibility = "visible"
    
            var wheels_button = document.getElementById('wheels_button');
            wheels_button.style.visibility = "visible"
          },
          streamingActivated: function () {
            hideDialog();
          }
        });
    
        const uiConfig = {
          containerId: "content",
          screenConfiguration: Sample.screenConfiguration,
        }
        const ui = new Communicator.Ui.Desktop.DesktopUi(hwv, uiConfig);
        window.onresize = function () { hwv.resizeCanvas(); };
}