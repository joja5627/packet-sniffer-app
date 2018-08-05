package com.grid.graph.main.controller;

//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.grid.graph.generator.ConsensusGridGraphGeneratorImpl;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.grid.graph.main.domain.ConsensusGraphResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class ConsenususGridGraphController {


//    @Autowired
//    private ConsensusGridGraphGeneratorImpl gridGraphGenerator;
//
//    @RequestMapping(path = "/generate-directed", method = GET)
//    @CrossOrigin()
//    @GetMapping()
//    @ResponseBody
//    public ResponseEntity<String> generateDirectedGraph(
//            @RequestParam(name = "width") int width,
//            @RequestParam(name = "height") int height,
//            @RequestParam(name = "degree", defaultValue = "") String degree) {
//
//        if (Objects.isNull(width)) {
//            return ResponseEntity.badRequest().body("Missing width param");
//        } else if (Objects.isNull(height)) {
//            return ResponseEntity.badRequest().body("Missing height param");
//        }
//        String jsonString = "";
//        try {
//            List<Integer> degrees = new ArrayList<Integer>();
//            if (!degree.isEmpty()) {
//                degrees = Arrays.asList(degree.split(","))
//                        .stream()
//                        .map(element -> Integer.parseInt(element))
//                        .collect(Collectors.toList());
//
//            }
//
//
//            gridGraphGenerator.generateDirectedGridGraph(width, height, degrees);
//            ConsensusGraphResponseDTO consensusGraphResponseDTO = new
//                    ConsensusGraphResponseDTO(width,height,
//                    gridGraphGenerator.directedGridGraph.vertexSet(),
//                    gridGraphGenerator.directedGridGraph.edgeSet(),
//                    gridGraphGenerator.graphDegrees);
//            ObjectMapper mapper = new ObjectMapper();
//            jsonString = mapper.writeValueAsString(consensusGraphResponseDTO);
//
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        return ResponseEntity.ok(jsonString);
//    }


//    @RequestMapping(path = "/generate-undirected", method = GET)
//    @CrossOrigin()
//    @GetMapping()
//    @ResponseBody
//    public ResponseEntity<String> generateUndirectedGraph(
//            @RequestParam(name = "width") int width,
//            @RequestParam(name = "height") int height) {
//        if (Objects.isNull(width)) {
//            return ResponseEntity.badRequest().body("Missing width param");
//        } else if (Objects.isNull(height)) {
//            return ResponseEntity.badRequest().body("Missing height param");
//        }
//        String jsonString = "";
//        try {
//            //com.consensus.grid.ConsensusGridGraph graph = gridGraphGenerator.getUndirectedGridGraph(width,height);
//            ObjectMapper mapper = new ObjectMapper();
//            //jsonString = mapper.writeValueAsString(graph);
//        }
////        catch (JsonProcessingException e) {
////            e.printStackTrace();
////        }
//        return ResponseEntity.ok(jsonString);
//    }
}