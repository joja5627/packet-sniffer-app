package com.grid.graph.main;
import com.grid.graph.main.domain.GraphGeneratorResponseDTO;
import org.jgrapht.Graph;
import org.jgrapht.generate.*;
import org.jgrapht.graph.SimpleDirectedGraph;
import org.jgrapht.graph.SimpleGraph;
import org.jgrapht.util.SupplierUtil;
import org.springframework.stereotype.Service;
import java.lang.reflect.Constructor;
import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toSet;

@Service
public class GraphGeneratorServiceImpl implements GraphGeneratorService {
    
    private static Class<?> getDirectedClass(String directed){
            return Boolean.valueOf(directed) ? SimpleDirectedGraph.class : SimpleGraph.class;
    }

   
    public static <T> T getGraph(Class<T> clazz) {
        try{
            Constructor<T> constructor = clazz.getDeclaredConstructor(Supplier.class,Supplier.class,boolean.class);
            return constructor.newInstance(SupplierUtil.createStringSupplier(), SupplierUtil.createStringSupplier(), false);
        }
        catch (ReflectiveOperationException exception) {
            return null;
        }
    }
    @Override
    public GraphGeneratorResponseDTO generateRingGraph(Map<String, String> params) {
        try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));
            RingGraphGenerator<String,String> ringGraphGenerator =
                    new RingGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            ringGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }    }

    @Override
    public GraphGeneratorResponseDTO generateLinearGraph(Map<String, String> params) {
                try{
        Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

        LinearGraphGenerator<String,String> linearGraphGenerator =
                new LinearGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

        linearGraphGenerator.generateGraph(graph);

        return getGraphGeneratorResponseDTO(graph);

    }catch(Exception e){
        return null;
    }
    }

    @Override
    public GraphGeneratorResponseDTO generateCompleteGraph(Map<String, String> params) {
                try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            CompleteGraphGenerator<String,String> completeGraphGenerator =
                    new CompleteGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }
    }

    @Override
    public GraphGeneratorResponseDTO generateStarGraph(Map<String, String> params) {
                try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            StarGraphGenerator<String,String> completeGraphGenerator =
                    new StarGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }
    }
//    public GeneralizedPetersenGraphGenerator(int n, int k) {
//        if (n < 3) {
//            throw new IllegalArgumentException("n must be larger or equal than 3");
//        } else if (k >= 1 && (double)k <= Math.floor((double)(n - 1) / 2.0D)) {
//            this.n = n;
//            this.k = k;
//        } else {
//            throw new IllegalArgumentException("k must be in the range [1, floor((n-1)/2.0)]");
//        }
//    }
//
    public GraphGeneratorResponseDTO generatePetersonGraph(Map<String, String> params){
        try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            GeneralizedPetersenGraphGenerator<String,String> completeGraphGenerator =
                    new GeneralizedPetersenGraphGenerator<>(10,3);

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }

    }
    public GraphGeneratorResponseDTO generateDürerGraph(Map<String, String> params){
        try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            StarGraphGenerator<String,String> completeGraphGenerator =
                    new StarGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }

    }

    public GraphGeneratorResponseDTO generateDesarguesGraph(Map<String, String> params){
        try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            StarGraphGenerator<String,String> completeGraphGenerator =
                    new StarGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }

    }
    public GraphGeneratorResponseDTO generateNauruGraph(Map<String, String> params){
        try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            StarGraphGenerator<String,String> completeGraphGenerator =
                    new StarGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }

    }
    public GraphGeneratorResponseDTO generateMöbiusKantorGraph(Map<String, String> params){
        try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            StarGraphGenerator<String,String> completeGraphGenerator =
                    new StarGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }
    }

    public GraphGeneratorResponseDTO generateDodecahedronGraph(Map<String, String> params){
        try{
            Graph<String,String> graph = (Graph<String,String>) getGraph(getDirectedClass(params.get("directed")));

            StarGraphGenerator<String,String> completeGraphGenerator =
                    new StarGraphGenerator<>(Integer.valueOf(params.get("dimensions")));

            completeGraphGenerator.generateGraph(graph);

            return getGraphGeneratorResponseDTO(graph);

        }catch(Exception e){
            return null;
        }
    }
    

