package com.example.beautyweb.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class ChatRequest {

    private String userId;
    private String message;
    private List<MessageItem> history;

    @Data
    public static class MessageItem {
        private String role; // "user" | "assistant"
        private String text;
    }
}