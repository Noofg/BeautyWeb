package com.example.beautyweb.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.example.beautyweb.entity.Role;

import java.io.IOException;

public class RoleSerializer extends JsonSerializer<Role> {
    @Override
    public void serialize(Role value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        if (value == null) {
            gen.writeNull();
        } else {
            gen.writeString(value.name());
        }
    }
}
