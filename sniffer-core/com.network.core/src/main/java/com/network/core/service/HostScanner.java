package com.network.core.service;

import org.pcap4j.core.PcapHandle;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

public class HostScanner {

    private static final boolean WINDOWS = "\\".equals(System.getProperty("file.separator"));

    public String getDefaultGateway() {
        if (WINDOWS) {
            return getDefaultGatewayWindows();
        } else {
            return getDefaultGatewayLinux();
        }
    }

    private String getDefaultGatewayWindows() {
        try {
            ProcessBuilder builder = new ProcessBuilder("netstat -rn");
            Process process = builder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line = reader.readLine();
            String result = "";
            while (line != null) {
                if (line.trim().startsWith("0.0.0.0")) {
                    result = line.trim().split("[\\s]+")[2];
                    break;
                }
                line = reader.readLine();
            }
            return result;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    private String getDefaultGatewayLinux() {
        try {

            ProcessBuilder builder = new ProcessBuilder("bash", "-c", "route -n get default | grep 'gateway' | awk '{print $2}'\n");
            Process process = builder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String gateway = reader.readLine();
            System.out.println(gateway);
            return gateway;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }

    public void sendArpHostScan(PcapHandle handle, NetworkDevice device, int limit) {
        IpV4Utils utils = new IpV4Utils();
        List<String> addressList = utils.getAddressListV4(device.getIpV4Address(), device.getIpV4SubnetMask());
        Arp arp = new Arp();
        int count = (addressList.size() < limit) ? addressList.size() : limit;
        for (int i = 0; i < count; i++) {
            arp.send(handle, device, addressList.get(i));
        }
    }
}