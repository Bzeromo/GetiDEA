package com.gi.giback.socket.dto;

import java.util.Map;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class SocketData {
    private Map<String, Object> data;
}