private <T> Set<T> findDuplicates(Collection<T> collection) {
    Set<T> uniques = new HashSet<>();
    return collection.stream()
            .filter(e -> !uniques.add(e))
            .collect(toSet());
}
    private Set<String> getNeighborNodes(Collection<String> collection) {

        return collection.stream()
                .map(edge -> edge.split("-")[0])
                .collect(Collectors.toSet());
    }
    private void removeDuplicateNodes(Graph<String, String> graph){
        for(String vertex: graph.vertexSet()){
            for(String edge:graph.edgesOf(vertex)){
                String[] split = edge.split("-");
                if(split[0].equals(split[1])){
                    graph.removeEdge(split[0],split[1]);
                }

            }
        }

    }
    private int neighborMax(String vertex,Graph<String, String> graph){
        return getNeighborNodes(graph.edgesOf(vertex))
                .stream()
                .map(graph::degreeOf)
                .max(Integer::max).get();



    }

    private  double[][] generateWeightMatrix(int height, int width,Graph<String, String> dGraph){
        double[][] weightMatrix = new double[width * width][height * height];

        for(String vertex: dGraph.vertexSet()) {
            int maxWeight = 0;

            Set<String> neighbors = getNeighborNodes(dGraph.edgesOf(vertex));
            neighbors.remove(vertex);
            for(String neigh:neighbors ) {
                int vertexDeg = dGraph.degreeOf(vertex);
                int neighDeg = dGraph.degreeOf(neigh);
                maxWeight = (vertexDeg > neighDeg) ? vertexDeg : neighDeg;
                weightMatrix[Integer.valueOf(vertex) - 1 ][Integer.valueOf(neigh) - 1 ] = 1/(1+maxWeight);
            };

            int neighborSum = 0;

            for(String neigh:neighbors ) {
                neighborSum += weightMatrix[Integer.valueOf(vertex) - 1 ][Integer.valueOf(neigh) - 1];
            };
            weightMatrix[Integer.valueOf(vertex) - 1 ][Integer.valueOf(vertex) - 1 ] = 1 - neighborSum;
        };

        return weightMatrix;
    }
    private void setConsensusVertices(Collection<String> nodes,Graph<String, String> graph)  {

        HashMap<String,Set<String>> uniqueNeighborMap = new HashMap<>();
        for(String node: nodes){

            Set<String> neighbors =
                    getNeighborNodes(graph.edgesOf(node));

            List<String> secondHopNeighborNodes = new ArrayList<String>();

            for(String neigh: neighbors){
                secondHopNeighborNodes
                        .addAll(getNeighborNodes(graph.edgesOf(neigh)));
            }
            Set<String> uniqueNeighbors = findDuplicates(secondHopNeighborNodes);
            if(uniqueNeighbors.contains(node)){
                uniqueNeighbors.remove(node);
            }
            uniqueNeighborMap.put(node,uniqueNeighbors);
        }
        for(String key: uniqueNeighborMap.keySet()){

            uniqueNeighborMap.get(key)
                    .forEach(secondNeigh ->
                            graph.addEdge(key,secondNeigh));
        }
    }
    private List<String> getNodesofDegree(int n, Graph<String,String> graph){
        return graph.vertexSet()
                .stream()
                .filter(vertex -> graph.degreeOf(vertex) == n)
                .collect(Collectors.toList());

    }


    public GraphGeneratorResponseDTO getGraphGeneratorResponseDTO( Graph<String,String> graph) {
        Set<String> vertices = graph.vertexSet();

        Set<String> degrees = getDegrees(vertices,graph);

        Set<String> edges = getEdges(graph);

        return new GraphGeneratorResponseDTO(vertices,edges,degrees);
    }

    public Set<String> getEdges( Graph<String,String> graph) {
        Set<String> edges = new HashSet<String>();
        for(String from:graph.vertexSet()){
            Set<String> edgesOf =  graph.edgesOf(from);
            for(String edge: edgesOf) {
                String to = graph.getEdgeTarget(edge);
                edges.add(from + "-" + to);
            }
        }
        return edges;
    }

    public Set<String> getDegrees(Set<String> vertices, Graph<String,String> graph) {
        return vertices
                .stream()
                .map(v -> v  + "-" + String.valueOf(graph.degreeOf(v)))
                .collect(Collectors.toSet());
    }



}
