import com.grid.graph.main.domain.GraphGeneratorResponseDTO;
import com.grid.graph.main.GraphGeneratorServiceImpl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;


@RunWith(SpringRunner.class)
public class GridGraphGeneratorServiceImplTest {

    @Mock
    private GraphGeneratorServiceImpl graphGeneratorService;


    @Before
    public void before() {
        MockitoAnnotations.initMocks(this);
        graphGeneratorService = new GraphGeneratorServiceImpl();
    }


//    @Test
//    public void testGridGraphGeneratorService(){
//
//        GraphGeneratorResponseDTO response = graphGeneratorService.generateHyperCube(4);
//        assertNotNull(response);
//
//    }
//    public void ringGeneratorTest() {
//        GraphGeneratorResponseDTO response = graphGeneratorService.generateRingGraph(4);
//        assertNotNull(response);
//
//
//    }

}
