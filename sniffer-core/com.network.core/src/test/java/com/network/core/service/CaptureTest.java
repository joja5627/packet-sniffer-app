package com.network.core.service;

import com.network.core.service.Capture;
import org.junit.Test;
import org.pcap4j.core.NotOpenException;
import org.pcap4j.core.PcapNativeException;

public class CaptureTest {
    @Test
    public void runCapture(){
        Capture capture = new Capture();
        try {
            capture.capture("en0");
        } catch (PcapNativeException e) {
            e.printStackTrace();
        } catch (NotOpenException e) {
            e.printStackTrace();
        }
        while(true){

        }
    }
}
