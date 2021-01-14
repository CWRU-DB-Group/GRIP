
var tid = 1;
var ptid = 0;
var scenario = 'awesome';
var pnodeslist = [];
var pedgeslist = [];
var explore = null;

var LENGTH_MAIN = 350,
    LENGTH_SERVER = 150,
    LENGTH_SUB = 50,
    WIDTH_SCALE = 2,
    GREEN = "green",
    RED = "#C5000B",
    ORANGE = "orange",
    //GRAY = '#666666',
    GRAY = "gray",
    BLACK = "#2B1B17";

// Called when the Visualization API is loaded.
function draw1(cptid) {

    var container = document.getElementById("mynetwork");
    var data = {
        nodes: pnodeslist[cptid],
        edges: pedgeslist[cptid],
    };
    var options = {
        nodes: {
            scaling: {
                min: 8,
                max: 8,
            },
            font: {
                size: 20,
                align: "left",
            },
            color: GRAY,
        },
        edges: {
            color: GRAY,
            smooth: false,
            font: {
                size: 20,
            },
            length: 8,
        },

        // physics: {
        //     barnesHut: {gravitationalConstant: -30000},
        //     stabilization: {iterations: 2500},
        // },
        groups: {

            pattern: {
                shape: "dot",
                color: "#2B7CE9", // blue
            },
            root: {
                shape: "dot",
                color: "#C5000B", // purple
            },

        },
        layout: {
            hierarchical: {
                direction: "UD",
            },
        },
    };
    var network = new vis.Network(container, data, options);
    network.on("click", function (params) {

        if (params.nodes[0] != null) {
            alert('You seleted node ' + params.nodes[0]);
        }


    });

}


function draw(nodes, edges, ctid) {

    var container = document.getElementById("mynetwork" + ctid);
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {
        nodes: {
            scaling: {
                min: 4,
                max: 6,
            },
            font: {
                size: 10,
            },
        },
        edges: {
            color: BLACK,
            smooth: false,
            font: {
                size: 6,
            },
            length: 25,
            arrows: {
                to: {
                    enabled: false,

                    scaleFactor: 0.5,

                    type: "arrow"
                },
            },
        },

        // physics: {
        //     barnesHut: {gravitationalConstant: -30000},
        //     stabilization: {iterations: 2500},
        // },
        groups: {

            pattern: {
                shape: "dot",
                color: GRAY, // blue
            },
            root: {
                shape: "dot",
                color: "#C5000B", // purple
            },

        },
    };
    var network = new vis.Network(container, data, options);
    // network.on("click", function (params) {
    //
    //
    //     alert('haha');
    //
    // });

}


$('#exampleModal').on('show.bs.modal', function (event) {
    //....
})

$("#add-rule").click(function () {

    var ctid = tid;
    tid = tid + 1;
    var nodes = [];
    var edges = [];
    var text = $('#rule-text').val();
    var lines = text.split("\n");
    alert(ctid);
    var flag = false;
    for (var i = 0; i < lines.length; i++) {

        var line = lines[i].split(" ");
        if (i == 0 && line[0] == 'k') {
            flag = true;
            continue;
        }
        if ((i == 1 || i == 2) && flag) {

            var id = line[0];
            var lab = line[1];
            var curr_node = {
                id: id,
                label: id + "\n" + lab,
                group: "root",
                value: 10,
            };
            nodes.push(curr_node);
            continue;
        }

        if (line.length == 2) {

            var id = line[0];
            var lab = line[1];
            var curr_node = null;


            var curr_node = {
                id: id,
                label: id + "\n" + lab,
                group: "pattern",
                value: 10,
            };


            nodes.push(curr_node);
            continue;
        }

        if (line.length == 3) {
            edges.push({
                from: line[0],
                to: line[2],
                length: 40,
                color: BLACK,
                width: 2,
                label: line[1],
                arrows: "to",
            });
            continue;
        }

        if (line.length == 4) {
            edges.push({
                from: line[0],
                to: line[2],
                length: 40,
                color: RED,
                width: 2,
                label: line[1],
                arrows: "to",
                dashes: true,
            });
            continue;
        }

    }


    $('#rule-dis').append("<div class=\"tab-pane\"" +
        "                                         aria-labelledby=\"home-tab" + ctid + "\">\n" +
        "                                        <div id=\"mynetwork" + ctid + "\" class=\"network\">\n" +
        "\n" +
        "                                        </div>\n" + " <label class =\"center\">Rule" + " " + ctid + "</label>" +
        "                                    </div>\n");


    draw(nodes, edges, ctid);

});
$('#SPARQL').val("SELECT ?virus\n" +
    "{\n" +
    "?disease rdfs:causedBy ?virus\n" +
    "?disease rdfs:name “COVID-19”\n" +
    "?virus rdfs:realm “Ribobiria”\n" +
    "}");


