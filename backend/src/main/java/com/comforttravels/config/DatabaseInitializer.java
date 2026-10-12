package com.comforttravels.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        ensureTimestampColumns("blogs");
        ensureTimestampColumns("packages");
    }

    private void ensureTimestampColumns(String tableName) {
        try {
            jdbcTemplate.execute(
                "ALTER TABLE " + tableName + " ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
            );
            jdbcTemplate.execute(
                "ALTER TABLE " + tableName + " ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
            );
            jdbcTemplate.execute(
                "UPDATE " + tableName + " SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL"
            );
            jdbcTemplate.execute(
                "UPDATE " + tableName + " SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL"
            );
            log.info("Ensured timestamp columns (created_at, updated_at) exist on table '{}'", tableName);
        } catch (Exception e) {
            log.warn("Could not ensure timestamp columns on table '{}': {}", tableName, e.getMessage());
        }
    }
}
