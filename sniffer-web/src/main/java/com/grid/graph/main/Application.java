package com.grid.graph.main;

import com.grid.graph.main.controller.ConsenususGridGraphController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@ComponentScan(basePackageClasses=ConsenususGridGraphController.class)
@ComponentScan(basePackageClasses=GraphGeneratorServiceImpl.class)

@EnableAutoConfiguration
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
