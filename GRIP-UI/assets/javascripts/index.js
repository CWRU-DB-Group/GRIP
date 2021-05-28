var tid = 1;
var ptid = 0;
var scenario = null;
var pnodeslist = [];
var pedgeslist = [];
var explore = null;

var nodes = [];
var edges = [];
var network = null;

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

function draw2() {


    // create a network
    var container = document.getElementById("mynetwork_graph_info");

    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {

        interaction: {hover: true},

        nodes: {
            scaling: {
                min: 10,
                max: 50,
            },

        },
        edges: {
            color: GRAY,
            width: WIDTH_SCALE * 2
        },

        groups: {
            error: {
                shape: "dot",
                color: RED, // orange
                size: 10,
            },
            correct: {
                shape: "dot",
                color: "#2B7CE9", // blue
                size: 10,
            },

        },

    };
    network = new vis.Network(container, data, options);
    network.on("hoverNode", function (params) {
        console.log("hoverNode Event:", params);
    });


}

// Called when the Visualization API is loaded.
$(document).on("click", "#answer", function (e) {
    alert("Showing data graph.");
    $("#node-info-table").show();
    nodes = [];
    edges=[];
    nodes.push({
        id: 1,
        label: "COVID-19",
        group: "error",
        value: 5,
        font: {
            size: 20,
        },
        title: "Type:Disease" + "\n" + "Name:COVID-19",

    });

    nodes.push({
        id: 2,
        label: "v1" + "\n" + "COVID-Virus",
        group: "correct",
        value: 5,
        font: {
            size: 20,
        },
        title: "Type:Virus" + "\n" + "Name:COVID-Virus",

    });
    nodes.push({
        id: 3,
        label: "v2" + "\n" + "SARS-COV-2",
        group: "correct",
        value: 5,
        font: {
            size: 20,
        },
        title: "Type:Virus" + "\n" + "Name:SARS-COV-2" + "\n" + "realm:Riboviria",

    });
    nodes.push({
        id: 4,
        label: "rt-PRC",
        group: "correct",
        value: 5,
        font: {
            size: 20,
        },
        title: "Type:Testing_Method" + "\n" + "Name:rt-PRC",

    });
    nodes.push({
        id: 5,
        label: "RNA",
        group: "correct",
        value: 5,
        font: {
            size: 20,
        },
        title: "Type:RNA" + "\n" + "Name:SARS-COV-2 RNA",

    });

    edges.push({
        from: 2,
        to: 1,
        color: RED,
        width: 1.5,
        arrows: "to",
    });

    edges.push({
        from: 3,
        to: 1,
        color: RED,
        width: 1.5,
        arrows: "to",
    });
    edges.push({
        from: 3,
        to: 5,
        color: GRAY,
        width: 1.5,
        arrows: "to",
    });
    edges.push({
        from: 2,
        to: 4,
        color: GRAY,
        width: 1.5,
        arrows: "to",
    });

    edges.push({
        from: 5,
        to: 4,
        color: GRAY,
        width: 1.5,
        arrows: "to",
    });

    edges.push({
        from: 3,
        to: 4,
        color: ORANGE,
        width: 1.5,
        arrows: "to",
        dashes: true
    });


    draw2();
    e.stopImmediatePropagation();
});




function draw1(cptid) {

    var container = document.getElementById("mynetwork");
    var data = {
        nodes: pnodeslist[cptid],
        edges: pedgeslist[cptid],
    };
    var options = {
        nodes: {
            scaling: {
                min: 10,
            },
            font: {
                size: 15,
            },
        },
        edges: {

            length: 25,
            arrows: "to",
        },
        layout: {
            hierarchical: {
                direction: "UD",
            },
        },

        groups: {

            pattern: {
                shape: "dot",

            },


        },
    };
    var network = new vis.Network(container, data, options);
    network.on("stabilizationIterationsDone", function () {
        network.setOptions({physics: false});
    });

    network.on("click", function (params) {

        var nodeID = params.nodes[0];

        if (nodeID == "S1"){
            drawM1();
        } else if (nodeID == "S2") {
            drawM();
        } else {
            drawM1();
        }
    });

}


function draw(nodes, edges, ctid, literals) {


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
    if (literals.length != 0) {
        $("#literal" + ctid).append("Literals: " + literals);
    }

    // network.on("click", function (params) {
    //
    //
    //     alert('haha');
    //
    // });

}

