package com.grid.graph.main.domain;

import java.util.List;
import java.util.Objects;
import java.util.Set;

public class ConsensusGraphResponseDTO {
    public int height;

    public int width;

    public Set<String> vertices;

    public Set<String> edges;

    public List<String> nodeDegrees;

    public ConsensusGraphResponseDTO(int inputHeight, int inputWidth, Set<String> inputVertices, Set<String> inputEdges, List<String> nodeDeg){
        height = inputHeight;
        width = inputWidth;
        vertices = inputVertices;
        edges = inputEdges;
        nodeDegrees = nodeDeg;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ConsensusGraphResponseDTO)) return false;
        ConsensusGraphResponseDTO that = (ConsensusGraphResponseDTO) o;
        return getHeight() == that.getHeight() &&
                getWidth() == that.getWidth() &&
                Objects.equals(getVertices(), that.getVertices()) &&
                Objects.equals(getEdges(), that.getEdges()) &&
                Objects.equals(getNodeDegrees(), that.getNodeDegrees());
    }

    @Override
    public int hashCode() {

        return Objects.hash(getHeight(), getWidth(), getVertices(), getEdges(), getNodeDegrees());
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public Set<String> getVertices() {
        return vertices;
    }

    public void setVertices(Set<String> vertices) {
        this.vertices = vertices;
    }

    public Set<String> getEdges() {
        return edges;
    }

    public void setEdges(Set<String> edges) {
        this.edges = edges;
    }

    public List<String> getNodeDegrees() {
        return nodeDegrees;
    }

    public void setNodeDegrees(List<String> nodeDegrees) {
        this.nodeDegrees = nodeDegrees;
    }

    @Override
    public String toString() {
        return "ConsensusGraphResponseDTO{" +
                "height=" + height +
                ", width=" + width +
                ", vertices=" + vertices +
                ", edges=" + edges +
                ", nodeDegrees=" + nodeDegrees +
                '}';
    }
}
