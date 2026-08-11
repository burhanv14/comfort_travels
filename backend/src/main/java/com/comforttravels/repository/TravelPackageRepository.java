package com.comforttravels.repository;

import com.comforttravels.entity.TravelPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface TravelPackageRepository extends JpaRepository<TravelPackage, Long> {
    List<TravelPackage> findByPopularTrue();
    Optional<TravelPackage> findBySlug(String slug);
}