$("#query-confirm").click(function () {
    $("#query-id").text("Q1.txt");
    $('#SPARQL').val("SELECT ?virus\n" +
    "{\n" +
    "?disease rdfs:causedBy ?virus\n" +
    "?disease rdfs:name “COVID-19”\n" +
    "?virus rdfs:realm “Ribobiria”\n" +
    "}");
});

$("#c-confirm").click(function () {

    if ($('#cpath').get(0).files.length === 0) {
        alert("No constraints are selected!");
        return;
    }
    $("#rule-dis").empty();
    $("#rule-text").text("");
    tid = 1;
    var text1 = "c\n" +
        "u1 RNA\n" +
        "u2 virus\n" +
        "u3 testing_method\n" +
        "u2 possess u1\n" +
        "u1 testedBy u3\n" +
        "u2 testedBy u3 *\n";

    var text2 = "k\n" +
        "u4 RNA\n" +
        "u4’ RNA\n" +
        "u5 disease\n" +
        "u6 testing_method\n" +
        "u7 disease\n" +
        "u8 testing_method\n" +
        "u4 causedBy u5\n" +
        "u4’ causedBy u7\n" +
        "u4 testedBy u6\n" +
        "u4’ testedBy u8";

    var text3 = "c\n" +
        "u1 virus\n" +
        "u2 virus\n" +
        "u3 disease\n" +
        "u1 causedBy u3\n" +
        "u2 causedBy u3\n" +
        "u1 variantOf u2 *\n" +
        "l\n" +
        "u1.realm = u2.realm";

    var text4 = "c\n" +
        "u1 virus\n" +
        "u2 testing_method\n" +
        "u3 enzyme\n" +
        "u1 sensitiveTo u3\n" +
        "u3 usedBy u2\n" +
        "u1 testedBy u2 *";


        appendRule(text1);


        appendRule(text2);


        appendRule(text3);


        appendRule(text4);

        $("#rule-text").text(text1+ "\n" + text2 + "\n"+ text3 +"\n"+ text3);
        $("#rule-text").attr('disabled', 'disabled');



});



$("#c-browse").click(function () {



    $('#exampleConstraintModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false,

    }).on('show', function () {

    });


    //do all your operation populate the modal and open the modal now. DOnt need to use show event of modal again

        $('#constraint-modal-body').html($('<p>c (GAR 1)</p>\n' +
            '<p>u1 RNA</p>\n' +
            '<p>u2 virus</p>\n' +
            '<p>u3 testing_method</p>\n' +
            '<p>u2 possess u1</p>\n' +
            '<p>u1 testedBy u3</p>\n' +
            '<p>u2 testedBy u3 *</p>\n' +
            '<p><br></p>\n' +
            '<p>k (GK 2)</p>\n' +
            '<p>u4 RNA</p>\n' +
            '<p>u4&rsquo; RNA</p>\n' +
            '<p>u5 disease</p>\n' +
            '<p>u6 testing_method</p>\n' +
            '<p>u7 disease</p>\n' +
            '<p>u8 testing_method</p>\n' +
            '<p>u4 causedBy u5</p>\n' +
            '<p>u4&rsquo; causedBy u7</p>\n' +
            '<p>u4 testedBy u6</p>\n' +
            '<p>u4&rsquo; testedBy u8</p>\n' +
            '<p><br></p>\n' +
            '<p>c (GAR 3)</p>\n' +
            '<p>u1 virus</p>\n' +
            '<p>u2 virus</p>\n' +
            '<p>u3 disease</p>\n' +
            '<p>u1 causedBy u3</p>\n' +
            '<p>u2 causedBy u3</p>\n' +
            '<p>u1 variantOf u2 *</p>\n' +
            '<p>l</p>\n' +
            '<p>u1.realm = u2.realm</p>\n' +
            '<p><br></p>\n' +
            '<p>c (GAR 4)</p>\n' +
            '<p>u1 virus</p>\n' +
            '<p>u2 testing_method</p>\n' +
            '<p>u3 enzyme</p>\n' +
            '<p>u1 sensitiveTo u3</p>\n' +
            '<p>u3 usedBy u2</p>\n' +
            '<p>u1 testedBy u2 *</p>'));

        $('#exampleModalLabel4').text("Description of " + "Constraints");
        $('#exampleConstraintModal').modal('show');




});

