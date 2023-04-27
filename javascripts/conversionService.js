modelUIDs = [
        "1a15cccc-2374-4972-8d04-df0c77c17d58", //conf_proe
        "a69a6d14-da6b-4968-861a-8d9789328ea5", //tire_2
        "1a69ed2c-2f6b-44bf-8ced-daa7c614240e", //tire_3
        "5ce21939-31c6-474e-96b4-9511e53b8ffa", // tire_4
        "ad213dbf-79c3-422c-8f7f-8f688debae05", //toyotire
        "6c4dbb16-71ca-491a-9192-8bf482a220f5", //VoiturePiston
        "f78027e9-9555-4f30-a0ba-787f0c6ba078" //proe_v3
]

async function startViewer(modelName, uid) {
        const conversionServiceURI = "https://csapi.techsoft3d.com";

        var viewer;

        let res = await fetch(conversionServiceURI + '/api/streamingSession');
        var data = await res.json();
        var endpointUriBeginning = 'ws://';

        if(conversionServiceURI.substring(0, 5).includes("https")){
                endpointUriBeginning = 'wss://'
        }

        await fetch(conversionServiceURI + '/api/enableStreamAccess/' + data.sessionid, { method: 'put', headers: { 'items': JSON.stringify(modelUIDs) } });

        viewer = new Communicator.WebViewer({
                containerId: "viewerContainer",
                endpointUri: endpointUriBeginning + data.serverurl + ":" + data.port + '?token=' + data.sessionid,
                model: "conf_proe",
                streamingMode: Communicator.StreamingMode.OnDemand,
                boundingPreviewMode: "none",
                enginePath: "https://cdn.jsdelivr.net/gh/techsoft3d/hoops-web-viewer",
                rendererType: 0
        });

        viewer.start();

        return viewer;

}
