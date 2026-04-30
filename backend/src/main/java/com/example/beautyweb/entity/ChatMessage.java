package com.example.beautyweb.entity;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "chat_history")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {

    @Id
    private String id;

    private String userId;   // nếu có login
    private String role;     // "user" | "bot"
    private String message;
    private LocalDateTime timestamp;
}