$("#load-rule").click(function () {



    // alert("Done loading constraints.")


});

function appendRule(text) {

    var ctid = tid;
    var literal = false;
    tid = tid + 1;
    var nodes = [];
    var edges = [];
    var lines = text.split("\n");

    var flag = false;
    var literals = "";

    for (var i = 0; i < lines.length; i++) {

        if (literal) {
            literals = lines[i] + '\n';
        }

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

        if (line[0] == 'l') {
            literal = true;
            continue;
        }


    }


    if (flag) {
        $('#rule-dis').append("<div class=\"tab-pane\"" +
            "                                         aria-labelledby=\"home-tab" + ctid + "\">\n" +
            "                                        <div style = \"border-style: groove; height=100px\" id=\"mynetwork" + ctid + "\" class=\"network\">\n" +
            "\n" +
            "                                        </div>\n" + "  <div id =\"literal" + ctid + "\"></div>" + " <label class =\"center\">GK" + " " + ctid + "</label>" +
            "                                    </div>\n");
    } else {
        $('#rule-dis').append("<div class=\"tab-pane\"" +
            "                                         aria-labelledby=\"home-tab" + ctid + "\">\n" +
            "                                        <div style = \"border-style: groove; height=100px\" id=\"mynetwork" + ctid + "\" class=\"network\">\n" +
            "\n" +
            "                                        </div>\n" + " <div id =\"literal" + ctid + "\"></div>" + " <label class =\"center\">GAR" + " " + ctid + "</label>" +
            "                                    </div>\n");
    }

    draw(nodes, edges, ctid, literals);


}


$("#add-rule").click(function () {

   if( $("#rule-text").attr('disabled')) {
    $("#rule-text").removeAttr('disabled');
    $("#rule-text").text("");
   } else {
       if ($("#rule-text").val().length != 0) {
           var text = $('#rule-text').val();
           $("#rule-dis").empty();
           appendRule(text);
       } else {
           alert("The input constraint is empty!");
       }
   }


});



var cnodes0 = [];
var cedges0 = [];

pnodeslist[0] = cnodes0;
pedgeslist[0] = cedges0;
var cnodes1 = [];
var cedges1 = [];

var cnodes2 = [];
var cedges2 = [];

pnodeslist[1] = cnodes1;
pedgeslist[1] = cedges1;
pnodeslist[2] = cnodes2;
pedgeslist[2] = cedges2;

cnodes0.push({
    id: 'Sr',
    label: "Sr",
    color: RED,
    group: "pattern",
    value: 10,
});
cnodes0.push({
    id: 'S1',
    label: "S1" + "\n" + "GAR 1",
    group: "pattern",
    color: RED,
    value: 10,
});

cnodes0.push({
    id: 'S2',
    label: "S2"+ "\n" + "GK 2",
    color: RED,
    group: "pattern",
    value: 10,
});


cedges0.push({
    from: 'Sr',
    to: 'S1',
    color: RED,
    width: 3.5,
    arrows: "to",
    length: 25,
});


cedges0.push({
    from: 'S1',
    to: 'S2',
    color: RED,
    width: 3.5,
    arrows: "to",
    length: 25,
});






$('#show-r').click(function () {


    if (scenario == 'missing-node') {
        setTimeout(function() {   draw1(0);
            $(".e-forward").show();
            $("#lexp").text("Match of S1")
            drawM1();}, 2000);


    } else if (scenario == 'missing-attr') {

        setTimeout(function() {   draw1(0);
            $(".e-forward").show();
            $("#lexp").text("Match of S1")
            drawM1();}, 2000);


    } else {
       alert("There is no explanation.");
    }

});


$("#radios").find('input[type=radio][name=miss]').change(function () {

    if (this.value == 'refine') {
        $("#manswer").hide();
        $("#matt").hide();
        $("#mlink").hide();
        scenario = 'refine';

    } else if (this.value == 'missing-link') {
        $("#manswer").hide();
        $("#matt").hide();
        $("#mlink").show();
        scenario = 'missing-link';


    } else if (this.value == 'missing-attr') {
        $("#manswer").hide();
        $("#matt").show();
        $("#mlink").hide();
        scenario = 'missing-attr';

    } else if (this.value == 'missing-node') {
        $("#manswer").show();
        $("#matt").hide();
        $("#mlink").hide();
        scenario = 'missing-node';
    }
});

