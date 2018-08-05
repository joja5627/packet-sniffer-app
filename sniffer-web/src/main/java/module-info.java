module com.grid.graph.main {
    requires spring.boot;
    requires spring.boot.autoconfigure;
    requires spring.core;
    requires spring.web;
    requires spring.beans;
    requires spring.context;
    requires org.jgrapht.core;
    requires com.fasterxml.jackson.databind;

    exports com.grid.graph.main;
}