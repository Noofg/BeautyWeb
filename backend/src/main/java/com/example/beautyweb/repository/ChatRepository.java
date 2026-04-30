package com.example.beautyweb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import com.example.beautyweb.entity.ChatMessage;
public interface ChatRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByUserIdOrderByTimestampAsc(String userId);
}
