package com.grid.graph.main.config;

import com.grid.graph.main.GraphGeneratorServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GraphGeneratorServiceImplConfig {

        @Bean
        public GraphGeneratorServiceImpl GraphGeneratorServiceImplConfig(){
            return new GraphGeneratorServiceImpl();
        }


    }


