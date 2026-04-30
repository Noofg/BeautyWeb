package com.example.beautyweb.controller;

import com.example.beautyweb.dto.request.ChatRequest;
import com.example.beautyweb.dto.request.ChatResponse;
import com.example.beautyweb.service.GeminiService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "https://beauty-ef4oyuz0n-tinos-projects-2cc858eb.vercel.app")
//@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

 @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {

        String userId = request.getUserId() != null ? request.getUserId() : "guest";
        String message = request.getMessage();
        List<ChatRequest.MessageItem> history =
                request.getHistory() != null ? request.getHistory() : new ArrayList<>();

        String reply = geminiService.chat(userId, message, history);

        return ResponseEntity.ok(new ChatResponse(reply));
    }
    @PostMapping("/guest")
public Map<String, String> chatGuest(@RequestBody Map<String, Object> body) {

    String message = (String) body.get("message");

    // 👉 không có history, không userId
    String reply = geminiService.chatGuest(message);

    return Map.of("reply", reply);
}
}