$(document).ready(function () {

    $("#query-answer").hide();
    $("#node-info-table").hide();
    $("#matt").hide();
    $("#mlink").show();
    $(".e-forward").hide();
    $(".e-backward").hide();
    $('img').hide();
    $('.nav-tabs a[href="#' + 'home-tab' + '"]').tab('show');
    $("#manswer").hide();
    $("#matt").hide();
    $("#mlink").hide();

});

$('#suggested-nodes').on('change', function() {
    $("#input-node").empty();
});

$("#b-explore").click(function () {


    if (explore == 'f' && scenario == "missing-node") {
        alert("Forward Exploration.");
        cnodes0.push({
            id: 'S4',
            label: "S4" + "\n" + "GAR 4",
            color: "#2B7CE9",
            group: "pattern",
            value: 10,
        });

        cedges0.push({

            from: 'Sr',
            to: 'S4',
            color: "#2B7CE9",
            width: 3.5,
            arrows: "to",
            length: 25,

        });

        draw1(0);

        $(".e-backward").show();

        $('#mtablebody').append('  <tr>\n' +
            '        <th >S4</th>\n' +
            '        <td>(v4,v5) </td>\n' +
            '        <td class="rule" data-toggle="modal" data-id="3" data-target="#ruleModal">GAR 4</td>\n' +
            '            <td>insert((v4,v5),causedBy)</td>\n' +
            '\n' +
            '            </tr>');




    } else if(explore == 'b' && scenario == "missing-node") {
        alert("Back Exploration.");
        cnodes0.push({
            id: 'S3',
            label: "S3"+ "\n" + "GAR 3",
            color: "#2B7CE9",
            group: "pattern",
            value: 10,
        });

        cedges0.push({
            from: 'S2',
            to: 'S3',
            color: "#2B7CE9",
            width: 3.5,
            arrows: "to",
            length: 40,
        });
        draw1(0);

        $('#mtablebody').append('  <tr>\n' +
            '        <th >S3</th>\n' +
            '        <td>(v1,v7)</td>\n' +
            '        <td class="rule" data-toggle="modal" data-id="4" data-target="#ruleModal">GAR 3</td>\n' +
            '            <td>insert((v1,v7),possess)</td>\n' +
            '\n' +
            '            </tr>');



    } else {
        alert("There is no explanation.")
    }


});

$("#e-radios").find('input[type=radio][name=bidi]').change(function () {

    if (this.value == 'forward') {

        explore = 'f';

    } else {

        explore = 'b';
    }
});

$('#sparqlb').on('click', function () {


    $("#queryanswer").find('tbody').empty();
    $("#suggest").find('tbody').empty();

    setTimeout(function() {  $("#queryanswer").find('tbody').append("<tr id=\"answer\">\n" +
        "                                        <td><span>v2<img width=\"15px\" height=\"15px\" src=\"info.png\"/></span></td>\n" +
        "                                        <td>name:SARS-COV-2</td>\n" +
        "                                        <td>realm:Riboriria</td>\n" +
        "                                    </tr>"); }, 2000);


    // $("#suggest").find('tbody').append("<tr>\n" +
    //     "                                        <td>v5</td>\n" +
    //     "                                        <td>name:COVID-Virus</td>\n" +
    //     "                                        <td>--</td>\n" +
    //     "                                    </tr>");
    // $("#suggest").find('tbody').append("<tr>\n" +
    //     "                                        <td>v6</td>\n" +
    //     "                                        <td>name:COVID-N440K</td>\n" +
    //     "                                        <td>--</td>\n" +
    //     "                                    </tr>");


    draw2();

});


var mnodes = [];
var medges = [];

mnodes.push({
    id: 'v2',
    label: 'v2' + "\n" + "virus",
    group: "pattern",
    value: 10,
});

mnodes.push({
    id: 'v3',
    label: 'v3' + '\n' + "testing_method",
    group: "pattern",
    value: 10,
});
mnodes.push({
    id: 'v4',
    label: 'v4' + '\n' + "virus",
    group: "pattern",
    value: 10,
});

