package com.network.core.service;

import org.pcap4j.core.PcapHandle;
import org.pcap4j.packet.Packet;

public interface PacketStorageService {
    boolean storeMultiFile(PcapHandle handle, Packet packet);
    boolean storeSingleFile(PcapHandle handle, Packet packet);


//    void init();
//
//    void store(MultipartFile file);
//
//    Stream<Path> loadAll();
//
//    Path load(String filename);
//
//    Resource loadAsResource(String filename);
//
//    void deleteAll();


}
