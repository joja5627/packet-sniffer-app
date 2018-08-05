package com.grid.graph.main;

import com.fasterxml.jackson.databind.JsonNode;
import com.grid.graph.main.domain.GraphGeneratorResponseDTO;

import java.util.Map;

public interface GraphGeneratorService {
    GraphGeneratorResponseDTO generateRingGraph(Map<String,String> params);
    GraphGeneratorResponseDTO generateLinearGraph(Map<String,String> params);
    GraphGeneratorResponseDTO generateCompleteGraph(Map<String,String> params);
    GraphGeneratorResponseDTO generateStarGraph(Map<String,String> params);
//    GraphGeneratorResponseDTO generateSquareGridGraph(Map<String,String> params);
//    GraphGeneratorResponseDTO generateHyperCube(Map<String,String> params);

//    GraphGeneratorResponseDTO generatePetersonGraph(Map<String,String> params);
//    GraphGeneratorResponseDTO generateDürerGraph(Map<String,String> params);
//    GraphGeneratorResponseDTO generateDesarguesGraph(Map<String,String> params);
//    GraphGeneratorResponseDTO generateNauruGraph(Map<String,String> params);
//    GraphGeneratorResponseDTO generateMöbiusKantorGraph(Map<String,String> params);
//    GraphGeneratorResponseDTO generateDodecahedronGraph(Map<String,String> paramsq);


//    GraphGeneratorResponseDTO generateCompleteBipartiteGraph(int dimensions,Class<?> directionClass);

}
