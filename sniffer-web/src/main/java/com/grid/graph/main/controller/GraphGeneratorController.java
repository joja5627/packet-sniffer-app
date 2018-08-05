package com.grid.graph.main.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grid.graph.main.domain.GraphGeneratorResponseDTO;
import com.grid.graph.main.GraphGeneratorServiceImpl;
import org.jgrapht.graph.SimpleDirectedGraph;
import org.jgrapht.graph.SimpleGraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class GraphGeneratorController {


    @Autowired
    private GraphGeneratorServiceImpl graphGeneratorServiceImpl;

    public void GraphGeneratorController(GraphGeneratorServiceImpl graphGeneratorServiceImpl){
        this.graphGeneratorServiceImpl = graphGeneratorServiceImpl;
    }

    @RequestMapping(path = "/generate-graph", method = GET)
    @GetMapping()
    @CrossOrigin()
    @ResponseBody
    public ResponseEntity<GraphGeneratorResponseDTO> generateGraph(@RequestParam Map<String,String> params){

        switch(params.get("class")){
            case "ring":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateRingGraph(params));
            case "linear":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateLinearGraph(params));
            case "complete":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateCompleteGraph(params));
            case "star":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateStarGraph(params));
            case "peterson":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generatePetersonGraph(params));
            case "dürer":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateDürerGraph(params));
            case "desargues":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateDesarguesGraph(params));
            case "nauru":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateNauruGraph(params));
            case "möbiusKantor":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateMöbiusKantorGraph(params));
            case "Dodecahedron":
                return ResponseEntity.ok(graphGeneratorServiceImpl.generateDodecahedronGraph(params));
            default:
                return ResponseEntity.badRequest().body(new GraphGeneratorResponseDTO(Set.of(""), Set.of(""), Set.of("")));

        }
    }
    @RequestMapping(path = "/generate-complex-graph", method = GET)
    @GetMapping()
    @CrossOrigin()
    @ResponseBody
    public ResponseEntity<GraphGeneratorResponseDTO> generateComplexGraph(
            @RequestParam(name = "directed",defaultValue = "false") boolean isDirected,
            @RequestParam(name = "graphClassification") String graphClassification,
            @RequestParam(name = "dim") int dim) {

        if (Objects.isNull(dim) || Objects.isNull(graphClassification)) {
            return ResponseEntity.badRequest().body(new GraphGeneratorResponseDTO(Set.of(""), Set.of(""), Set.of("")));
        }
        Class<?> directedClass = isDirected ? SimpleDirectedGraph.class : SimpleGraph.class;

        switch(graphClassification){
//            case "ring":
//                return ResponseEntity.ok(graphGeneratorServiceImpl.generateRingGraph(params));
//            case "hyper":
//                return ResponseEntity.ok(graphGeneratorServiceImpl.generateHyperCube(params));
//
//            case "cubical":
//                return ResponseEntity.ok(graphGeneratorServiceImpl.generateCubicalGraph(params));

            default:
                return ResponseEntity.badRequest().body(new GraphGeneratorResponseDTO(Set.of(""), Set.of(""), Set.of("")));

        }
    }

//    @RequestMapping(path = "/generate-hypercube", method = GET)
//    @GetMapping()
//    @CrossOrigin()
//    @ResponseBody
//    public ResponseEntity<GraphGeneratorResponseDTO> generateHyperCube(@RequestParam(name = "dim") int dim) {
//        if (Objects.isNull(params)) {
//            return ResponseEntity.badRequest().body(new GraphGeneratorResponseDTO(Set.of(""), Set.of(""), Set.of("")));
//        }
//        return ResponseEntity.ok(graphGeneratorServiceImpl.generateHyperCube(params));
//    }
//
//    @RequestMapping(path = "/generate-ring-graph", method = GET)
//    @GetMapping()
//    @CrossOrigin()
//    @ResponseBody
//    public ResponseEntity<GraphGeneratorResponseDTO> generateRingGraph(@RequestParam(name = "size") int size) {
//        if (Objects.isNull(size)) {
//            return ResponseEntity.badRequest().body(new GraphGeneratorResponseDTO(Set.of(""), Set.of(""), Set.of("")));
//        }
//        return ResponseEntity.ok(graphGeneratorServiceImpl.generateRingGraph(size));
//    }
}
