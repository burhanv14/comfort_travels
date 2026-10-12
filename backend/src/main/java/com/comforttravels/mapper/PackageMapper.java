package com.comforttravels.mapper;

import com.comforttravels.dto.PackageDto;
import com.comforttravels.entity.ItineraryDay;
import com.comforttravels.entity.TravelPackage;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PackageMapper {
    PackageMapper INSTANCE = Mappers.getMapper(PackageMapper.class);

    @Mapping(target = "category", source = "category", qualifiedByName = "entityCategoryToDto")
    @Mapping(target = "difficulty", source = "difficulty", qualifiedByName = "entityDifficultyToDto")
    @Mapping(target = "physicalRating", source = "physicalRating", qualifiedByName = "entityPhysicalRatingToDto")
    PackageDto toDto(TravelPackage e);
    java.util.List<PackageDto> toDto(java.util.List<TravelPackage> list);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "category", source = "category", qualifiedByName = "dtoCategoryToEntity")
    @Mapping(target = "difficulty", source = "difficulty", qualifiedByName = "dtoDifficultyToEntity")
    @Mapping(target = "physicalRating", source = "physicalRating", qualifiedByName = "dtoPhysicalRatingToEntity")
    TravelPackage toEntity(PackageDto d);

    @AfterMapping
    default void setItineraryPackageReferences(@MappingTarget TravelPackage travelPackage, PackageDto dto) {
        if (travelPackage.getItinerary() != null && dto.getItinerary() != null) {
            for (ItineraryDay day : travelPackage.getItinerary()) {
                day.setTravelPackage(travelPackage);
            }
        }
    }

    @Named("entityCategoryToDto")
    default PackageDto.Category entityCategoryToDto(TravelPackage.Category category) {
        if (category == null) return null;
        return PackageDto.Category.valueOf(category.name());
    }

    @Named("entityDifficultyToDto")
    default PackageDto.Difficulty entityDifficultyToDto(TravelPackage.Difficulty difficulty) {
        if (difficulty == null) return null;
        return PackageDto.Difficulty.valueOf(difficulty.name());
    }

    @Named("entityPhysicalRatingToDto")
    default PackageDto.PhysicalRating entityPhysicalRatingToDto(TravelPackage.PhysicalRating physicalRating) {
        if (physicalRating == null) return null;
        return PackageDto.PhysicalRating.valueOf(physicalRating.name());
    }

    @Named("dtoCategoryToEntity")
    default TravelPackage.Category dtoCategoryToEntity(PackageDto.Category category) {
        if (category == null) return null;
        return TravelPackage.Category.valueOf(category.name());
    }

    @Named("dtoDifficultyToEntity")
    default TravelPackage.Difficulty dtoDifficultyToEntity(PackageDto.Difficulty difficulty) {
        if (difficulty == null) return null;
        return TravelPackage.Difficulty.valueOf(difficulty.name());
    }

    @Named("dtoPhysicalRatingToEntity")
    default TravelPackage.PhysicalRating dtoPhysicalRatingToEntity(PackageDto.PhysicalRating physicalRating) {
        if (physicalRating == null) return null;
        return TravelPackage.PhysicalRating.valueOf(physicalRating.name());
    }
}