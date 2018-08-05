package com.grid.graph.main.domain;

import java.util.Objects;
import java.util.Set;

public class GraphGeneratorResponseDTO {
    private final Set<String> vertices;
    private final Set<String> edges;
    private final Set<String> degrees;

    public GraphGeneratorResponseDTO(Set<String> vertices, Set<String> edges,Set<String> degrees){
        this.vertices = vertices;
        this.edges = edges;
        this.degrees = degrees;
    }

    public Set<String> getVertices() {
        return vertices;
    }

    public Set<String> getEdges() {
        return edges;
    }

    public Set<String> getDegrees() {
        return degrees;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof GraphGeneratorResponseDTO)) return false;
        GraphGeneratorResponseDTO that = (GraphGeneratorResponseDTO) o;
        return Objects.equals(getVertices(), that.getVertices()) &&
                Objects.equals(getEdges(), that.getEdges()) &&
                Objects.equals(getDegrees(), that.getDegrees());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getVertices(), getEdges(), getDegrees());
    }

    @Override
    public String toString() {
        return "GraphGeneratorResponseDTO{" +
                "vertices=" + vertices +
                ", edges=" + edges +
                ", degrees=" + degrees +
                '}';
    }
}