medges.push({
    from: 'v2',
    to: 'v3',
    color: RED,
    width: 1.5,
    arrows: "to",
    dashes: true,
});

medges.push({
    from: 'v2',
    to: 'v4',
    color: GRAY,
    width: 1.5,
    arrows: "to",
});

var mnodes1 = [];
var medges1 = [];

var mnodes2 = [];
var medges2 = [];

mnodes1.push({
    id: 'v1',
    label: 'v1' + '\n' + "virus",
    group: "pattern",
    value: 10,
});
mnodes1.push({
    id: 'v2',
    label: 'v2' + '\n' + "virus",
    group: "pattern",
    value: 10,
});

mnodes2.push({
    id: 'v1',
    label: 'v1' + '\n' + "virus",
    group: "pattern",
    value: 10,
});

mnodes2.push({
    id: 'v0',
    label: 'v0' + '\n' + "virus",
    group: "pattern",
    value: 10,
});

mnodes2.push({
    id: 'v5',
    label: 'v5' + '\n' + "disease",
    group: "pattern",
    value: 10,
});

medges2.push({
    from: 'v0',
    to: 'v1',
    color: RED,
    width: 1.5,
    arrows: "to",
    dashes: true,
});

medges2.push({
    from: 'v1',
    to: 'v5',
    color: GRAY,
    width: 1.5,
    arrows: "to",
});

medges2.push({
    from: 'v0',
    to: 'v5',
    color: GRAY,
    width: 1.5,
    arrows: "to",
});


// ----------
function drawM1() {

    $("#lexp").text("Matches of S1");
    var fm2node = [];
    var fm2edge = [];

    fm2node.push({
        id: 'v1',
        label: 'v2' + '\n' + "SARS-COV-2",
        group: "pattern",
        value: 10,
    });
    fm2node.push({
        id: 'v2',
        label: "SARS-COV-2_RNA",
        group: "pattern",
        value: 10,
    });

    fm2node.push({
        id: 'v3',
        label: "rt-CPR",
        group: "pattern",
        value: 10,
    });

    fm2edge.push({
        from: 'v1',
        to: 'v2',
        color: "#2f9ad4",
        width: 2,
        arrows: "to",

    });

    fm2edge.push({
        from: 'v2',
        to: 'v3',
        color: "#2f9ad4",
        width: 2,
        arrows: "to",
    });
    fm2edge.push({
        from: 'v1',
        to: 'v3',
        color: RED,
        width: 2,
        arrows: "to",
        label: "testedBy",
        dashes: true,
    });

    var container1 = document.getElementById("forward1");
    var container2 = document.getElementById("forward2");
    container1.innerHTML = "";
    container2.innerHTML = "";

    var data2 = {
        nodes: fm2node,
        edges: fm2edge,
    };
    var options = {
        nodes: {
            scaling: {
                min: 10,
            },
            font: {
                size: 20,
            },
        },
        edges: {

            smooth: false,
            font: {
                size: 25,
            },
            length: 25,
            arrows: "to",
        },

        groups: {

            pattern: {
                shape: "dot",

            },


        },
    };

    var network1 = new vis.Network(container1, data2, options);

    network1.setOptions({
        physics: {enabled: false}
    });


}

