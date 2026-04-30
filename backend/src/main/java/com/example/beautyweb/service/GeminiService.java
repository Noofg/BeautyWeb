package com.example.beautyweb.service;

import com.example.beautyweb.dto.request.ChatRequest;
import com.example.beautyweb.entity.ChatMessage;
import com.example.beautyweb.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

   private final RestTemplate restTemplate = createRestTemplate();
    private final ChatRepository chatRepository;

    public GeminiService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }
    private RestTemplate createRestTemplate() {
    SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
    factory.setConnectTimeout(10000); // 10s kết nối
    factory.setReadTimeout(30000);    // 30s đọc response
    return new RestTemplate(factory);
}

    // Chat có userId
    public String chat(String userId, String userMessage, List<ChatRequest.MessageItem> history) {
        chatRepository.save(new ChatMessage(null, userId, "user", userMessage, LocalDateTime.now()));

        String reply = callAI(userMessage, history);

        if (!reply.startsWith("⚠️") && !reply.startsWith("Lỗi")) {
            chatRepository.save(new ChatMessage(null, userId, "bot", reply, LocalDateTime.now()));
        }
        return reply;
    }

    // Chat guest
    public String chatGuest(String userMessage) {
        return callAI(userMessage, null);
    }

    // Gọi OpenRouter
    private String callAI(String userMessage, List<ChatRequest.MessageItem> history) {

        List<Map<String, Object>> messages = new ArrayList<>();

        // System prompt
        messages.add(Map.of(
            "role", "system",
            "content", "Bạn là trợ lý tư vấn của thẩm mỹ viện Belle Beauté. " +
                       "Hãy tư vấn về các dịch vụ làm đẹp, chăm sóc da, đặt lịch hẹn. " +
                       "Trả lời bằng tiếng Việt, thân thiện và chuyên nghiệp."
        ));

        // History
        if (history != null) {
            for (ChatRequest.MessageItem msg : history) {
                messages.add(Map.of(
                    "role", msg.getRole(), // "user" hoặc "assistant"
                    "content", msg.getText()
                ));
            }
        }

        // Tin nhắn hiện tại
        messages.add(Map.of("role", "user", "content", userMessage));

        // Request body theo format OpenAI
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "openai/gpt-oss-20b:free");
        requestBody.put("messages", messages);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                apiUrl, entity, Map.class
            );

            Map<?, ?> body = response.getBody();
            if (body == null) return "AI không phản hồi";

            List<?> choices = (List<?>) body.get("choices");
            if (choices == null || choices.isEmpty()) return "Không có dữ liệu từ AI";

            Map<?, ?> choice  = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) choice.get("message");
            return (String) message.get("content");

        } catch (HttpClientErrorException.TooManyRequests e) {
            return "⚠️ Đang bận, vui lòng thử lại sau vài giây.";
        } catch (HttpClientErrorException e) {
            System.out.println("=== ERROR ===");
            System.out.println(e.getResponseBodyAsString());
            return "Lỗi API: " + e.getStatusCode().value();
        } catch (Exception e) {
            System.out.println("=== UNKNOWN ===");
            System.out.println(e.getMessage());
            return "Lỗi: " + e.getMessage();
        }
    }
}