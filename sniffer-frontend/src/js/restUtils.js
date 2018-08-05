


import {fetchSimpleGraphBegin,fetchSimpleGraphSuccess,fetchSimpleGraphFailure} from '../actions/restActions'


import  * as graphUtils from '../js/graphUtils';


export function parseResponse(json) {
    let degrees = parseDegrees(json.degrees);
    return {
        nodes:parseVertices(json.vertices,degrees),
        edges:parseEdges(json.edges, degrees),
        degrees:degrees
}
}
export function buildURL(params){
    return new URL(`http://localhost:8080/generate-graph?${ObjectToRequestParams(params)}`);
}
function ObjectToRequestParams(object){
    return Object.keys(object).map(key => key + '=' + object[key]).join('&');
}
export function parseDegrees(inputDegrees) {
    let degrees = new Array();
    for (var x in inputDegrees) {
      var parsed = inputDegrees[x].split('-');
      degrees.push({ 'vertex': parsed[0], 'degree': parsed[1] });
    }
    return degrees;
}
export function parseVertices(vertices, degrees) {
    var parsedVertices = Array();

    for (var x in vertices) {
        // var color = this.getColor(degrees[x].degree);
        parsedVertices.push(
            graphUtils.newNode(`Vertex ${vertices[x]}`,
                vertices[x],
                'rgba(255,255,255,.4)',
                'rgba(255,255,255,.8)'
            )
        );
    }
    return parsedVertices;
}
export function parseEdges(edges, degrees) {
    var parsedEdges = Array();
    for (var x in edges) {
        var split_edge = edges[x].split('-');
        var color;
        let from_edge = split_edge[0];
        let to_edge = split_edge[1];
        var intDegree = parseInt(from_edge);
        parsedEdges.push(
            graphUtils.newEdge(
                from_edge,
                to_edge,
                'rgba(255,255,255,.4)',
                'rgba(255,255,255,.8)',
                1
            )
        );
    }
    return parsedEdges;
}