function drawM() {
    $("#lexp").text("Matches of S2");
    var fm1node = [];
    var fm1edge = [];

    var fm2node = [];
    var fm2edge = [];

    fm1node.push({
        id: 'v1',
        label: 'v1' + '\n' + "COVID-19 virus",
        group: "pattern",
        value: 10,
    });
    fm1node.push({
        id: 'v2',
        label: "COVID-19",
        group: "pattern",
        value: 10,
    });

    fm1node.push({
        id: 'v3',
        label: "rt-CPR",
        group: "pattern",
        value: 10,
    });

    fm1edge.push({
        from: 'v1',
        to: 'v2',
        color: "#2f9ad4",
        width: 2,
        arrows: "to",

    });

    fm1edge.push({
        from: 'v1',
        to: 'v3',
        color: "#2f9ad4",
        width: 2,
        arrows: "to",
    });

    fm2node.push({
        id: 'v1',
        label: 'v2' + '\n' + "SARS-COV-2",
        group: "pattern",
        value: 10,
    });
    fm2node.push({
        id: 'v2',
        label: "COVID-19",
        group: "pattern",
        value: 10,
    });

    fm2node.push({
        id: 'v3',
        label: "rt-CPR",
        group: "pattern",
        value: 10,
    });

    fm2edge.push({
        from: 'v1',
        to: 'v2',
        color: "#2f9ad4",
        width: 2,
        arrows: "to",

    });

    fm2edge.push({
        from: 'v1',
        to: 'v3',
        color: "#2f9ad4",
        width: 2,
        arrows: "to",
    });

    var container1 = document.getElementById("forward1");
    var container2 = document.getElementById("forward2");
    container1.innerHTML = "";
    container2.innerHTML = "";

    var data1 = {
        nodes: fm1node,
        edges: fm1edge,
    };
    var data2 = {
        nodes: fm2node,
        edges: fm2edge,
    };
    var options = {
        nodes: {
            scaling: {
                min: 10,
            },
            font: {
                size: 20,
            },
        },
        edges: {
            color: BLACK,
            smooth: false,
            font: {
                size: 6,
            },
            length: 25,
            arrows: "to",
        },

        groups: {

            pattern: {
                shape: "dot",

            },


        },
    };
    var network1 = new vis.Network(container1, data1, options);
    var network2 = new vis.Network(container2, data2, options);
    // var network3 = new vis.Network(container3, data2, options);
    network1.setOptions({
        physics: {enabled: false}
    });
    network2.setOptions({
        physics: {enabled: false}
    });
    // network3.setOptions({
    //     physics: {enabled: false}
    // });

}

$(function () {

    $('#exampleRuleModal').modal({
        keyboard: true,
        backdrop: "static",
        show: false,

    }).on('show', function () {

    });

    $("#mtablebody").find('tr td[data-id]').on('click', function () {

        //do all your operation populate the modal and open the modal now. DOnt need to use show event of modal again
        if ($(this).data('id') == 1) {
            $('#rule-modal-body').html($('<ul>\n' +
                '    <li style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; u1 RNA</li>\n' +
                '    <li style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; u2 virus</li>\n' +
                '    <li style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; u3 testing_method</li>\n' +
                '    <li style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; u2 possess u1</li>\n' +
                '    <li style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; u1 testedBy u3</li>\n' +
                '    <li style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; u2 testedBy u3 &nbsp;(link reference)</li>\n' +
                '</ul>'));
            $('#exampleModalLabel').text("Description of " + "GAR 1");
            $('#exampleRuleModal').modal('show');
        } else if ($(this).data('id') == 2) {

            $('#rule-modal-body').html($('<ul>\n' +
                '    <li style="text-align: justify;">u4 RNA</li>\n' +
                '    <li style="text-align: justify;">u4&rsquo; RNA</li>\n' +
                '    <li style="text-align: justify;">u5 disease</li>\n' +
                '    <li style="text-align: justify;">u6 testing_method</li>\n' +
                '    <li style="text-align: justify;">u7 disease</li>\n' +
                '    <li style="text-align: justify;">u8 testing_method</li>\n' +
                '    <li style="text-align: justify;">u4 causedBy u5</li>\n' +
                '    <li style="text-align: justify;">u4&rsquo; causedBy u7</li>\n' +
                '    <li style="text-align: justify;">u4 testedBy u6</li>\n' +
                '    <li style="text-align: justify;">u4&rsquo; testedBy u8</li>\n' +
                '</ul>'));
            $('#exampleModalLabel').text("Description of " + "GK 2");
            $('#exampleRuleModal').modal('show');
        }

    });

    $(document).on("click", ".rule", function () {

        if ($(this).data('id') == 3) {

            $('#rule-modal-body').html($('<ul>\n' +
                '    <li style="text-align: justify;">u1 virus</li>\n' +
                '    <li style="text-align: justify;">u2 virus</li>\n' +
                '    <li style="text-align: justify;">u3 disease</li>\n' +
                '    <li style="text-align: justify;">u1 causedBy u3</li>\n' +
                '    <li style="text-align: justify;">u2 causedBy u3</li>\n' +
                '    <li style="text-align: justify;">u1 variantOf u2</li>\n' +
                '    <li style="text-align: justify;">literal: u1.realm = u2.realm</li>\n' +
                '</ul>'));
            $('#exampleModalLabel').text("Description of " + "GAR 3");
            $('#exampleRuleModal').modal('show');
        }
    });

});

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});