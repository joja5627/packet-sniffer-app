package com.grid.graph.main.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.grid.graph.main.GraphGeneratorServiceImpl;
import com.grid.graph.main.config.GraphGeneratorServiceImplConfig;
import com.grid.graph.main.domain.GraphGeneratorResponseDTO;
import org.jgrapht.graph.SimpleDirectedGraph;
import org.jgrapht.graph.SimpleGraph;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

import static java.util.Map.entry;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {GraphGeneratorServiceImplConfig.class})
public class GraphGeneratorServiceTest {

@Autowired
GraphGeneratorServiceImpl graphGeneratorServiceImpl;
//    @Test
//    public void generateUnDirectedCompleteGraph(){
////        int vertexCount = 10;
////        GraphGeneratorResponseDTO completeGraph = graphGeneratorServiceImpl.generateCompleteGraph(vertexCount,SimpleGraph.class);
////        assertEquals(90, completeGraph.getEdges().size());
//    }
private JsonNode stringToJson(String stringToParse)
        throws IOException {
    ObjectMapper mapper = new ObjectMapper();
    JsonNode actualObj = mapper.readTree(stringToParse);
    if(Objects.isNull(actualObj)){
        return null;
    }else{
        return actualObj;
    }

}

    @Test
    public void generateUnDirectedCompleteGraph(){
//        int vertexCount = 10;
//        GraphGeneratorResponseDTO completeGraph = graphGeneratorServiceImpl.generateCompleteGraph(vertexCount,SimpleGraph.class);
//        assertEquals(90, completeGraph.getEdges().size());
    }
    @Test
    public void generatePetersonGraph(){

        GraphGeneratorResponseDTO petersonGraph = graphGeneratorServiceImpl.generatePetersonGraph(Map.ofEntries(
                entry("dimensions", "5"),
                entry("directed", "false")
        ));
        assertEquals(90, petersonGraph.getEdges().size());
    }
    @Test
    public void generateDirectedCompleteGraph(){
//        int vertexCount = 10;
//        GraphGeneratorResponseDTO completeGraph = graphGeneratorServiceImpl.generateCompleteGraph(vertexCount,SimpleDirectedGraph.class);
//        assertEquals(180, completeGraph.getEdges().size());
    }
    @Test
    public void stringToJsonTest(){

        try {
            assertFalse(Objects.isNull(stringToJson("{ \"name\":\"John\", \"age\":30, \"car\":null }")));

        } catch (IOException e) {
            e.printStackTrace();
        }
//        GraphGeneratorResponseDTO completeGraph = graphGeneratorServiceImpl.generateCompleteGraph(vertexCount,SimpleDirectedGraph.class);
    }

}