$('#awesome').prop('checked', true);


var cnodes0 = [];
var cedges0 = [];

pnodeslist[0] = cnodes0;
pedgeslist[0] = cedges0;


var cnodes1 = [];
var cedges1 = [];

pnodeslist[1] = cnodes1;
pedgeslist[1] = cedges1;

cnodes0.push({
    id: 'Sr',
    label: "Sr",
    group: "pattern",
    value: 10,
});
cnodes0.push({
    id: 'S1',
    label: "S1",
    group: "pattern",
    value: 10,
});

cnodes0.push({ id: 'S2',
    label: "S2",
    group: "pattern",
    value: 10,});

cnodes0.push({ id: 'S3',
    label: "S3",
    group: "pattern",
    value: 10,});

cnodes0.push({ id: 'S4',
    label: "S4",
    group: "pattern",
    value: 10,});

cedges0.push({
    from: 'Sr',
    to: 'S1',
    color: GRAY,
    width: 3.5,
    label: "((v2,v3),(⊕(v2,v3),testedBy),φ1)",
    arrows: "to",
});

cedges0.push({
    from: 'Sr',
    to: 'S4',
    color: RED,
    width: 3.5,
    arrows: "to",
    dashes: true,
});

cedges0.push({
    from: 'S2',
    to: 'S3',
    color: RED,
    width: 3.5,
    arrows: "to",
    dashes: true,
});

cedges0.push({
    from: 'S2',
    to: 'S1',
    color: GRAY,
    width: 3.5,
    label: "((v2,v3),(⊕(v2,v),testedBy),φ2)",
    arrows: "to",
});












cnodes1.push({
    id: 'Sr',
    label: "Sr",
    group: "pattern",
    value: 10,
});


cnodes1.push({
    id: 'S1',
    label: "S1",
    group: "pattern",
    value: 10,
});

cnodes1.push({ id: 'S2',
    label: "S2",
    group: "pattern",
    value: 10,});

cnodes1.push({ id: 'S3',
    label: "S3",
    group: "pattern",
    value: 10,});

cnodes1.push({ id: 'S4',
    label: "S4",
    group: "pattern",
    value: 10,});

cedges1.push({
    from: 'Sr',
    to: 'S1',
    color: GRAY,
    width: 3.5,
    label: "((v2,v3),(⊕(v2,v3),testedBy),φ1)",
    arrows: "to",
});

cedges1.push({
    from: 'S1',
    to: 'S2',
    color: GRAY,
    width: 3.5,
    label: "((v1,v2),O(v1,v2),φ2)",
    arrows: "to",
});

cedges1.push({
    from: 'S3',
    to: 'S2',
    color: RED,
    width: 3.5,
    label: "((v0,v1),(⊕(v0,v1),variantOf),φ3)",font: { align: "bottom" },
    arrows: "to",
    dashes: true,
    length: 40,
});

cedges1.push({
    from: 'S2',
    to: 'S4',
    color: GRAY,
    width: 3.5,
    label: "((v2,v3),(⊕(v2,v3),testedBy),φ4)",
    arrows: "to",

});




$('#show-r').click(function () {


   if (scenario == 'awesome') {
       draw1(1);
   } else {
       draw1(0);
   }
   $(".e-forward").show();
    $('img').show();

});

$('#bright').click(function () {

    ptid = ptid + 1
    draw1(ptid);

});


$("#radios").find('input[type=radio][name=miss]').change(function () {
    if (this.value == 'awesome') {
        $("#manswer").hide();
        $("#matt").hide();
        $("#mlink").show();
        scenario = 'awesome';


    } else if (this.value == 'very-awesome') {
        $("#manswer").hide();
        $("#matt").show();
        $("#mlink").hide();
        scenario = 'very-awesome';

    } else {
        $("#manswer").show();
        $("#matt").hide();
        $("#mlink").hide();
        scenario = 'no-awesome';
    }
});

$(document).ready(function (){
        $("#manswer").hide();
        $("#matt").hide();
        $("#mlink").show();
        $(".e-backward").hide();
        $(".e-forward").hide();
        $('img').hide();
});


$

("#b-explore").click(function ( ){


  if (explore == 'f') {
      $('.e-backward').show();
  } else {
      alert("There is no explanation!")
  }


});

$("#e-radios").find('input[type=radio][name=bidi]').change(function () {

    if (this.value == 'forward') {

       explore = 'f';

    } else {

        explore = 'b';
    }
});

