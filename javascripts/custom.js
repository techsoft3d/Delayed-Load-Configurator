var nodes_requested = [];
var pistons_showing = false;

function replaceTires(wheel_selection) {
    if (!nodes_requested.includes(wheel_selection)) {
        hwv.getModel().requestNodes(wheel_selection);
        nodes_requested.push(wheel_selection);
    }

    hwv.getModel().setNodesVisibility(ALL_WHEELS, false);
    hwv.getModel().setNodesVisibility(wheel_selection, true);

    if (pistons_showing == true) {
        hwv.model.setNodesOpacity(ALL_WHEELS, 0.5);
    }
}

function hideDefaults() {
    hwv.getModel().setNodesVisibility(TIRES_0);
}

function showDialog() {
    $("#dialogContainer").css('visibility', 'visible');
}

function hideDialog() {
    $("#dialogContainer").css('visibility', 'hidden');
}

var FL_TIRE_0 = [
    4294969408,
    4294969464,
    4294968513,
    4294968515,
    4294969260,
    4294969409,
    4294969229,
    4294969260
];

var FR_TIRE_0 = [
    4294969408,
    4294969520,
    4294968512,
    4294968514,
    4294969353,
    4294969125
];

var RL_TIRE_0 = [
    4294967821,
    4294967820,
    4294968324,
    4294968439,
    4294968324,
    // Lug nuts
    4294968440,
    4294968441,
    4294968442,
    4294968443,
    4294968444,
    4294968445,
    4294968446,
    4294968447,
    4294968448,
    4294968449,
    4294968450,
    4294968451,
    4294968452,
    4294968453,
    4294968454,
    4294968455,
    4294968456,
    4294968457,
    4294968458,
    4294968459,
    4294968460,
    4294968461,
    4294968462,
    4294968463
];

var RR_TIRE_0 = [
    4294967858,
    4294967859,
    4294967860,
    4294967850,
    4294968012,
    4294968130
];

var DEFAULT_WHEELS = FL_TIRE_0.concat(FR_TIRE_0, RR_TIRE_0, RL_TIRE_0);

//Root nodes for toyotires, Ferrari, Potenza, Leader-Co
var TOYOTIRE = [3];
var FERRARI = [4];
var POTENZA = [5];
var LEADER_CO = [6];
var pistons = [2]
var car = [1];

var ALL_WHEELS = DEFAULT_WHEELS.concat(TOYOTIRE, FERRARI, POTENZA, LEADER_CO);

var INITIAL_VIEW =
{
    "position": {
        "x": -25,
        "y": 200,
        "z": 25
    },
    "target": {
        "x": -55,
        "y": 0,
        "z": 20
    },
    "up": {
        "x": 0,
        "y": 0,
        "z": 0.999
    },
    "width": 207,
    "height": 207,
    "projection": 1,
    "nearLimit": 0,
    "cameraFlags": 0
};

function requestProE() {
    if (!nodes_requested.includes(car)) {
        hwv.getModel().requestNodes(car);
        nodes_requested.push(car);

        var proe_button = document.getElementById('request_proe');
        proe_button.innerHTML = 'View Car';

        var wheels_dropdown = document.getElementById('wheels_dropdown');
        wheels_dropdown.style.pointerEvents = "auto";


        var wheels_dropdown = document.getElementById('wheels_button');
        wheels_button.style.backgroundColor = "#0090d0"
        wheels_button.style.opacity = 1

        var piston_button = document.getElementById('show_piston');
        piston_button.style.pointerEvents = "auto";
        piston_button.style.cursor = "pointer"
        piston_button.disabled = false;
        piston_button.style.backgroundColor = "#0090d0"
        piston_button.style.opacity = 1
    }

    else {
        hwv.model.setNodesOpacity([1], 1);
        var car_camera = Communicator.Camera.fromJson(car_camera_location);
        hwv.view.setCamera(car_camera)
    }

    hwv.model.setNodesOpacity(ALL_WHEELS, 1);
    pistons_showing = false;


}

function showPiston() {
    if (!nodes_requested.includes(pistons)) {
        hwv.getModel().requestNodes(pistons);
        nodes_requested.push(pistons);
    }

    hwv.model.setNodesOpacity([1], 0.5);
    hwv.model.setNodesOpacity(ALL_WHEELS, 0.5);

    var piston_camera = Communicator.Camera.fromJson(piston_camera_location);
    hwv.view.setCamera(piston_camera)


    pistons_showing = true;
}

var piston_camera_location = {
    "position": {
        "x": -29.572176057357552,
        "y": 17.156002844482778,
        "z": 13.104915829633887
    },
    "target": {
        "x": -16.6850004196167,
        "y": 0,
        "z": 9.613295386231997
    },
    "up": {
        "x": 0.1494010039380357,
        "y": -0.08820880476404012,
        "z": 0.9848342737661024
    },
    "width": 22.244490671101243,
    "height": 22.244490671101243,
    "projection": 1,
    "nearLimit": 0.01,
    "className": "Communicator.Camera"
}

var car_camera_location = {
    "position": {
        "x": 15.194014452495185,
        "y": 107.52558226832723,
        "z": 76.03133280772758
    },
    "target": {
        "x": -40.15882187848052,
        "y": 0.9875855794610793,
        "z": 7.780683527335974
    },
    "up": {
        "x": -0.21040135075422445,
        "y": -0.4475005605035838,
        "z": 0.8691803725060618
    },
    "width": 141.312,
    "height": 141.312,
    "projection": 1,
    "nearLimit": 0.01,
    "className": "Communicator.Camera"
}