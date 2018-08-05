package com.network.core.service;

import com.network.core.service.NetworkDevice;
import com.network.core.service.PacketStorageServiceImpl;
import org.pcap4j.core.*;
import org.pcap4j.packet.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class PcapNetworkInterfaceWrapper extends NetworkDevice{
    private final Logger logger = LoggerFactory.getLogger(PcapNetworkInterfaceWrapper.class);
    public PcapNetworkInterfaceWrapper(PacketStorageServiceImpl packetStorageServiceImpl) {
        this.packetStorageServiceImpl = packetStorageServiceImpl;
    }

    private static final int READ_TIME_OUT = 10; // [ms]
    private static final int SNAP_LENGTH = 65536; // [bytes]

    private PacketStorageServiceImpl packetStorageServiceImpl;
    private PcapNetworkInterface pcapNetworkInterface;
    private NetworkDevice networkDevice;

//    private PacketStorageServiceImpl packetStorageServiceImpl;

    private PcapHandle handler = null;

    public PcapNetworkInterface getInterface(){
        return pcapNetworkInterface;
    }

    public boolean supportsMonitorMode = true;

    public boolean supportsMonitorMode(){
        return supportsMonitorMode;
    }
//        PcapNetworkInterface networkIface = ifaceMap.get(device);
//        if (networkIface == null) {
//            return;
//        }

    public PcapNetworkInterfaceWrapper(PcapNetworkInterface pcapNetworkInterface){
        this.pcapNetworkInterface = pcapNetworkInterface;

        networkDevice = new NetworkDevice(pcapNetworkInterface.getLinkLayerAddresses().get(0).toString(), pcapNetworkInterface.getAddresses());
        try {
            this.handler = getPcapHandler(pcapNetworkInterface.getName());
        } catch (PcapNativeException e) {
            e.printStackTrace();
        } catch (NotOpenException e) {
            e.printStackTrace();
        }
        packetStorageServiceImpl = new PacketStorageServiceImpl(getPcapHandle());

    }


    public PcapHandle getPcapHandle(){
        return this.handler;
    }
    public List<PcapAddress> getAddresses() {
        return pcapNetworkInterface.getAddresses();
    }

    public String getName(){
        return pcapNetworkInterface.getName();
    }

    public String getDescription() {
        return pcapNetworkInterface.getDescription();
    }
    public static class PacketListenerTask implements Runnable {

        private PcapHandle handle;
        private PacketListener listener;

        public PacketListenerTask(PcapHandle handle, PacketListener listener) {
            this.handle = handle;
            this.listener = listener;
        }

        @Override
        public void run() {
            try {
                handle.loop(-1, listener);
            } catch (PcapNativeException e) {
                e.printStackTrace();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (NotOpenException e) {
                e.printStackTrace();
            }
        }

    }
    private PcapHandle getPcapHandler(String interfaceName) throws PcapNativeException, NotOpenException {
        PcapHandle handler = new PcapHandle.Builder(interfaceName)
                .snaplen(SNAP_LENGTH)
                .promiscuousMode(PcapNetworkInterface.PromiscuousMode.PROMISCUOUS)
                .timeoutMillis(READ_TIME_OUT).build();
        //                .rfmon(true)
//        .openLive(SNAP_LENGTH, PcapNetworkInterface.PromiscuousMode.PROMISCUOUS, READ_TIME_OUT);

//                .bufferSize(5 * 1024 * 1024)
//                .timestampPrecision(PcapHandle.TimestampPrecision.MICRO).build();
//        String filter = "";
//        handler.setFilter(filter, BpfProgram.BpfCompileMode.OPTIMIZE);

        return handler;
    }
    public void handlePacket(Packet packet){
        com.network.core.domain.PacketHeader header = new com.network.core.domain.PacketHeader(packet,networkDevice);
        logger.info(header.getProtocol().toString());
        packetStorageServiceImpl.storeSingleFile(handler,packet);
    }

    public PacketListenerTask buildPacketCaptureTask() throws PcapNativeException, NotOpenException {
        return
                new PacketListenerTask(
                        getPcapHandler(pcapNetworkInterface.getName()), (packet) -> {
                handler.getTimestamp();
            handlePacket(packet);
        });
    }

}
